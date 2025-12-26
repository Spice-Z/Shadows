import { Platform } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {
  NativeTabs,
  Icon,
  Label,
  VectorIcon,
} from "expo-router/unstable-native-tabs";

import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useTranslation } from "@/hooks/useTranslation";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();
  const iconColor = Colors[colorScheme].icon;

  return (
    <NativeTabs tintColor={iconColor}>
      <NativeTabs.Trigger name="index">
        <Label>{t("tabs.home")}</Label>
        {Platform.select({
          ios: <Icon sf={{ default: "house", selected: "house.fill" }} />,
          android: (
            <Icon src={<VectorIcon family={MaterialIcons} name="home" />} />
          ),
        })}
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="analysis">
        <Label>{t("tabs.analysis")}</Label>
        {Platform.select({
          ios: (
            <Icon sf={{ default: "chart.bar", selected: "chart.bar.fill" }} />
          ),
          android: (
            <Icon
              src={<VectorIcon family={MaterialIcons} name="bar-chart" />}
            />
          ),
        })}
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
