import React from "react";
import { View, Text } from "react-native";
import AppIcon from "./AppIcon";
import Card from "./Card";
import { colors, fontFamilies } from "../theme/tokens";

// Matches the 2-column stat-card grid on the pharmacist dashboard and (once
// built) the admin analytics screen: small icon top-left, large bold
// number, label below.
export default function StatCard({ icon, value, label, tone = "primary" }) {
  const iconColor = tone === "warning" ? colors.tertiaryFixedDim : colors.primaryContainer;
  return (
    <Card style={{ flex: 1, gap: 10 }}>
      <AppIcon name={icon} size={20} color={iconColor} />
      <Text style={{ fontFamily: fontFamilies.jakarta.extrabold, fontSize: 22, color: colors.onSurface }}>
        {value}
      </Text>
      <Text style={{ fontFamily: fontFamilies.manrope.bold, fontSize: 12.5, color: colors.onSurfaceVariant }}>
        {label}
      </Text>
    </Card>
  );
}
