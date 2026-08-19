import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Screen from "../../components/Screen";
import StatCard from "../../components/StatCard";
import StatusPill from "../../components/StatusPill";
import AppIcon from "../../components/AppIcon";
import { colors, spacing, radii, fontFamilies, shadows } from "../../theme/tokens";

const PENDING_PRESCRIPTIONS = [
  { medication: "Amoxicillin 500mg", ref: "Res #4829" },
  { medication: "Paracetamol 1g", ref: "Res #4825" },
];

// 1:1 with pharmacist_dashboard_1/code.html.
export default function PharmacistDashboardScreen() {
  const navigation = useNavigation();

  return (
    <Screen>
      <View style={{ paddingHorizontal: spacing.containerMargin, paddingTop: spacing.lg, paddingBottom: spacing.sm }}>
        <Text style={{ fontFamily: fontFamilies.jakarta.extrabold, fontSize: 20, color: colors.onSurface }}>Swift Meds</Text>
        <Text style={{ fontFamily: fontFamilies.manrope.medium, fontSize: 13, color: colors.onSurfaceVariant, marginTop: 2 }}>
          Pharmacie du Centre
        </Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: spacing.containerMargin, gap: spacing.lg }}>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.sm }}>
          <View style={{ width: "47%" }}>
            <StatCard icon="inventory_2" value="1,240" label="Items in stock" />
          </View>
          <View style={{ width: "47%" }}>
            <StatCard icon="warning" value="8" label="Low stock alerts" tone="warning" />
          </View>
          <View style={{ width: "47%" }}>
            <StatCard icon="pending_actions" value="12" label="Pending res." />
          </View>
          <View style={{ width: "47%" }}>
            <StatCard icon="payments" value="145,000 XAF" label="Today's revenue" />
          </View>
        </View>

        <View style={{ gap: spacing.sm }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <Text style={{ fontFamily: fontFamilies.jakarta.bold, fontSize: 16, color: colors.onSurface }}>
              Prescriptions awaiting review
            </Text>
            <Pressable onPress={() => navigation.navigate("ReservationsMgmt")}>
              <Text style={{ fontFamily: fontFamilies.jakarta.bold, fontSize: 12, color: colors.primary }}>See all</Text>
            </Pressable>
          </View>

          {PENDING_PRESCRIPTIONS.map((p) => (
            <Pressable
              key={p.ref}
              onPress={() => navigation.navigate("PrescriptionReview", { item: p })}
              style={[
                { backgroundColor: colors.surfaceContainerLowest, borderRadius: radii.xl, padding: spacing.md, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
                shadows.card,
              ]}
            >
              <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md }}>
                <View style={{ width: 48, height: 48, borderRadius: 14, backgroundColor: colors.surfaceContainer, alignItems: "center", justifyContent: "center" }}>
                  <AppIcon name="receipt_long" size={20} color={colors.primary} />
                </View>
                <View>
                  <Text style={{ fontFamily: fontFamilies.manrope.bold, fontSize: 15, color: colors.onSurface }}>{p.medication}</Text>
                  <Text style={{ fontFamily: fontFamilies.manrope.medium, fontSize: 13, color: colors.onSurfaceVariant, marginTop: 2 }}>{p.ref}</Text>
                </View>
              </View>
              <StatusPill label="pending" />
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </Screen>
  );
}
