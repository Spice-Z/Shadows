import { ReactNode } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/theme";

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  leftElement?: ReactNode;
  rightElement?: ReactNode;
}

export function Header({
  title,
  showBackButton,
  onBackPress,
  leftElement,
  rightElement,
}: HeaderProps) {
  const colorScheme = useColorScheme();

  const renderLeftContent = () => {
    if (leftElement) {
      return leftElement;
    }

    if (showBackButton) {
      return (
        <TouchableOpacity
          style={styles.iconButton}
          onPress={onBackPress}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <MaterialIcons
            name="arrow-back"
            size={24}
            color={Colors[colorScheme].text}
          />
        </TouchableOpacity>
      );
    }

    if (title) {
      return (
        <ThemedText weight="bold" style={styles.title}>
          {title}
        </ThemedText>
      );
    }

    return <View style={styles.placeholder} />;
  };

  const renderRightContent = () => {
    if (rightElement) {
      return rightElement;
    }
    return <View style={styles.placeholder} />;
  };

  return (
    <ThemedView
      style={[
        styles.header,
        {
          borderBottomColor: Colors[colorScheme].border,
        },
      ]}
    >
      {renderLeftContent()}
      {renderRightContent()}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    height: 56,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 24,
    letterSpacing: -0.5,
  },
  iconButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 9999,
  },
  placeholder: {
    width: 40,
    height: 40,
  },
});
