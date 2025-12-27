import { useCallback, useEffect, useRef, useState } from "react";
import {
  useAudioRecorder,
  useAudioRecorderState,
  AudioModule,
  RecordingPresets,
  setAudioModeAsync,
} from "expo-audio";
import type {
  RecordingState,
  UseAudioRecordingOptions,
  UseAudioRecordingReturn,
} from "../types";

export function useAudioRecording(
  options: UseAudioRecordingOptions = {}
): UseAudioRecordingReturn {
  const { onRecordingComplete, onError } = options;

  const [state, setState] = useState<RecordingState>("idle");
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [recordingUri, setRecordingUri] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [durationMillis, setDurationMillis] = useState(0);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  useAudioRecorderState(audioRecorder);

  useEffect(() => {
    checkPermission();
  }, []);

  useEffect(() => {
    if (state === "recording") {
      const recordingStartTime = Date.now();
      const baseDuration = durationMillis;

      timerRef.current = setInterval(() => {
        setDurationMillis(baseDuration + (Date.now() - recordingStartTime));
      }, 100);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const checkPermission = async () => {
    try {
      const status = await AudioModule.getRecordingPermissionsAsync();
      setHasPermission(status.granted);
    } catch {
      setHasPermission(false);
    }
  };

  const requestPermission = useCallback(async (): Promise<boolean> => {
    try {
      const status = await AudioModule.requestRecordingPermissionsAsync();
      setHasPermission(status.granted);
      return status.granted;
    } catch {
      setHasPermission(false);
      return false;
    }
  }, []);

  const startRecording = useCallback(async () => {
    try {
      setError(null);

      if (!hasPermission) {
        const granted = await requestPermission();
        if (!granted) {
          const permissionError = new Error("Microphone permission denied");
          setError(permissionError.message);
          onError?.(permissionError);
          return;
        }
      }

      await setAudioModeAsync({
        playsInSilentMode: true,
        allowsRecording: true,
      });

      setState("preparing");
      await audioRecorder.prepareToRecordAsync();
      audioRecorder.record();
      setState("recording");
    } catch (err) {
      const recordingError =
        err instanceof Error ? err : new Error("Failed to start recording");
      setError(recordingError.message);
      setState("idle");
      onError?.(recordingError);
    }
  }, [hasPermission, requestPermission, audioRecorder, onError]);

  const stopRecording = useCallback(async () => {
    try {
      if (state !== "recording") {
        return;
      }

      await audioRecorder.stop();

      const uri = audioRecorder.uri;
      const duration = durationMillis;

      setState("stopped");
      setRecordingUri(uri);

      if (uri) {
        onRecordingComplete?.({
          uri,
          duration: Math.floor(duration / 1000),
        });
      }
    } catch (err) {
      const stopError =
        err instanceof Error ? err : new Error("Failed to stop recording");
      setError(stopError.message);
      onError?.(stopError);
    }
  }, [state, audioRecorder, durationMillis, onRecordingComplete, onError]);

  const discardRecording = useCallback(() => {
    setRecordingUri(null);
    setDurationMillis(0);
    setState("idle");
    setError(null);
  }, []);

  const isRecording = state === "recording";
  const hasRecording = state === "stopped" && recordingUri !== null;
  const durationSeconds = Math.floor(durationMillis / 1000);

  return {
    state,
    isRecording,
    hasRecording,
    durationSeconds,
    durationMillis,
    recordingUri,
    hasPermission,
    error,
    startRecording,
    stopRecording,
    discardRecording,
    requestPermission,
  };
}
