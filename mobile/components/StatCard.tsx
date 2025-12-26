import { StyleSheet, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/theme";

interface StatCardProps {
  label: string;
  value: string;
  unit?: string;
  icon: string;
  secondaryValue?: string;
  secondaryUnit?: string;
}

export function StatCard({
  label,
  value,
  unit,
  icon,
  secondaryValue,
  secondaryUnit,
}: StatCardProps) {
  const colorScheme = useColorScheme();

  return (
    <ThemedView
      variant="surface"
      style={[styles.container, { borderColor: Colors[colorScheme].border }]}
    >
      <View style={styles.header}>
        <ThemedText size="sm" weight="bold">
          {label}
        </ThemedText>
        <MaterialIcons
          name={icon as any}
          size={20}
          color={Colors[colorScheme].textSecondary}
        />
      </View>
      <View style={styles.valueContainer}>
        <View style={styles.valueRow}>
          <ThemedText style={styles.value}>{value}</ThemedText>
          {unit && <ThemedText style={styles.unit}>{unit}</ThemedText>}
          {secondaryValue && (
            <>
              <ThemedText style={[styles.value, styles.secondaryValue]}>
                {secondaryValue}
              </ThemedText>
              {secondaryUnit && (
                <ThemedText style={styles.unit}>{secondaryUnit}</ThemedText>
              )}
            </>
          )}
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    height: 112,
    width: "100%",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  valueContainer: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  valueRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 4,
  },
  value: {
    fontSize: 24,
    fontWeight: "bold",
  },
  secondaryValue: {
    marginLeft: 4,
  },
  unit: {
    fontSize: 14,
    fontWeight: "500",
  },
});
