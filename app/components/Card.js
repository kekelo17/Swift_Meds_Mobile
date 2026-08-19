import React from "react";
import { View } from "react-native";
import { colors, radii, spacing, shadows } from "../theme/tokens";

// Matches: bg-surface-container-lowest rounded-xl p-md shadow-[0px_4px_20px_rgba(18,33,26,0.05)]
// — the card pattern reused on every result row, stat card, and section
// throughout the export.
export default function Card({ children, style, padded = true, elevated = true }) {
  return (
    <View
      style={[
        {
          backgroundColor: colors.surfaceContainerLowest,
          borderRadius: radii.xl,
          padding: padded ? spacing.md : 0,
        },
        elevated && shadows.card,
        style,
      ]}
    >
      {children}
    </View>
  );
}
