import React from "react";
import { View, Text, Pressable } from "react-native";
import { colors, radii, fontFamilies } from "../theme/tokens";

// Matches the two-option toggle at the top of the pharmacist signup screen
// ("Register a new pharmacy" / "Join an existing pharmacy") and reused for
// the admin Approvals segmented control (Pharmacies / Pharmacist accounts /
// Delivery agents) once that screen is built.
export default function SegmentedControl({ options, value, onChange }) {
  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: colors.surfaceContainer,
        borderRadius: radii.full,
        padding: 4,
      }}
    >
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <Pressable
            key={opt.value}
            onPress={() => onChange(opt.value)}
            style={{
              flex: 1,
              paddingVertical: 10,
              borderRadius: radii.full,
              alignItems: "center",
              backgroundColor: active ? colors.primaryContainer : "transparent",
            }}
          >
            <Text
              style={{
                fontFamily: fontFamilies.jakarta.bold,
                fontSize: 13,
                color: active ? colors.onPrimary : colors.onSurfaceVariant,
                textAlign: "center",
              }}
            >
              {opt.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
