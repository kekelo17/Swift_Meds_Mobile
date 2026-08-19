import React from "react";
import { Pressable, View } from "react-native";
import AppIcon from "./AppIcon";
import { colors, radii } from "../theme/tokens";

// Matches: .custom-checkbox — square with rounded corners, filled green +
// white check when checked, outline when not.
export default function Checkbox({ checked, onToggle, size = 22 }) {
  return (
    <Pressable
      onPress={onToggle}
      style={{
        width: size,
        height: size,
        borderRadius: radii.default + 2,
        borderWidth: 1.5,
        borderColor: checked ? colors.primaryContainer : colors.outlineVariant,
        backgroundColor: checked ? colors.primaryContainer : "transparent",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {checked ? <AppIcon name="check" size={16} color={colors.onPrimary} /> : null}
    </Pressable>
  );
}
