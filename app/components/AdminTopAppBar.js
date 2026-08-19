import React from "react";
import { View, Text } from "react-native";
import AppIcon from "./AppIcon";
import { IconButton } from "./Buttons";
import { colors, spacing, fontFamilies, shadows } from "../theme/tokens";

// Matches the admin shell's header pattern (distinct from TopAppBar's
// back-chevron pattern used by every other role): hamburger menu on the
// left, centered "Swift Meds Admin" title, circular avatar button on the
// right. Used on Analytics, Approvals, Directory, Swiftty ops — every
// admin screen except the task-focused UserDetails screen, which uses the
// regular back-chevron TopAppBar instead (per the source HTML, which
// explicitly suppresses the shell header there).
export default function AdminTopAppBar({ title = "Swift Meds Admin", onMenuPress, onAvatarPress }) {
  return (
    <View
      style={[
        {
          height: 64,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: spacing.gutter,
          backgroundColor: colors.surface,
        },
        shadows.card,
      ]}
    >
      <IconButton onPress={onMenuPress}>
        <AppIcon name="menu" size={24} color={colors.onSurface} />
      </IconButton>

      <Text
        style={{ fontFamily: fontFamilies.jakarta.extrabold, fontSize: 20, color: colors.primary, flex: 1, textAlign: "center" }}
        numberOfLines={1}
      >
        {title}
      </Text>

      <IconButton onPress={onAvatarPress}>
        <View
          style={{
            width: 36,
            height: 36,
            borderRadius: 18,
            backgroundColor: colors.surfaceContainerHigh,
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 2,
            borderColor: colors.surfaceContainerHighest,
          }}
        >
          <AppIcon name="person" size={18} color={colors.onSurfaceVariant} />
        </View>
      </IconButton>
    </View>
  );
}
