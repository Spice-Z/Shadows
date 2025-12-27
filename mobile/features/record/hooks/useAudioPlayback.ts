import { useCallback, useEffect, useState } from "react";
import {
  useAudioPlayer,
  useAudioPlayerStatus,
  setAudioModeAsync,
} from "expo-audio";
import type {
  PlaybackState,
  UseAudioPlaybackOptions,
  UseAudioPlaybackReturn,
} from "../types";

async function configurePlaybackMode() {
  await setAudioModeAsync({
    playsInSilentMode: true,
    allowsRecording: false,
    // only Android
    shouldRouteThroughEarpiece: false,
  });
}

export function useAudioPlayback(
  uri: string | null,
  options: UseAudioPlaybackOptions = {}
): UseAudioPlaybackReturn {
  const { onPlaybackComplete, onError } = options;

  const [state, setState] = useState<PlaybackState>("idle");
  const [error, setError] = useState<string | null>(null);

  const player = useAudioPlayer(uri ? { uri } : null);
  const status = useAudioPlayerStatus(player);

  useEffect(() => {
    if (uri) {
      configurePlaybackMode();
    }
  }, [uri]);

  useEffect(() => {
    if (!uri) {
      setState("idle");
      return;
    }

    if (status.playing) {
      setState("playing");
    } else if (
      status.currentTime > 0 &&
      status.currentTime >= status.duration
    ) {
      setState("ended");
      onPlaybackComplete?.();
    } else if (status.currentTime > 0) {
      setState("paused");
    } else {
      setState("idle");
    }
  }, [
    uri,
    status.playing,
    status.currentTime,
    status.duration,
    onPlaybackComplete,
  ]);

  const play = useCallback(async () => {
    try {
      setError(null);
      await configurePlaybackMode();
      if (status.currentTime >= status.duration && status.duration > 0) {
        // If at the end, seek to beginning first
        player.seekTo(0);
      }
      player.play();
    } catch (err) {
      const playError =
        err instanceof Error ? err : new Error("Failed to play audio");
      setError(playError.message);
      onError?.(playError);
    }
  }, [player, status.currentTime, status.duration, onError]);

  const pause = useCallback(() => {
    try {
      player.pause();
    } catch (err) {
      const pauseError =
        err instanceof Error ? err : new Error("Failed to pause audio");
      setError(pauseError.message);
      onError?.(pauseError);
    }
  }, [player, onError]);

  const togglePlayPause = useCallback(() => {
    if (status.playing) {
      pause();
    } else {
      play();
    }
  }, [status.playing, play, pause]);

  const seekTo = useCallback(
    (seconds: number) => {
      try {
        player.seekTo(seconds);
      } catch (err) {
        const seekError =
          err instanceof Error ? err : new Error("Failed to seek");
        setError(seekError.message);
        onError?.(seekError);
      }
    },
    [player, onError]
  );

  const reset = useCallback(() => {
    try {
      player.seekTo(0);
      player.pause();
      setState("idle");
    } catch {
      // Ignore reset errors
    }
  }, [player]);

  const positionSeconds = Math.floor(status.currentTime);
  const durationSeconds = Math.floor(status.duration);
  const progress =
    status.duration > 0 ? status.currentTime / status.duration : 0;

  return {
    state,
    isPlaying: status.playing,
    positionSeconds,
    durationSeconds,
    progress,
    error,
    play,
    pause,
    togglePlayPause,
    seekTo,
    reset,
  };
}
