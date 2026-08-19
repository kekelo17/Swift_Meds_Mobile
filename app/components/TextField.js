import React, { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import AppIcon from "./AppIcon";
import { colors, radii, spacing, fontFamilies } from "../theme/tokens";

// Matches the labeled input pattern used on every signup/form screen:
// <label>...</label> then a relative div with a left icon, the input
// itself (bg-surface-container-lowest-ish fill via form-input-custom),
// and an optional right-side action icon (e.g. "use my location", the
// password visibility toggle).
export default function TextField({
  label,
  icon,
  placeholder,
  value,
  onChangeText,
  onBlur,
  helperText,
  secureTextEntry,
  showPasswordToggle,
  rightIcon,
  onRightIconPress,
  keyboardType,
  multiline,
  autoCapitalize,
  style,
}) {
  const [hidden, setHidden] = useState(!!secureTextEntry);

  return (
    <View style={[{ gap: spacing.base + 4 }, style]}>
      {label ? (
        <Text
          style={{
            fontFamily: fontFamilies.manrope.medium,
            fontSize: 14,
            color: colors.onSurfaceVariant,
            marginLeft: 4,
          }}
        >
          {label}
        </Text>
      ) : null}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          height: multiline ? 96 : 56,
          borderRadius: radii.xl,
          borderWidth: 1.5,
          borderColor: colors.surfaceVariant,
          backgroundColor: colors.surfaceContainerLowest,
          paddingHorizontal: 16,
        }}
      >
        {icon ? <AppIcon name={icon} size={20} color={colors.outline} style={{ marginRight: 10 }} /> : null}
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={colors.outlineVariant}
          value={value}
          onChangeText={onChangeText}
          onBlur={onBlur}
          autoCapitalize={autoCapitalize}
          secureTextEntry={hidden}
          keyboardType={keyboardType}
          multiline={multiline}
          textAlignVertical={multiline ? "top" : "center"}
          style={{
            flex: 1,
            fontFamily: fontFamilies.manrope.medium,
            fontSize: 16,
            color: colors.onSurface,
            paddingVertical: multiline ? 14 : 0,
          }}
        />
        {showPasswordToggle ? (
          <Pressable onPress={() => setHidden((h) => !h)}>
            <AppIcon name={hidden ? "visibility_off" : "visibility"} size={20} color={colors.outline} />
          </Pressable>
        ) : rightIcon ? (
          <Pressable onPress={onRightIconPress}>
            <AppIcon name={rightIcon} size={20} color={colors.outline} />
          </Pressable>
        ) : null}
      </View>
      {helperText ? (
        <Text style={{ fontFamily: fontFamilies.manrope.medium, fontSize: 11, color: colors.outline, marginLeft: 4 }}>
          {helperText}
        </Text>
      ) : null}
    </View>
  );
}

// The green "Located: [address]" confirmation row shown under the address
// field once geocoding resolves — matches the resolved-state row in
// client_sign_up_1 / pharmacist_sign_up_new_pharmacy_1.
export function ResolvedAddressRow({ address, helper }) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 8,
        backgroundColor: colors.surfaceContainerLow,
        padding: 12,
        borderRadius: radii.lg,
      }}
    >
      <AppIcon name="check_circle" size={18} color={colors.primaryContainer} style={{ marginTop: 2 }} />
      <View style={{ flex: 1 }}>
        <Text style={{ fontFamily: fontFamilies.manrope.medium, fontSize: 14, color: colors.onSurface }}>
          Located: {address}
        </Text>
        {helper ? (
          <Text style={{ fontFamily: fontFamilies.manrope.medium, fontSize: 11, color: colors.outline, marginTop: 2 }}>
            {helper}
          </Text>
        ) : null}
      </View>
    </View>
  );
}
