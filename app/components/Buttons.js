import React from "react";
import { Pressable, Text, ActivityIndicator, View } from "react-native";
import { colors, radii, fontFamilies } from "../theme/tokens";

// Matches: w-full h-[52px] bg-primary-container text-on-primary rounded-full
// font-title-md shadow-[0px_4px_20px_rgba(18,33,26,0.1)] active:scale-[0.98]
export function PrimaryButton({ label, onPress, disabled, loading, icon, style }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        {
          height: 52,
          borderRadius: radii.full,
          backgroundColor: disabled ? colors.outlineVariant : colors.primaryContainer,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          gap: 8,
          transform: [{ scale: pressed ? 0.98 : 1 }],
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={colors.onPrimary} />
      ) : (
        <>
          {icon}
          <Text
            style={{
              color: colors.onPrimary,
              fontFamily: fontFamilies.jakarta.bold,
              fontSize: 18,
            }}
          >
            {label}
          </Text>
        </>
      )}
    </Pressable>
  );
}

// Matches: w-full h-[52px] bg-transparent text-primary-container rounded-full
// border (outline variant used on Reject / secondary actions).
export function OutlineButton({ label, onPress, disabled, icon, tone = "primary", style }) {
  const toneColor = tone === "danger" ? colors.error : colors.primaryContainer;
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        {
          height: 52,
          borderRadius: radii.full,
          borderWidth: 1.5,
          borderColor: toneColor,
          backgroundColor: "transparent",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          gap: 8,
          opacity: pressed ? 0.7 : 1,
        },
        style,
      ]}
    >
      {icon}
      <Text style={{ color: toneColor, fontFamily: fontFamilies.jakarta.bold, fontSize: 16 }}>
        {label}
      </Text>
    </Pressable>
  );
}

// Small circular icon-only button (back chevrons, top app bar actions).
export function IconButton({ children, onPress, style }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          width: 40,
          height: 40,
          borderRadius: radii.full,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: pressed ? colors.surfaceContainer : "transparent",
        },
        style,
      ]}
    >
      <View>{children}</View>
    </Pressable>
  );
}
