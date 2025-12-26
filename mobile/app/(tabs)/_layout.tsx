import { Platform, DynamicColorIOS } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {
  NativeTabs,
  Icon,
  Label,
  VectorIcon,
} from "expo-router/unstable-native-tabs";

import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <NativeTabs
      labelStyle={{
        color:
          Platform.OS === "ios"
            ? DynamicColorIOS({
                dark: Colors.dark.text,
                light: Colors.light.text,
              })
            : Colors[colorScheme].text,
        fontSize: 10,
        fontWeight: "500",
      }}
      tintColor={
        Platform.OS === "ios"
          ? DynamicColorIOS({
              dark: Colors.dark.text,
              light: Colors.light.text,
            })
          : Colors[colorScheme].text
      }
    >
      <NativeTabs.Trigger name="index">
        <Label>ホーム</Label>
        {Platform.select({
          ios: <Icon sf={{ default: "house", selected: "house.fill" }} />,
          default: (
            <Icon src={<VectorIcon family={MaterialIcons} name="home" />} />
          ),
        })}
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="practice">
        <Label>練習</Label>
        {Platform.select({
          ios: <Icon sf={{ default: "mic", selected: "mic.fill" }} />,
          default: (
            <Icon
              src={<VectorIcon family={MaterialIcons} name="mic-external-on" />}
            />
          ),
        })}
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="analysis">
        <Label>分析</Label>
        {Platform.select({
          ios: (
            <Icon sf={{ default: "chart.bar", selected: "chart.bar.fill" }} />
          ),
          default: (
            <Icon
              src={<VectorIcon family={MaterialIcons} name="bar-chart" />}
            />
          ),
        })}
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="explore">
        <Label>探索</Label>
        {Platform.select({
          ios: <Icon sf={{ default: "safari", selected: "safari.fill" }} />,
          default: (
            <Icon src={<VectorIcon family={MaterialIcons} name="explore" />} />
          ),
        })}
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
