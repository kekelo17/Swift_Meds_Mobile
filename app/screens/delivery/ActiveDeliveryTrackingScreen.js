import React from "react";
import { View, Text, ScrollView } from "react-native";
import Screen from "../../components/Screen";
import Timeline from "../../components/Timeline";
import RouteMapCard from "../../components/RouteMapCard";
import StatusPill from "../../components/StatusPill";
import AppIcon from "../../components/AppIcon";
import { OutlineButton, PrimaryButton } from "../../components/Buttons";
import { colors, spacing, radii, fontFamilies, shadows } from "../../theme/tokens";

// 1:1 with active_delivery_tracking_1/code.html: order card with a
// pickup/drop-off mini timeline, route map, and BOTH action-state cards
// shown (per the pack: "Mark picked up / on the way" and "Mark delivered")
// so both states are visible for reference. The caption clarifies the
// client confirms the final "delivered" state on their side (see
// DeliveryTrackingScreen's "Confirm delivery received" button) — the agent
// does not set that final state themselves.
export default function ActiveDeliveryTrackingScreen() {
  return (
    <Screen>
      <ScrollView contentContainerStyle={{ padding: spacing.containerMargin, gap: spacing.lg }}>
        <View style={[{ backgroundColor: colors.surfaceContainerLowest, borderRadius: radii.xl, padding: spacing.md, overflow: "hidden" }, shadows.card, { borderLeftWidth: 4, borderLeftColor: colors.primaryContainer }]}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: spacing.md }}>
            <View style={{ backgroundColor: colors.surfaceContainer, borderRadius: radii.full, paddingHorizontal: 10, paddingVertical: 4 }}>
              <Text style={{ fontFamily: fontFamilies.jakarta.bold, fontSize: 10, color: colors.onSurfaceVariant }}>ORDER #YD-492</Text>
            </View>
            <StatusPill label="in_progress" />
          </View>

          <Timeline
            steps={[
              { title: "Pharmacie du Centre", subtitle: "PICKUP · Avenue Kennedy", state: "done" },
              { title: "Quartier Bastos", subtitle: "DROP-OFF · Client location", state: "active" },
            ]}
          />
        </View>

        <RouteMapCard vehicleIcon="two_wheeler" />

        <View style={[{ backgroundColor: colors.surfaceContainerLowest, borderRadius: radii.xl, padding: spacing.md }, shadows.card]}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12, marginBottom: spacing.sm }}>
            <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: "#FFF3E0", alignItems: "center", justifyContent: "center" }}>
              <AppIcon name="local_shipping" size={18} color="#E65100" />
            </View>
            <View>
              <Text style={{ fontFamily: fontFamilies.jakarta.bold, fontSize: 15, color: colors.onSurface }}>Package Picked Up</Text>
              <Text style={{ fontFamily: fontFamilies.manrope.medium, fontSize: 12.5, color: colors.onSurfaceVariant }}>Update status to en route</Text>
            </View>
          </View>
          <OutlineButton
            label="Mark picked up / on the way"
            onPress={() => {}}
            style={{ borderColor: "#F57C00" }}
          />
        </View>

        <View style={[{ backgroundColor: colors.surfaceContainerLowest, borderRadius: radii.xl, padding: spacing.md, opacity: 0.95 }, shadows.card]}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12, marginBottom: spacing.sm }}>
            <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: colors.inverseOnSurface, alignItems: "center", justifyContent: "center" }}>
              <AppIcon name="check_circle" size={18} color={colors.primaryContainer} />
            </View>
            <View>
              <Text style={{ fontFamily: fontFamilies.jakarta.bold, fontSize: 15, color: colors.onSurface }}>Arrived at Destination</Text>
              <Text style={{ fontFamily: fontFamilies.manrope.medium, fontSize: 12.5, color: colors.onSurfaceVariant }}>Handed to customer</Text>
            </View>
          </View>
          <PrimaryButton label="Mark delivered" onPress={() => {}} />
        </View>

        <Text style={{ fontFamily: fontFamilies.manrope.medium, fontSize: 12, color: colors.outline, textAlign: "center", paddingHorizontal: spacing.md }}>
          The client confirms final delivery on their side once it arrives — this updates your status to delivered
          once they do.
        </Text>
      </ScrollView>
    </Screen>
  );
}
