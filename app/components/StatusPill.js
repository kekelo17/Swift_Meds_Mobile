import React from "react";
import { View, Text } from "react-native";
import { colors, radii, fontFamilies } from "../theme/tokens";

// Matches: px-3 py-0.5 rounded-full bg-secondary-container
// text-on-secondary-container text-label-bold uppercase tracking-wider
// Used for "In Stock", reservation/delivery status, and role labels.
// `tone` picks which token pair to use; pass the exact enum value from
// schema.sql as `label` and this maps it to a sensible tone automatically
// unless you override `tone`.
const TONE_MAP = {
  success: { bg: colors.secondaryContainer, fg: colors.onSecondaryContainer },
  pending: { bg: colors.tertiaryFixed, fg: colors.onTertiaryFixedVariant },
  danger: { bg: colors.errorContainer, fg: colors.onErrorContainer },
  info: { bg: colors.surfaceContainerHighest, fg: colors.onSurfaceVariant },
  neutral: { bg: colors.surfaceContainer, fg: colors.onSurfaceVariant },
};

const STATUS_TONE = {
  pending_payment: "pending",
  pending: "pending",
  confirmed: "success",
  paid: "success",
  approved: "success",
  verified: "success",
  ready_for_pickup: "info",
  accepted: "pending",
  in_progress: "pending",
  completed: "success",
  delivered: "success",
  cancelled: "danger",
  rejected: "danger",
  failed: "danger",
  expired: "danger",
};

export default function StatusPill({ label, tone }) {
  const key = String(label || "").toLowerCase().replace(/\s+/g, "_");
  const resolvedTone = tone || STATUS_TONE[key] || "neutral";
  const { bg, fg } = TONE_MAP[resolvedTone];
  const displayText = String(label || "").replace(/_/g, " ");

  return (
    <View style={{ backgroundColor: bg, borderRadius: radii.full, paddingHorizontal: 12, paddingVertical: 3 }}>
      <Text
        style={{
          color: fg,
          fontFamily: fontFamilies.jakarta.bold,
          fontSize: 11,
          letterSpacing: 0.4,
          textTransform: "uppercase",
        }}
      >
        {displayText}
      </Text>
    </View>
  );
}
