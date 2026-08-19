import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import Screen from "../../components/Screen";
import AdminTopAppBar from "../../components/AdminTopAppBar";
import SegmentedControl from "../../components/SegmentedControl";
import AppIcon from "../../components/AppIcon";
import { OutlineButton, PrimaryButton } from "../../components/Buttons";
import { colors, spacing, radii, fontFamilies, shadows } from "../../theme/tokens";

// 1:1 with approvals_management/code.html for the "Pharmacies" tab (the
// only state this Stitch export rendered — 2 example pharmacy cards with
// AMM/license line + Reject/Approve). The "Pharmacist accounts" and
// "Delivery agents" tab content wasn't in the export, so those two card
// variants below are extended to match the same visual language (rounded
// card, Reject/Approve pair) per the original Stitch prompt spec — flagged
// here since it's the one part of this screen that isn't a direct 1:1 copy.
const PHARMACIES = [
  { id: "1", name: "Pharmacie du Centre", amm: "4829-PY", license: "L-902", address: "Rue Marché Central, Yaoundé" },
  { id: "2", name: "Pharmacie Bastos Santé", amm: "5102-PY", license: "L-104", address: "Avenue Mballa Eloumden, Yaoundé" },
];

const PHARMACIST_ACCOUNTS = [
  { id: "1", name: "Dr. Amara Oumarou", pharmacy: "Pharmacie Centrale de Yaoundé", onpc: "ONPC-33210" },
];

const DELIVERY_AGENTS = [
  { id: "1", name: "Samuel Eto'o", phone: "+237 655 987 654", vehicle: "Motorcycle" },
];

export default function ApprovalsScreen() {
  const [tab, setTab] = useState("pharmacies");

  return (
    <Screen>
      <AdminTopAppBar />
      <ScrollView contentContainerStyle={{ padding: spacing.containerMargin, gap: spacing.lg }}>
        <View>
          <Text style={{ fontFamily: fontFamilies.jakarta.extrabold, fontSize: 24, color: colors.onSurface }}>Approvals</Text>
          <Text style={{ fontFamily: fontFamilies.manrope.medium, fontSize: 14, color: colors.onSurfaceVariant, marginTop: 4 }}>
            Review and manage pending registration requests.
          </Text>
        </View>

        <SegmentedControl
          options={[
            { label: "Pharmacies", value: "pharmacies" },
            { label: "Pharmacist accounts", value: "pharmacists" },
            { label: "Delivery agents", value: "delivery" },
          ]}
          value={tab}
          onChange={setTab}
        />

        {tab === "pharmacies" &&
          PHARMACIES.map((p) => (
            <ApprovalCard key={p.id}>
              <View style={{ flexDirection: "row", gap: spacing.md }}>
                <View style={{ width: 64, height: 64, borderRadius: radii.xl, backgroundColor: colors.surfaceContainerLow, alignItems: "center", justifyContent: "center" }}>
                  <AppIcon name="storefront" size={26} color={colors.primary} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontFamily: fontFamilies.jakarta.bold, fontSize: 16, color: colors.onSurface }}>{p.name}</Text>
                  <Text style={{ fontFamily: fontFamilies.manrope.medium, fontSize: 13, color: colors.onSurfaceVariant, marginTop: 2 }}>
                    AMM: {p.amm} | License: {p.license}
                  </Text>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 4, marginTop: 6 }}>
                    <AppIcon name="location_on" size={14} color={colors.onSurfaceVariant} />
                    <Text style={{ fontFamily: fontFamilies.manrope.medium, fontSize: 12.5, color: colors.onSurfaceVariant }}>{p.address}</Text>
                  </View>
                </View>
              </View>
            </ApprovalCard>
          ))}

        {tab === "pharmacists" &&
          PHARMACIST_ACCOUNTS.map((p) => (
            <ApprovalCard key={p.id}>
              <View style={{ flexDirection: "row", gap: spacing.md }}>
                <View style={{ width: 64, height: 64, borderRadius: radii.xl, backgroundColor: colors.surfaceContainerLow, alignItems: "center", justifyContent: "center" }}>
                  <AppIcon name="badge" size={26} color={colors.primary} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontFamily: fontFamilies.jakarta.bold, fontSize: 16, color: colors.onSurface }}>{p.name}</Text>
                  <Text style={{ fontFamily: fontFamilies.manrope.medium, fontSize: 13, color: colors.onSurfaceVariant, marginTop: 2 }}>
                    Joining: {p.pharmacy}
                  </Text>
                  <Text style={{ fontFamily: fontFamilies.manrope.medium, fontSize: 12.5, color: colors.onSurfaceVariant, marginTop: 4 }}>
                    ONPC license: {p.onpc}
                  </Text>
                </View>
              </View>
            </ApprovalCard>
          ))}

        {tab === "delivery" &&
          DELIVERY_AGENTS.map((d) => (
            <ApprovalCard key={d.id}>
              <View style={{ flexDirection: "row", gap: spacing.md, marginBottom: spacing.sm }}>
                <View style={{ width: 64, height: 64, borderRadius: radii.xl, backgroundColor: colors.surfaceContainerLow, alignItems: "center", justifyContent: "center" }}>
                  <AppIcon name="two_wheeler" size={26} color={colors.primary} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontFamily: fontFamilies.jakarta.bold, fontSize: 16, color: colors.onSurface }}>{d.name}</Text>
                  <Text style={{ fontFamily: fontFamilies.manrope.medium, fontSize: 13, color: colors.onSurfaceVariant, marginTop: 2 }}>{d.phone}</Text>
                  <Text style={{ fontFamily: fontFamilies.manrope.medium, fontSize: 12.5, color: colors.onSurfaceVariant, marginTop: 4 }}>Vehicle: {d.vehicle}</Text>
                </View>
              </View>
              <View style={{ flexDirection: "row", gap: 8 }}>
                <DocChip label="ID card" />
                <DocChip label="License/registration" />
              </View>
            </ApprovalCard>
          ))}
      </ScrollView>
    </Screen>
  );
}

function ApprovalCard({ children }) {
  return (
    <View style={[{ backgroundColor: colors.surfaceContainerLowest, borderRadius: 24, padding: spacing.md }, shadows.card]}>
      {children}
      <View style={{ flexDirection: "row", gap: spacing.sm, marginTop: spacing.lg }}>
        <View style={{ flex: 1 }}>
          <OutlineButton label="Reject" tone="danger" onPress={() => {}} />
        </View>
        <View style={{ flex: 1 }}>
          <PrimaryButton label="Approve" onPress={() => {}} />
        </View>
      </View>
    </View>
  );
}

function DocChip({ label }) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: colors.surfaceContainer, borderRadius: radii.full, paddingHorizontal: 12, paddingVertical: 6 }}>
      <AppIcon name="description" size={14} color={colors.primary} />
      <Text style={{ fontFamily: fontFamilies.manrope.bold, fontSize: 12, color: colors.onSurface }}>{label}</Text>
    </View>
  );
}
