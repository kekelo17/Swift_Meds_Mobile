import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Screen from "../../components/Screen";
import AppIcon from "../../components/AppIcon";
import { colors, spacing, radii, fontFamilies, shadows } from "../../theme/tokens";

// 1:1 with pharmacist_profile_1/code.html: avatar, name, "PHARMACIST" role
// pill, phone card, linked-pharmacy card, sign out.
export default function PharmacistProfileScreen() {
  const navigation = useNavigation();

  return (
    <Screen>
      <ScrollView contentContainerStyle={{ padding: spacing.containerMargin, gap: spacing.lg }}>
        <View style={{ alignItems: "center", paddingTop: spacing.md }}>
          <View style={{ width: 100, height: 100, borderRadius: 50, backgroundColor: colors.surfaceContainerHigh, alignItems: "center", justifyContent: "center", marginBottom: spacing.sm }}>
            <AppIcon name="person" size={44} color={colors.primary} />
          </View>
          <Text style={{ fontFamily: fontFamilies.jakarta.bold, fontSize: 18, color: colors.onSurface, marginBottom: 8 }}>Jean-Luc Awono</Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: colors.surfaceContainer, borderRadius: radii.full, paddingHorizontal: 12, paddingVertical: 5 }}>
            <AppIcon name="medical_services" size={13} color={colors.primaryContainer} />
            <Text style={{ fontFamily: fontFamilies.jakarta.bold, fontSize: 11, color: colors.primaryContainer }}>PHARMACIST</Text>
          </View>
        </View>

        <View style={[{ backgroundColor: colors.surfaceContainerLowest, borderRadius: 16, padding: spacing.md, flexDirection: "row", alignItems: "center", gap: spacing.md }, shadows.card]}>
          <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: colors.surfaceContainer, alignItems: "center", justifyContent: "center" }}>
            <AppIcon name="call" size={18} color={colors.primaryContainer} />
          </View>
          <View>
            <Text style={{ fontFamily: fontFamilies.manrope.medium, fontSize: 13, color: colors.onSurfaceVariant }}>Phone Number</Text>
            <Text style={{ fontFamily: fontFamilies.jakarta.bold, fontSize: 16, color: colors.onSurface, marginTop: 2 }}>+237 670 123 456</Text>
          </View>
        </View>

        <View style={[{ backgroundColor: colors.surfaceContainerLowest, borderRadius: 16, padding: spacing.md, gap: spacing.sm }, shadows.card]}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <AppIcon name="storefront" size={18} color={colors.outline} />
            <Text style={{ fontFamily: fontFamilies.manrope.medium, fontSize: 14, color: colors.onSurfaceVariant }}>Linked Pharmacy</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md }}>
            <View style={{ width: 48, height: 48, borderRadius: 14, backgroundColor: colors.surfaceContainer, alignItems: "center", justifyContent: "center" }}>
              <AppIcon name="local_pharmacy" size={20} color={colors.primary} />
            </View>
            <View>
              <Text style={{ fontFamily: fontFamilies.jakarta.bold, fontSize: 15, color: colors.onSurface }}>Pharmacie du Centre</Text>
              <Text style={{ fontFamily: fontFamilies.manrope.medium, fontSize: 12.5, color: colors.onSurfaceVariant, marginTop: 2 }}>
                Avenue Kennedy, Yaoundé
              </Text>
            </View>
          </View>
        </View>

        <Pressable
          onPress={() => navigation.reset({ index: 0, routes: [{ name: "Welcome" }] })}
          style={{ marginTop: spacing.md, height: 52, borderRadius: radii.full, borderWidth: 1.5, borderColor: colors.error, alignItems: "center", justifyContent: "center", flexDirection: "row", gap: 8 }}
        >
          <AppIcon name="logout" size={18} color={colors.error} />
          <Text style={{ fontFamily: fontFamilies.jakarta.bold, fontSize: 16, color: colors.error }}>Sign out</Text>
        </Pressable>
      </ScrollView>
    </Screen>
  );
}
