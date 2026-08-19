import React, { useState } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Screen from "../../components/Screen";
import AppIcon from "../../components/AppIcon";
import StatusPill from "../../components/StatusPill";
import { colors, spacing, radii, fontFamilies, shadows } from "../../theme/tokens";

// Reservation statuses match reservations.status in schema.sql exactly:
// pending_payment, confirmed, ready_for_pickup, completed, cancelled, expired.
const RESERVATIONS = [
  { id: "SM-4029", pharmacy: "Pharmacie de la Poste", when: "Today, 14:30", status: "pending_payment", price: "1,200 XAF", prescription: null },
  { id: "SM-4018", pharmacy: "Pharmacie du Centre", when: "Yesterday, 09:10", status: "confirmed", price: "3,400 XAF", prescription: "pending" },
  { id: "SM-4002", pharmacy: "Pharmacie du Soleil", when: "Mon, 08:45", status: "ready_for_pickup", price: "800 XAF", prescription: null },
  { id: "SM-3988", pharmacy: "Pharmacie de l'Espérance", when: "12 Jun", status: "completed", price: "2,000 XAF", prescription: null },
  { id: "SM-3971", pharmacy: "Pharmacie du Lac", when: "3 Jun", status: "cancelled", price: "500 XAF", prescription: null },
];

const FILTERS = ["All Orders", "Pending", "Completed"];

// 1:1 with my_reservations_1/code.html.
export default function MyReservationsScreen() {
  const navigation = useNavigation();
  const [filter, setFilter] = useState("All Orders");

  const filtered = RESERVATIONS.filter((r) => {
    if (filter === "All Orders") return true;
    if (filter === "Pending") return ["pending_payment", "confirmed", "ready_for_pickup"].includes(r.status);
    return r.status === "completed";
  });

  return (
    <Screen>
      <View style={{ paddingHorizontal: spacing.containerMargin, paddingTop: spacing.lg, paddingBottom: spacing.sm }}>
        <Text style={{ fontFamily: fontFamilies.jakarta.extrabold, fontSize: 24, color: colors.onSurface }}>My reservations</Text>
        <Text style={{ fontFamily: fontFamilies.manrope.medium, fontSize: 14, color: colors.onSurfaceVariant, marginTop: 4 }}>
          Track and manage your pharmacy orders.
        </Text>
      </View>

      <View style={{ flexDirection: "row", gap: 20, paddingHorizontal: spacing.containerMargin, borderBottomWidth: 1, borderBottomColor: colors.surfaceVariant, paddingBottom: 4 }}>
        {FILTERS.map((f) => {
          const active = filter === f;
          return (
            <Pressable key={f} onPress={() => setFilter(f)} style={{ paddingBottom: 10, borderBottomWidth: active ? 2 : 0, borderBottomColor: colors.primary }}>
              <Text style={{ fontFamily: fontFamilies.jakarta.bold, fontSize: 15, color: active ? colors.primary : colors.onSurfaceVariant }}>{f}</Text>
            </Pressable>
          );
        })}
      </View>

      <ScrollView contentContainerStyle={{ padding: spacing.containerMargin, gap: spacing.sm }}>
        {filtered.map((r) => (
          <Pressable
            key={r.id}
            onPress={() => navigation.navigate("DeliveryTracking", { reservation: r })}
            style={({ pressed }) => [
              { backgroundColor: colors.surfaceContainerLowest, borderRadius: radii.xl, padding: spacing.md, opacity: pressed ? 0.9 : 1 },
              shadows.card,
            ]}
          >
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
              <View style={{ flexDirection: "row", gap: 10, flex: 1 }}>
                <View style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: colors.surfaceContainer, alignItems: "center", justifyContent: "center" }}>
                  <AppIcon name="store" size={20} color={colors.tertiaryContainer} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontFamily: fontFamilies.jakarta.bold, fontSize: 16, color: colors.onSurface }}>{r.pharmacy}</Text>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 4, marginTop: 2 }}>
                    <AppIcon name="schedule" size={13} color={colors.onSurfaceVariant} />
                    <Text style={{ fontFamily: fontFamilies.manrope.medium, fontSize: 12.5, color: colors.onSurfaceVariant }}>{r.when}</Text>
                  </View>
                </View>
              </View>
              <StatusPill label={r.status} />
            </View>

            <View style={{ backgroundColor: colors.surfaceContainer, borderRadius: radii.lg, padding: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <Text style={{ fontFamily: fontFamilies.manrope.medium, fontSize: 12.5, color: colors.onSurfaceVariant }}>Order #{r.id}</Text>
              <Text style={{ fontFamily: fontFamilies.jakarta.bold, fontSize: 14, color: colors.primary }}>{r.price}</Text>
            </View>

            {r.prescription ? (
              <Text style={{ fontFamily: fontFamilies.manrope.bold, fontSize: 12, color: colors.info, marginTop: 8 }}>
                Prescription: {r.prescription}
              </Text>
            ) : null}
          </Pressable>
        ))}
      </ScrollView>
    </Screen>
  );
}
