import React, { useState } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Screen from "../../components/Screen";
import AdminTopAppBar from "../../components/AdminTopAppBar";
import AppIcon from "../../components/AppIcon";
import StatusPill from "../../components/StatusPill";
import { colors, spacing, radii, fontFamilies, shadows } from "../../theme/tokens";

// 1:1 with admin_directory/code.html for the "Reservations" tab (the only
// state this export rendered — 4 rows with a status pill and price). The
// Deliveries/Users/Medications tab content wasn't in the export, so those
// three lists below are extended to match the same row pattern per the
// original Stitch prompt spec.
const TABS = ["Reservations", "Deliveries", "Users", "Medications"];

const RESERVATIONS = [
  { id: "1", name: "Pharmacie du Centre", value: "45,000 XAF", status: "pending" },
  { id: "2", name: "HealthPlus Yaoundé", value: "12,500 XAF", status: "paid" },
  { id: "3", name: "MediCare Bastos", value: "8,200 XAF", status: "failed" },
  { id: "4", name: "Pharmacie de la Poste", value: "115,000 XAF", status: "paid" },
];

const DELIVERIES = [
  { id: "1", name: "Samuel Eto'o → Bastos", value: "800 XAF", status: "in_progress" },
  { id: "2", name: "Jean-Luc A. → Mvog-Mbi", value: "1,000 XAF", status: "delivered" },
  { id: "3", name: "Unassigned → Nlongkak", value: "650 XAF", status: "pending" },
];

const USERS = [
  { id: "1", name: "Dr. Amara Oumarou", value: "Pharmacist", status: "approved" },
  { id: "2", name: "Samuel Eto'o", value: "Delivery agent", status: "approved" },
  { id: "3", name: "Jean Dupont", value: "Client", status: "approved" },
];

const MEDICATIONS = [
  { id: "1", name: "Amoxicillin 500mg", value: "Requires prescription", status: "info" },
  { id: "2", name: "Paracetamol 1g", value: "Over the counter", status: "success" },
];

export default function DirectoryScreen() {
  const navigation = useNavigation();
  const [tab, setTab] = useState("Reservations");

  const rows = { Reservations: RESERVATIONS, Deliveries: DELIVERIES, Users: USERS, Medications: MEDICATIONS }[tab];

  return (
    <Screen>
      <AdminTopAppBar />
      <View style={{ flexDirection: "row", gap: spacing.sm, paddingHorizontal: spacing.containerMargin, paddingVertical: spacing.sm }}>
        {TABS.map((t) => {
          const active = tab === t;
          return (
            <Pressable
              key={t}
              onPress={() => setTab(t)}
              style={{
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: radii.full,
                backgroundColor: active ? colors.primaryContainer : colors.surfaceContainer,
                borderWidth: active ? 0 : 1,
                borderColor: colors.outlineVariant,
              }}
            >
              <Text style={{ fontFamily: fontFamilies.jakarta.bold, fontSize: 12, color: active ? colors.onPrimary : colors.onSurfaceVariant }}>
                {t}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <ScrollView contentContainerStyle={{ padding: spacing.containerMargin, gap: spacing.sm }}>
        <View
          style={{
            height: 56,
            backgroundColor: colors.white,
            borderRadius: 16,
            borderWidth: 1,
            borderColor: colors.divider || colors.surfaceVariant,
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: spacing.md,
            marginBottom: spacing.sm,
          }}
        >
          <AppIcon name="search" size={20} color={colors.outline} />
          <Text style={{ marginLeft: 10, fontFamily: fontFamilies.manrope.medium, fontSize: 15, color: colors.outlineVariant }}>
            Search directory...
          </Text>
          <View style={{ marginLeft: "auto", width: 32, height: 32, borderRadius: 16, backgroundColor: colors.surfaceContainer, alignItems: "center", justifyContent: "center" }}>
            <AppIcon name="filter_list" size={18} color={colors.primary} />
          </View>
        </View>

        {rows.map((r) => (
          <Pressable
            key={r.id}
            onPress={() => tab === "Users" && navigation.navigate("UserDetails", { user: r })}
            style={[
              { backgroundColor: colors.white, borderRadius: 16, padding: spacing.md, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
              shadows.card,
            ]}
          >
            <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, flex: 1 }}>
              <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: colors.surfaceContainerLow, alignItems: "center", justifyContent: "center" }}>
                <AppIcon name={tab === "Users" ? "person" : tab === "Medications" ? "medication" : "storefront"} size={20} color={colors.primary} />
              </View>
              <View style={{ flex: 1 }}>
                <Text numberOfLines={1} style={{ fontFamily: fontFamilies.jakarta.bold, fontSize: 15, color: colors.onSurface }}>{r.name}</Text>
                <Text style={{ fontFamily: fontFamilies.jakarta.extrabold, fontSize: 15, color: colors.primary, marginTop: 2 }}>{r.value}</Text>
              </View>
            </View>
            <View style={{ alignItems: "flex-end", gap: 6 }}>
              <StatusPill label={r.status} />
              <AppIcon name="chevron_right" size={16} color={colors.outlineVariant} />
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </Screen>
  );
}
