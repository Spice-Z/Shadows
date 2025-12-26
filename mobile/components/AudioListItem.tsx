import { StyleSheet, TouchableOpacity, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/theme";

export type AudioSourceType = "import" | "recording";

export interface AudioListItemProps {
  title: string;
  practiceCount: number;
  sourceType: AudioSourceType;
  duration: string;
  lastPlayed: string;
  onPress?: () => void;
  onMorePress?: () => void;
}

export function AudioListItem({
  title,
  practiceCount,
  sourceType,
  duration,
  lastPlayed,
  onPress,
  onMorePress,
}: AudioListItemProps) {
  const colorScheme = useColorScheme();
  const isZeroCount = practiceCount === 0;

  return (
    <TouchableOpacity
      style={[styles.container]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <ThemedView
          variant="surface"
          style={[
            styles.countBadge,
            {
              backgroundColor: Colors[colorScheme].badgeBg,
              borderColor: Colors[colorScheme].border,
            },
          ]}
        >
          <ThemedText
            size="xl"
            weight="bold"
            style={isZeroCount && { color: Colors[colorScheme].textSecondary }}
          >
            {practiceCount}
          </ThemedText>
          <ThemedText
            weight="bold"
            style={[
              styles.countLabel,
              isZeroCount && { color: Colors[colorScheme].textSecondary },
            ]}
          >
            回
          </ThemedText>
        </ThemedView>

        <View style={styles.textContainer}>
          <ThemedText size="base" weight="bold" numberOfLines={1}>
            {title}
          </ThemedText>
          <View style={styles.metadata}>
            <ThemedView
              variant="surface"
              style={[
                styles.sourceBadge,
                {
                  backgroundColor:
                    sourceType === "recording"
                      ? Colors[colorScheme].hover
                      : Colors[colorScheme].badgeBg,
                },
              ]}
            >
              <ThemedText size="sm" weight="medium">
                {sourceType === "recording" ? "録音" : "インポート"}
              </ThemedText>
            </ThemedView>
            <ThemedText style={styles.metadataText}>
              {duration} • {lastPlayed}
            </ThemedText>
          </View>
        </View>

        <TouchableOpacity
          style={styles.moreButton}
          onPress={onMorePress}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <MaterialIcons
            name="more-vert"
            size={20}
            color={Colors[colorScheme].textSecondary}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    borderRadius: 12,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  countBadge: {
    width: 48,
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  countLabel: {
    fontSize: 9,
    fontWeight: "500",
    lineHeight: 9,
    marginTop: 2,
  },
  textContainer: {
    flex: 1,
    minWidth: 0,
    gap: 4,
  },
  metadata: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  sourceBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  sourceBadgeText: {
    fontSize: 10,
    fontWeight: "500",
  },
  metadataText: {
    fontSize: 12,
    lineHeight: 16,
  },
  moreButton: {
    padding: 8,
    borderRadius: 9999,
    flexShrink: 0,
  },
});
