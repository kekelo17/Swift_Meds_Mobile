import React from "react";
import { View, Text, ScrollView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import MapPreview from "../../components/MapPreview";
import AppIcon from "../../components/AppIcon";
import { PrimaryButton, OutlineButton } from "../../components/Buttons";
import { colors, spacing, radii, fontFamilies, shadows } from "../../theme/tokens";

// 1:1 with pharmacy_details_1/code.html: dimmed full-screen map behind a
// bottom sheet with pharmacy header + status pill, bento info card
// (in stock / price / distance), operating hours, and Directions/Reserve
// buttons. Presented as a modal from FindMedicationScreen.
export default function PharmacyDetailsScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const pharmacy = route.params?.pharmacy || { name: "Pharmacie du Centre", distance: "2.5 km" };

  return (
    <View style={{ flex: 1, backgroundColor: colors.onSurface }}>
      <MapPreview height="100%" style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, opacity: 0.6 }} />
      <View style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(16,30,24,0.4)" }} />

      <View
        style={[
          {
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: colors.surfaceContainerLowest,
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            maxHeight: "80%",
          },
          shadows.raised,
        ]}
      >
        <View style={{ alignItems: "center", paddingTop: 8, paddingBottom: 12 }}>
          <View style={{ width: 40, height: 4, borderRadius: 2, backgroundColor: colors.outlineVariant }} />
        </View>

        <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.containerMargin, paddingBottom: 24 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: spacing.md }}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontFamily: fontFamilies.jakarta.extrabold, fontSize: 20, color: colors.onSurface }}>{pharmacy.name}</Text>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 4, marginTop: 4 }}>
                <AppIcon name="location_on" size={14} color={colors.onSurfaceVariant} />
                <Text style={{ fontFamily: fontFamilies.manrope.medium, fontSize: 13, color: colors.onSurfaceVariant }}>
                  Rue Marché Central, Yaoundé
                </Text>
              </View>
            </View>
            <View style={{ backgroundColor: colors.secondaryContainer, borderRadius: radii.full, paddingHorizontal: 10, paddingVertical: 5, flexDirection: "row", alignItems: "center", gap: 5 }}>
              <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: colors.secondary }} />
              <Text style={{ fontFamily: fontFamilies.jakarta.bold, fontSize: 11, color: colors.onSecondaryContainer }}>Open</Text>
            </View>
          </View>

          <View
            style={{
              backgroundColor: colors.surfaceContainerLow,
              borderRadius: radii.xl,
              padding: spacing.md,
              flexDirection: "row",
              justifyContent: "space-around",
              marginBottom: spacing.lg,
            }}
          >
            <InfoCell icon="inventory_2" label="In stock" value="24" />
            <InfoCell icon="payments" label="Price" value="1,200 XAF" />
            <InfoCell icon="route" label="Distance" value={pharmacy.distance || "2.5 km"} />
          </View>

          <Text style={{ fontFamily: fontFamilies.jakarta.bold, fontSize: 16, color: colors.onSurface, marginBottom: 8 }}>
            Operating Hours
          </Text>
          <View
            style={{
              backgroundColor: colors.surfaceContainer,
              borderRadius: radii.lg,
              padding: 12,
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: spacing.lg,
            }}
          >
            <Text style={{ fontFamily: fontFamilies.manrope.medium, fontSize: 14, color: colors.onSurfaceVariant }}>Today</Text>
            <Text style={{ fontFamily: fontFamilies.manrope.bold, fontSize: 14, color: colors.onSurface }}>08:00 - 22:00</Text>
          </View>

          <View style={{ flexDirection: "row", gap: spacing.sm }}>
            <View style={{ flex: 1 }}>
              <OutlineButton label="Directions" icon={<AppIcon name="route" size={18} color={colors.primaryContainer} />} onPress={() => {}} />
            </View>
            <View style={{ flex: 1 }}>
              <PrimaryButton
                label="Reserve"
                icon={<AppIcon name="event_available" size={18} color={colors.white} />}
                onPress={() => navigation.navigate("ReservePay", { pharmacy })}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

function InfoCell({ icon, label, value }) {
  return (
    <View style={{ alignItems: "center", gap: 6 }}>
      <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: colors.surfaceContainerLowest, alignItems: "center", justifyContent: "center" }}>
        <AppIcon name={icon} size={18} color={colors.primary} />
      </View>
      <Text style={{ fontFamily: fontFamilies.jakarta.bold, fontSize: 11, color: colors.onSurfaceVariant }}>{label}</Text>
      <Text style={{ fontFamily: fontFamilies.jakarta.bold, fontSize: 15, color: colors.onSurface }}>{value}</Text>
    </View>
  );
}
