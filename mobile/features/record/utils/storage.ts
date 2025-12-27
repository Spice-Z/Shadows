import { File, Directory, Paths } from "expo-file-system";

const RECORDING_FILENAME = "my-recording.m4a";

function getRecordingsDirectory(): Directory {
  return new Directory(Paths.document, "recordings");
}

export function getRecordingPath(): string {
  const dir = getRecordingsDirectory();
  const file = new File(dir, RECORDING_FILENAME);
  return file.uri;
}

export function hasRecordingSaved(): boolean {
  const dir = getRecordingsDirectory();
  if (!dir.exists) {
    return false;
  }
  const file = new File(dir, RECORDING_FILENAME);
  return file.exists;
}

export async function saveRecording(tempUri: string): Promise<string> {
  const dir = getRecordingsDirectory();
  if (!dir.exists) {
    dir.create({ intermediates: true });
  }

  const sourceFile = new File(tempUri);
  const destFile = new File(dir, RECORDING_FILENAME);

  if (destFile.exists) {
    destFile.delete();
  }

  sourceFile.copy(destFile);
  return destFile.uri;
}

export function deleteRecording(): void {
  const dir = getRecordingsDirectory();
  const file = new File(dir, RECORDING_FILENAME);
  if (file.exists) {
    file.delete();
  }
}
