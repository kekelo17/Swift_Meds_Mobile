import React from "react";
import { View, Text, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AppIcon from "./AppIcon";
import { colors, fontFamilies, shadows } from "../theme/tokens";

// Matches: fixed bottom-0 w-full h-[64px] bg-white shadow-[0px_-4px_20px_...]
// flex justify-around — active tab gets a filled icon + primary color +
// soft secondary-container pill background, inactive tabs are muted.
// Each route in the navigator must set options.tabBarIconName to the
// Material-Symbols name (e.g. "search", "local_pharmacy") — see any
// *Navigator.js file for the exact per-role tab list.
export default function CustomTabBar({ state, descriptors, navigation }) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        {
          flexDirection: "row",
          height: 64 + insets.bottom,
          paddingBottom: insets.bottom,
          backgroundColor: colors.white,
          justifyContent: "space-around",
          alignItems: "center",
        },
        shadows.navBar,
      ]}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        const iconName = options.tabBarIconName || "home";
        const label = options.tabBarLabelText || route.name;

        const onPress = () => {
          const event = navigation.emit({ type: "tabPress", target: route.key, canPreventDefault: true });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <Pressable
            key={route.key}
            onPress={onPress}
            style={{
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              paddingHorizontal: 12,
              paddingVertical: 4,
              borderRadius: 12,
              backgroundColor: isFocused ? `${colors.secondaryContainer}33` : "transparent",
            }}
          >
            <AppIcon name={iconName} size={24} color={isFocused ? colors.primary : colors.onSurfaceVariant} />
            <Text
              style={{
                fontFamily: fontFamilies.jakarta.bold,
                fontSize: 11,
                marginTop: 4,
                color: isFocused ? colors.primary : colors.onSurfaceVariant,
              }}
            >
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
