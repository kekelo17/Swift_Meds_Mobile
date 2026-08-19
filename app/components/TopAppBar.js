import React from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AppIcon from "./AppIcon";
import { IconButton } from "./Buttons";
import { colors, spacing, fontFamilies, shadows } from "../theme/tokens";

// Matches: h-[64px] w-full sticky top-0 bg-surface shadow-[...] flex items-center
// with a centered title, optional left back button, optional right action icon.
export default function TopAppBar({
  title,
  subtitle,
  showBack = true,
  rightIconName,
  onRightPress,
  leftIconName = "chevron_left",
  transparent = false,
}) {
  const navigation = useNavigation();

  return (
    <View
      style={[
        {
          height: 64,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: spacing.gutter,
          backgroundColor: transparent ? "transparent" : colors.surface,
        },
        !transparent && shadows.card,
      ]}
    >
      <View style={{ width: 40 }}>
        {showBack ? (
          <IconButton onPress={() => navigation.goBack()}>
            <AppIcon name={leftIconName} size={24} color={colors.primary} />
          </IconButton>
        ) : null}
      </View>

      <View style={{ alignItems: "center" }}>
        <Text
          style={{
            fontFamily: fontFamilies.jakarta.extrabold,
            fontSize: 20,
            color: colors.primary,
          }}
          numberOfLines={1}
        >
          {title}
        </Text>
        {subtitle ? (
          <Text style={{ fontFamily: fontFamilies.manrope.medium, fontSize: 12, color: colors.onSurfaceVariant }}>
            {subtitle}
          </Text>
        ) : null}
      </View>

      <View style={{ width: 40, alignItems: "flex-end" }}>
        {rightIconName ? (
          <IconButton onPress={onRightPress}>
            <AppIcon name={rightIconName} size={24} color={colors.primary} />
          </IconButton>
        ) : null}
      </View>
    </View>
  );
}
