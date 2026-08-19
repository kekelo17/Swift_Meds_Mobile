import React, { useState } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Screen from "../../components/Screen";
import TopAppBar from "../../components/TopAppBar";
import TextField from "../../components/TextField";
import AppIcon from "../../components/AppIcon";
import { PrimaryButton } from "../../components/Buttons";
import { colors, spacing, radii, fontFamilies, shadows } from "../../theme/tokens";

// 1:1 with add_medication_1/code.html: searchable medication field +
// "Add new to catalog" link, quantity stepper, price input, requires-
// prescription toggle, Save button. Maps to pharmacy_medications +
// medications.requires_prescription in schema.sql.
export default function AddMedicationScreen() {
  const navigation = useNavigation();
  const [search, setSearch] = useState("");
  const [qty, setQty] = useState(1);
  const [price, setPrice] = useState("");
  const [requiresPrescription, setRequiresPrescription] = useState(false);

  return (
    <Screen>
      <TopAppBar title="Add medication" showBack />
      <ScrollView contentContainerStyle={{ padding: spacing.containerMargin, gap: spacing.lg }}>
        <View style={{ gap: 8 }}>
          <TextField label="Medication" icon="search" placeholder="Search drug name..." value={search} onChangeText={setSearch} />
          <Pressable style={{ alignSelf: "flex-end", flexDirection: "row", alignItems: "center", gap: 4 }}>
            <AppIcon name="add" size={16} color={colors.primaryContainer} />
            <Text style={{ fontFamily: fontFamilies.manrope.bold, fontSize: 13, color: colors.primaryContainer }}>Add new to catalog</Text>
          </Pressable>
        </View>

        <View style={{ gap: 8 }}>
          <Text style={{ fontFamily: fontFamilies.jakarta.bold, fontSize: 16, color: colors.onSurface }}>Quantity</Text>
          <View
            style={[
              { height: 56, borderRadius: radii.xxl, borderWidth: 1.5, borderColor: colors.divider, backgroundColor: colors.surfaceContainerLowest, flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 8 },
              shadows.card,
            ]}
          >
            <Pressable onPress={() => setQty((q) => Math.max(1, q - 1))} style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: colors.surfaceVariant, alignItems: "center", justifyContent: "center" }}>
              <AppIcon name="remove" size={20} color={colors.onSurface} />
            </Pressable>
            <Text style={{ fontFamily: fontFamilies.jakarta.extrabold, fontSize: 20, color: colors.onSurface }}>{qty}</Text>
            <Pressable onPress={() => setQty((q) => q + 1)} style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: colors.surfaceVariant, alignItems: "center", justifyContent: "center" }}>
              <AppIcon name="add" size={20} color={colors.onSurface} />
            </Pressable>
          </View>
        </View>

        <View style={{ gap: 8 }}>
          <Text style={{ fontFamily: fontFamilies.jakarta.bold, fontSize: 16, color: colors.onSurface }}>Price (XAF)</Text>
          <View
            style={[
              { height: 56, borderRadius: radii.xxl, borderWidth: 1.5, borderColor: colors.divider, backgroundColor: colors.surfaceContainerLowest, flexDirection: "row", alignItems: "center", paddingHorizontal: 16 },
              shadows.card,
            ]}
          >
            <Text style={{ fontFamily: fontFamilies.jakarta.bold, fontSize: 16, color: colors.onSurfaceVariant, marginRight: 10 }}>FCFA</Text>
            <TextField value={price} onChangeText={setPrice} placeholder="0" keyboardType="numeric" style={{ flex: 1 }} />
          </View>
        </View>

        <View
          style={[
            { backgroundColor: colors.surfaceContainerLowest, borderRadius: radii.xxl, borderWidth: 1.5, borderColor: colors.divider, padding: spacing.md, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
            shadows.card,
          ]}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm, flex: 1 }}>
            <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: colors.surfaceContainerLow, alignItems: "center", justifyContent: "center" }}>
              <AppIcon name="prescriptions" size={18} color={colors.primary} />
            </View>
            <Text style={{ fontFamily: fontFamilies.jakarta.bold, fontSize: 15, color: colors.onSurface, flex: 1 }}>Requires prescription</Text>
          </View>
          <Pressable
            onPress={() => setRequiresPrescription((v) => !v)}
            style={{ width: 48, height: 28, borderRadius: 14, backgroundColor: requiresPrescription ? colors.primaryContainer : colors.outlineVariant, justifyContent: "center", padding: 3 }}
          >
            <View style={{ width: 22, height: 22, borderRadius: 11, backgroundColor: colors.white, alignSelf: requiresPrescription ? "flex-end" : "flex-start" }} />
          </Pressable>
        </View>
      </ScrollView>

      <View style={{ padding: spacing.containerMargin, paddingBottom: spacing.xl }}>
        <PrimaryButton label="Save" onPress={() => navigation.goBack()} />
      </View>
    </Screen>
  );
}
