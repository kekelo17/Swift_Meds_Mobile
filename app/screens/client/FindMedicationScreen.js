import React, { useState } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Screen from "../../components/Screen";
import AppIcon from "../../components/AppIcon";
import MapPreview from "../../components/MapPreview";
import StatusPill from "../../components/StatusPill";
import { colors, spacing, radii, fontFamilies, shadows } from "../../theme/tokens";

const RESULTS = [
  { id: "1", name: "Pharmacie de la Poste", distance: "1.2 km away", price: "500 XAF", left: "30%", top: "35%" },
  { id: "2", name: "Pharmacie du Centre", distance: "2.5 km away", price: "500 XAF", left: "62%", top: "28%" },
  { id: "3", name: "Pharmacie du Soleil", distance: "3.1 km away", price: "500 XAF", left: "45%", top: "68%" },
  { id: "4", name: "Pharmacie de l'Espérance", distance: "4.8 km away", price: "500 XAF", left: "72%", top: "60%" },
];

// 1:1 with find_medication_1/code.html: search bar, map with pharmacy
// pins + a distinct "you are here" pin, scrollable result cards.
export default function FindMedicationScreen() {
  const navigation = useNavigation();
  const [query, setQuery] = useState("");

  return (
    <Screen edges={["top"]}>
      <ScrollView contentContainerStyle={{ paddingBottom: 24 }} showsVerticalScrollIndicator={false}>
        <View style={{ paddingHorizontal: spacing.containerMargin, paddingVertical: spacing.md, flexDirection: "row", alignItems: "center" }}>
          <View
            style={[
              {
                flex: 1,
                height: 56,
                backgroundColor: colors.surfaceContainerLowest,
                borderRadius: radii.xl,
                borderWidth: 1.5,
                borderColor: colors.surfaceVariant,
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 16,
              },
              shadows.card,
            ]}
          >
            <AppIcon name="search" size={20} color={colors.outline} />
            <Text style={{ marginLeft: 10, fontFamily: fontFamilies.manrope.medium, fontSize: 16, color: query ? colors.onSurface : colors.outlineVariant }}>
              {query || "e.g. Paracetamol, Amoxicillin..."}
            </Text>
          </View>
          <Pressable
            onPress={() => {}}
            style={{ marginLeft: 10, width: 44, height: 44, borderRadius: 22, backgroundColor: colors.surfaceContainerLowest, alignItems: "center", justifyContent: "center", ...shadows.card }}
          >
            <AppIcon name="my_location" size={20} color={colors.primary} />
          </Pressable>
        </View>

        <MapPreview
          pins={RESULTS}
          height={260}
        />

        <View style={{ paddingHorizontal: spacing.containerMargin, paddingTop: spacing.lg, gap: spacing.sm }}>
          <Text style={{ fontFamily: fontFamilies.jakarta.bold, fontSize: 18, color: colors.onSurface, marginBottom: 4 }}>
            Nearby Pharmacies
          </Text>

          {RESULTS.map((r) => (
            <Pressable
              key={r.id}
              onPress={() => navigation.navigate("PharmacyDetails", { pharmacy: r })}
              style={({ pressed }) => [
                {
                  backgroundColor: colors.surfaceContainerLowest,
                  borderRadius: radii.xl,
                  padding: spacing.md,
                  flexDirection: "row",
                  alignItems: "center",
                  transform: [{ scale: pressed ? 0.98 : 1 }],
                },
                shadows.card,
              ]}
            >
              <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: colors.surfaceContainer, alignItems: "center", justifyContent: "center", marginRight: 14 }}>
                <AppIcon name="local_pharmacy" size={20} color={colors.primary} />
              </View>
              <View style={{ flex: 1 }}>
                <Text numberOfLines={1} style={{ fontFamily: fontFamilies.jakarta.bold, fontSize: 16, color: colors.onSurface }}>
                  {r.name}
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginTop: 4 }}>
                  <Text style={{ fontFamily: fontFamilies.manrope.medium, fontSize: 13, color: colors.onSurfaceVariant }}>{r.distance}</Text>
                  <StatusPill label="In Stock" tone="success" />
                </View>
              </View>
              <Text style={{ fontFamily: fontFamilies.jakarta.extrabold, fontSize: 18, color: colors.primary, marginLeft: 10 }}>{r.price}</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </Screen>
  );
}
