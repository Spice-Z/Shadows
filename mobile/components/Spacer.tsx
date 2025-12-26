import { View } from "react-native";

interface SpacerProps {
  /** Horizontal spacing in pixels */
  x?: number;
  /** Vertical spacing in pixels */
  y?: number;
  /** Spacing in both directions (shorthand for x and y) */
  size?: number;
  /** If true, spacer will expand to fill available space */
  flex?: boolean;
}

export function Spacer({ x, y, size, flex }: SpacerProps) {
  if (flex) {
    return <View style={{ flex: 1 }} />;
  }

  const width = x ?? size ?? 0;
  const height = y ?? size ?? 0;

  return <View style={{ width, height }} />;
}

