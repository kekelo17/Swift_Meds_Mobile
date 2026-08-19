import React, { useState } from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import { useRoute } from "@react-navigation/native";
import Screen from "../../components/Screen";
import TopAppBar from "../../components/TopAppBar";
import StatusPill from "../../components/StatusPill";
import Timeline from "../../components/Timeline";
import RouteMapCard from "../../components/RouteMapCard";
import AppIcon from "../../components/AppIcon";
import { PrimaryButton } from "../../components/Buttons";
import { colors, spacing, radii, fontFamilies, shadows } from "../../theme/tokens";

// 1:1 with delivery_tracking_1/code.html: 4-step timeline, route card,
// ETA card, and the client's own "Confirm delivery received" action —
// this is the client-side action that flips delivery_requests.status to
// 'delivered' via an RPC restricted to client_id = auth.uid(), NOT
// something the delivery agent controls (per the schema note discussed
// earlier).
export default function DeliveryTrackingScreen() {
  const route = useRoute();
  const reservation = route.params?.reservation || { pharmacy: "Pharmacie du Centre" };
  const [confirmed, setConfirmed] = useState(false);

  const steps = [
    { title: "Reservation confirmed", subtitle: "10:32 AM", state: "done" },
    { title: "Agent assigned", subtitle: "10:48 AM", state: "done" },
    { title: "On the way", subtitle: "10:55 AM", state: "done" },
    { title: "Delivered", subtitle: confirmed ? "Confirmed by you" : "Awaiting confirmation", state: confirmed ? "done" : "active" },
  ];

  return (
    <Screen>
      <TopAppBar title={reservation.pharmacy} subtitle="Delivery tracking" showBack />
      <ScrollView contentContainerStyle={{ padding: spacing.containerMargin, gap: spacing.lg, flexGrow: 1 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <Text style={{ fontFamily: fontFamilies.jakarta.bold, fontSize: 16, color: colors.onSurface }}>Order status</Text>
          <StatusPill label={confirmed ? "delivered" : "in_progress"} />
        </View>

        <View style={[{ backgroundColor: colors.surfaceContainerLowest, borderRadius: radii.xl, padding: spacing.md }, shadows.card]}>
          <Timeline steps={steps} />
        </View>

        <RouteMapCard />

        <View style={[{ backgroundColor: colors.surfaceContainerLowest, borderRadius: radii.xl, padding: spacing.md, flexDirection: "row", alignItems: "center", gap: 12 }, shadows.card]}>
          <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: colors.surfaceContainer, alignItems: "center", justifyContent: "center" }}>
            <AppIcon name="schedule" size={18} color={colors.primary} />
          </View>
          <View>
            <Text style={{ fontFamily: fontFamilies.jakarta.bold, fontSize: 15, color: colors.onSurface }}>Estimated arrival: 18-25 min</Text>
            <Text style={{ fontFamily: fontFamilies.manrope.medium, fontSize: 12, color: colors.onSurfaceVariant, marginTop: 2 }}>
              Estimated based on distance from the pharmacy to your location.
            </Text>
          </View>
        </View>

        <View style={{ flex: 1 }} />

        <View style={{ gap: 8 }}>
          <PrimaryButton
            label={confirmed ? "Delivery confirmed" : "Confirm delivery received"}
            icon={<AppIcon name="fact_check" size={18} color={colors.white} />}
            disabled={confirmed}
            onPress={() =>
              Alert.alert("Confirm delivery", "Have you physically received your order?", [
                { text: "Not yet", style: "cancel" },
                { text: "Yes, confirm", onPress: () => setConfirmed(true) },
              ])
            }
          />
          <Text style={{ fontFamily: fontFamilies.manrope.medium, fontSize: 11.5, color: colors.onSurfaceVariant, textAlign: "center", paddingHorizontal: spacing.md }}>
            Only confirm once you've physically received your order. This closes out the delivery.
          </Text>
        </View>
      </ScrollView>
    </Screen>
  );
}
