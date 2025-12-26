import { Tabs } from "expo-router";
import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { HapticTab } from "@/components/HapticTab";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useTranslation } from "@/hooks/use-translation";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].text,
        tabBarInactiveTintColor: Colors[colorScheme].textSecondary,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: Colors[colorScheme].surface,
          borderTopColor: Colors[colorScheme].border,
          borderTopWidth: 1,
          height: 64,
          paddingBottom: 8,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "500",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t("tabs.home"),
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons
              name={focused ? "home" : "home"}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="analysis"
        options={{
          title: t("tabs.analysis"),
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="bar-chart" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
