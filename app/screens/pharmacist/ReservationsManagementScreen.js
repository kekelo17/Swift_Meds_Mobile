import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Screen from "../../components/Screen";
import TopAppBar from "../../components/TopAppBar";
import AppIcon from "../../components/AppIcon";
import { colors, spacing, fontFamilies, shadows } from "../../theme/tokens";

const RESERVATIONS = [
  { id: "RES-8902", client: "Jean-Pierre N.", price: "12,500 XAF", when: "Today, 14:30", paymentStatus: "paid", needsReview: false },
  { id: "RES-8903", client: "Marie Claire T.", price: "8,200 XAF", when: "Today, 11:05", paymentStatus: "pending", needsReview: true },
  { id: "RES-8899", client: "Étienne K.", price: "3,000 XAF", when: "Yesterday, 16:20", paymentStatus: "paid", needsReview: false },
];

// 1:1 with reservations_management_1/code.html — rows needing prescription
// review get a left accent stripe + amber "Prescription needs review" line.
export default function ReservationsManagementScreen() {
  const navigation = useNavigation();

  return (
    <Screen>
      <TopAppBar title="Reservations" showBack={false} rightIconName="add" onRightPress={() => navigation.navigate("WalkInReservation")} />
      <ScrollView contentContainerStyle={{ padding: spacing.containerMargin, gap: spacing.md }}>
        {RESERVATIONS.map((r) => (
          <Pressable
            key={r.id}
            onPress={() => r.needsReview && navigation.navigate("PrescriptionReview", { item: r })}
            style={[
              { backgroundColor: colors.white, borderRadius: 20, padding: spacing.md, overflow: "hidden" },
              shadows.card,
              r.needsReview && { borderLeftWidth: 4, borderLeftColor: colors.tertiaryFixedDim },
            ]}
          >
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
              <View>
                <Text style={{ fontFamily: fontFamilies.jakarta.bold, fontSize: 16, color: colors.onSurface }}>{r.client}</Text>
                <Text style={{ fontFamily: fontFamilies.manrope.medium, fontSize: 13, color: colors.onSurfaceVariant, marginTop: 2 }}>ID: #{r.id}</Text>
              </View>
              <View style={{ alignItems: "flex-end", gap: 6 }}>
                <Text style={{ fontFamily: fontFamilies.jakarta.extrabold, fontSize: 18, color: r.needsReview ? colors.onSurface : colors.primary }}>{r.price}</Text>
                <View style={{ backgroundColor: r.paymentStatus === "paid" ? colors.surfaceContainerLow : "#FFF4E5", borderRadius: 20, paddingHorizontal: 10, paddingVertical: 3 }}>
                  <Text style={{ fontFamily: fontFamilies.jakarta.bold, fontSize: 10, color: r.paymentStatus === "paid" ? colors.primary : "#956100" }}>
                    {r.paymentStatus.toUpperCase()}
                  </Text>
                </View>
              </View>
            </View>

            <View style={{ borderTopWidth: 1, borderTopColor: colors.surfaceVariant, paddingTop: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              {r.needsReview ? (
                <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                  <AppIcon name="warning" size={16} color="#956100" />
                  <Text style={{ fontFamily: fontFamilies.jakarta.bold, fontSize: 14, color: "#956100" }}>Prescription needs review</Text>
                </View>
              ) : (
                <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                  <AppIcon name="schedule" size={14} color={colors.onSurfaceVariant} />
                  <Text style={{ fontFamily: fontFamilies.manrope.medium, fontSize: 13, color: colors.onSurfaceVariant }}>{r.when}</Text>
                </View>
              )}
              {r.needsReview ? <AppIcon name="chevron_right" size={18} color="#956100" /> : (
                <Text style={{ fontFamily: fontFamilies.manrope.medium, fontSize: 12.5, color: colors.onSurfaceVariant }}>Payment: {r.paymentStatus}</Text>
              )}
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </Screen>
  );
}
