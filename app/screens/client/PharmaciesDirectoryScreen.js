import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import Screen from "../../components/Screen";
import TopAppBar from "../../components/TopAppBar";
import AppIcon from "../../components/AppIcon";
import { colors, spacing, radii, fontFamilies, shadows } from "../../theme/tokens";

const PHARMACIES = [
  { name: "Pharmacie de la Paix", address: "Avenue Foch, Yaoundé", distance: "1.2 km", onDuty: true },
  { name: "Pharmacie du Centre", address: "Rue Marché Central, Yaoundé", distance: "1.8 km", onDuty: true },
  { name: "Pharmacie de la Poste", address: "Rue Joseph Essono Balla", distance: "2.4 km", onDuty: false },
  { name: "Pharmacie du Soleil", address: "Quartier Elig-Essono", distance: "3.1 km", onDuty: false },
  { name: "Pharmacie du Lac", address: "Quartier du Lac", distance: "4.0 km", onDuty: false },
];

// 1:1 with pharmacies_directory_1/code.html.
export default function PharmaciesDirectoryScreen() {
  const [query, setQuery] = useState("");

  return (
    <Screen>
      <TopAppBar title="Pharmacies" showBack={false} />
      <ScrollView contentContainerStyle={{ padding: spacing.containerMargin, gap: spacing.md }}>
        <View
          style={{
            height: 56,
            borderRadius: radii.xl,
            borderWidth: 1,
            borderColor: colors.outlineVariant,
            backgroundColor: colors.surfaceContainerLowest,
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: spacing.md,
          }}
        >
          <AppIcon name="search" size={20} color={colors.outline} />
          <Text style={{ marginLeft: 10, fontFamily: fontFamilies.manrope.medium, fontSize: 16, color: query ? colors.onSurface : colors.outlineVariant }}>
            {query || "Search pharmacies..."}
          </Text>
        </View>

        {PHARMACIES.map((p) => (
          <View key={p.name} style={[{ backgroundColor: colors.surfaceContainerLowest, borderRadius: radii.xl, padding: spacing.md, flexDirection: "row", gap: spacing.md, alignItems: "center" }, shadows.card]}>
            <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: colors.surfaceContainer, alignItems: "center", justifyContent: "center" }}>
              <AppIcon name="local_pharmacy" size={22} color={colors.primaryContainer} />
            </View>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
                <Text numberOfLines={1} style={{ flex: 1, fontFamily: fontFamilies.jakarta.bold, fontSize: 16, color: colors.onSurface, marginRight: 8 }}>
                  {p.name}
                </Text>
                {p.onDuty ? (
                  <View style={{ backgroundColor: colors.surfaceContainerHigh, borderRadius: radii.full, paddingHorizontal: 8, paddingVertical: 3 }}>
                    <Text style={{ fontFamily: fontFamilies.jakarta.bold, fontSize: 10, color: colors.onSurfaceVariant }}>ON DUTY</Text>
                  </View>
                ) : null}
              </View>
              <Text numberOfLines={1} style={{ fontFamily: fontFamilies.manrope.medium, fontSize: 13, color: colors.onSurfaceVariant, marginTop: 2 }}>
                {p.address}
              </Text>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 4, marginTop: 4 }}>
                <AppIcon name="location_on" size={14} color={colors.outline} />
                <Text style={{ fontFamily: fontFamilies.manrope.medium, fontSize: 12.5, color: colors.outline }}>{p.distance}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </Screen>
  );
}
