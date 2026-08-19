import React, { useState } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Screen from "../../components/Screen";
import TopAppBar from "../../components/TopAppBar";
import TextField from "../../components/TextField";
import AppIcon from "../../components/AppIcon";
import { PrimaryButton } from "../../components/Buttons";
import { colors, spacing, radii, fontFamilies, shadows } from "../../theme/tokens";

// 1:1 with walk_in_reservation_1/code.html — for clients paying in person
// at the counter. payment_method="in_person", payment_status="paid" set
// immediately per the architecture doc's pharmacist walk-in flow.
export default function WalkInReservationScreen() {
  const navigation = useNavigation();
  const [medication] = useState("Paracetamol 500mg");
  const [qty, setQty] = useState(2);
  const [phone, setPhone] = useState("");

  const unitPrice = 500;

  return (
    <Screen>
      <TopAppBar title="Walk-in reservation" showBack />
      <ScrollView contentContainerStyle={{ padding: spacing.containerMargin, gap: spacing.lg }}>
        <View style={[{ backgroundColor: colors.surfaceContainerLowest, borderRadius: 24, padding: spacing.md, gap: spacing.lg, borderWidth: 1, borderColor: colors.surfaceContainerHigh }, shadows.card]}>
          <View style={{ gap: 6 }}>
            <Text style={{ fontFamily: fontFamilies.jakarta.bold, fontSize: 11, color: colors.onSurfaceVariant, textTransform: "uppercase", letterSpacing: 0.5 }}>
              Medication Selection
            </Text>
            <View
              style={{
                height: 56,
                borderRadius: 16,
                borderWidth: 1,
                borderColor: "rgba(14,124,74,0.3)",
                backgroundColor: colors.surfaceContainerLow,
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 14,
                justifyContent: "space-between",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                <AppIcon name="search" size={18} color={colors.outline} />
                <Text style={{ fontFamily: fontFamilies.manrope.medium, fontSize: 16, color: colors.onSurface }}>{medication}</Text>
              </View>
              <View style={{ backgroundColor: colors.surfaceContainerHighest, borderRadius: radii.full, paddingHorizontal: 8, paddingVertical: 4, flexDirection: "row", alignItems: "center", gap: 4 }}>
                <AppIcon name="inventory_2" size={12} color={colors.secondary} />
                <Text style={{ fontFamily: fontFamilies.jakarta.bold, fontSize: 10, color: colors.secondary }}>24 IN STOCK</Text>
              </View>
            </View>
          </View>

          <View style={{ height: 1, backgroundColor: colors.surfaceVariant }} />

          <View style={{ gap: 6 }}>
            <Text style={{ fontFamily: fontFamilies.jakarta.bold, fontSize: 11, color: colors.onSurfaceVariant, textTransform: "uppercase", letterSpacing: 0.5 }}>
              Dispense Quantity
            </Text>
            <View style={{ height: 56, borderRadius: 16, borderWidth: 1, borderColor: colors.outlineVariant, backgroundColor: colors.surfaceContainerLowest, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 8 }}>
              <Pressable onPress={() => setQty((q) => Math.max(1, q - 1))} style={{ width: 48, height: 48, borderRadius: 24, alignItems: "center", justifyContent: "center" }}>
                <AppIcon name="remove" size={20} color={colors.onSurfaceVariant} />
              </Pressable>
              <View style={{ alignItems: "center" }}>
                <Text style={{ fontFamily: fontFamilies.jakarta.extrabold, fontSize: 20, color: colors.onSurface }}>{qty}</Text>
                <Text style={{ fontFamily: fontFamilies.jakarta.bold, fontSize: 10, color: colors.outline }}>Packs</Text>
              </View>
              <Pressable onPress={() => setQty((q) => q + 1)} style={{ width: 48, height: 48, borderRadius: 24, alignItems: "center", justifyContent: "center" }}>
                <AppIcon name="add" size={20} color={colors.primary} />
              </Pressable>
            </View>
          </View>

          <TextField label="Client phone (optional)" icon="phone" placeholder="+237 6XX XXX XXX" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
        </View>

        <View style={[{ backgroundColor: colors.surfaceContainerLowest, borderRadius: 16, padding: spacing.md, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }, shadows.card]}>
          <Text style={{ fontFamily: fontFamilies.manrope.medium, fontSize: 16, color: colors.onSurfaceVariant }}>Total</Text>
          <Text style={{ fontFamily: fontFamilies.jakarta.extrabold, fontSize: 20, color: colors.primary }}>{(unitPrice * qty).toLocaleString()} XAF</Text>
        </View>
      </ScrollView>

      <View style={{ padding: spacing.containerMargin, paddingBottom: spacing.xl }}>
        <PrimaryButton label="Confirm — paid in person" onPress={() => navigation.goBack()} />
      </View>
    </Screen>
  );
}
