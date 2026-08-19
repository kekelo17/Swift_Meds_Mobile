import React from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Screen from "../../components/Screen";
import TopAppBar from "../../components/TopAppBar";
import AppIcon from "../../components/AppIcon";
import { OutlineButton, PrimaryButton } from "../../components/Buttons";
import { colors, spacing, radii, fontFamilies, shadows } from "../../theme/tokens";

// 1:1 with prescription_review_1/code.html: document placeholder card +
// patient info snippet + Reject/Verify actions. Writes to
// reservations.prescription_status ('verified' | 'rejected') per schema.sql.
export default function PrescriptionReviewScreen() {
  const navigation = useNavigation();

  const decide = (decision) => {
    // In production: update reservations.prescription_status,
    // verified_by, verified_at, and status per the decision.
    navigation.goBack();
  };

  return (
    <Screen>
      <TopAppBar title="Review prescription" showBack />
      <View style={{ flex: 1, padding: spacing.containerMargin, gap: spacing.lg }}>
        <View
          style={[
            { flex: 1, backgroundColor: colors.surfaceContainerLowest, borderRadius: 24, borderWidth: 1, borderColor: colors.surfaceVariant, padding: spacing.lg, alignItems: "center", justifyContent: "center" },
            shadows.card,
          ]}
        >
          <View
            style={{
              flex: 1,
              width: "100%",
              backgroundColor: colors.surfaceContainerLow,
              borderRadius: radii.xl,
              borderWidth: 1,
              borderStyle: "dashed",
              borderColor: colors.outlineVariant,
              alignItems: "center",
              justifyContent: "center",
              marginBottom: spacing.md,
            }}
          >
            <View style={{ backgroundColor: "rgba(255,255,255,0.9)", padding: 16, borderRadius: 40, marginBottom: spacing.md }}>
              <AppIcon name="description" size={36} color={colors.primary} />
            </View>
            <Text style={{ fontFamily: fontFamilies.jakarta.bold, fontSize: 16, color: colors.onSurface, textAlign: "center" }}>
              Prescription document ready to view
            </Text>
            <View style={{ marginTop: spacing.md, backgroundColor: colors.primaryContainer, borderRadius: radii.full, paddingHorizontal: 20, paddingVertical: 8 }}>
              <Text style={{ fontFamily: fontFamilies.jakarta.bold, fontSize: 11, color: colors.onPrimary, letterSpacing: 0.5 }}>TAP TO EXPAND</Text>
            </View>
          </View>

          <View style={{ width: "100%", backgroundColor: colors.surface, borderRadius: radii.xl, padding: spacing.md, flexDirection: "row", alignItems: "center", gap: spacing.md }}>
            <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: colors.tertiaryContainer, alignItems: "center", justifyContent: "center" }}>
              <Text style={{ fontFamily: fontFamilies.jakarta.extrabold, fontSize: 18, color: colors.onTertiary }}>MC</Text>
            </View>
            <View>
              <Text style={{ fontFamily: fontFamilies.jakarta.bold, fontSize: 15, color: colors.onSurface }}>Marie Claire T.</Text>
              <Text style={{ fontFamily: fontFamilies.manrope.medium, fontSize: 12.5, color: colors.onSurfaceVariant }}>Reservation #RES-8903</Text>
            </View>
          </View>
        </View>

        <View style={{ flexDirection: "row", gap: spacing.sm }}>
          <View style={{ flex: 1 }}>
            <OutlineButton label="Reject" tone="danger" onPress={() => decide("rejected")} />
          </View>
          <View style={{ flex: 1 }}>
            <PrimaryButton label="Verify" onPress={() => decide("verified")} />
          </View>
        </View>
      </View>
    </Screen>
  );
}
