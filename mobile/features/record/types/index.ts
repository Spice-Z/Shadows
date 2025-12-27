export type RecordingState =
  | "idle"
  | "preparing"
  | "recording"
  | "paused"
  | "stopped";

export interface RecordingResult {
  uri: string;
  duration: number;
}

export interface UseAudioRecordingOptions {
  onRecordingComplete?: (result: RecordingResult) => void;
  onError?: (error: Error) => void;
}

export interface UseAudioRecordingReturn {
  /** Current state of the recording */
  state: RecordingState;
  /** Whether recording is currently active */
  isRecording: boolean;
  /** Whether there is a completed recording available */
  hasRecording: boolean;
  /** Recording duration in seconds */
  durationSeconds: number;
  /** Recording duration in milliseconds */
  durationMillis: number;
  /** URI of the completed recording */
  recordingUri: string | null;
  /** Whether microphone permission is granted */
  hasPermission: boolean | null;
  /** Error message if any */
  error: string | null;
  /** Start or resume recording */
  startRecording: () => Promise<void>;
  /** Stop recording */
  stopRecording: () => Promise<void>;
  /** Discard the current recording */
  discardRecording: () => void;
  /** Request microphone permission */
  requestPermission: () => Promise<boolean>;
}

// Playback types
export type PlaybackState = "idle" | "loading" | "playing" | "paused" | "ended";

export interface UseAudioPlaybackOptions {
  onPlaybackComplete?: () => void;
  onError?: (error: Error) => void;
}

export interface UseAudioPlaybackReturn {
  /** Current playback state */
  state: PlaybackState;
  /** Whether audio is currently playing */
  isPlaying: boolean;
  /** Current playback position in seconds */
  positionSeconds: number;
  /** Total duration in seconds */
  durationSeconds: number;
  /** Playback progress (0-1) */
  progress: number;
  /** Error message if any */
  error: string | null;
  /** Start or resume playback */
  play: () => Promise<void>;
  /** Pause playback */
  pause: () => void;
  /** Toggle play/pause */
  togglePlayPause: () => void;
  /** Seek to position (in seconds) */
  seekTo: (seconds: number) => void;
  /** Reset to beginning */
  reset: () => void;
}
