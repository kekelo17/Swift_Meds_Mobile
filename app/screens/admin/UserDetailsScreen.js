import React from "react";
import { View, Text, ScrollView, Pressable, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Screen from "../../components/Screen";
import TopAppBar from "../../components/TopAppBar";
import AppIcon from "../../components/AppIcon";
import { colors, spacing, radii, fontFamilies, shadows } from "../../theme/tokens";

// 1:1 with user_details/code.html — a task-focused screen that
// deliberately suppresses the admin shell header/tab bar in favor of a
// plain back-chevron TopAppBar (per the source HTML's own comment: "Nav
// Shell suppressed due to specific instruction and task-focused nature of
// a detail view"). Role pill color follows the same per-role color coding
// used elsewhere: client=blue/info, pharmacist=green/secondary, delivery
// agent=amber/tertiary, admin=dark green/primary.
export default function UserDetailsScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const user = route.params?.user || { name: "Dr. Amara Oumarou", value: "Pharmacist" };

  return (
    <Screen>
      <TopAppBar title="User details" showBack />
      <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.containerMargin, paddingBottom: spacing.xl }}>
        <View style={{ alignItems: "center", marginTop: spacing.lg, marginBottom: spacing.xl }}>
          <View style={{ width: 96, height: 96, borderRadius: 48, backgroundColor: colors.surfaceContainerHigh, alignItems: "center", justifyContent: "center", marginBottom: spacing.md }}>
            <AppIcon name="person" size={44} color={colors.primary} />
          </View>
          <Text style={{ fontFamily: fontFamilies.jakarta.extrabold, fontSize: 22, color: colors.onSurface, marginBottom: 8 }}>{user.name}</Text>
          <View style={{ backgroundColor: colors.secondaryContainer, borderRadius: radii.full, paddingHorizontal: 16, paddingVertical: 5 }}>
            <Text style={{ fontFamily: fontFamilies.jakarta.bold, fontSize: 11, color: colors.onSecondaryContainer, textTransform: "uppercase" }}>
              {user.value}
            </Text>
          </View>
        </View>

        <View style={[{ backgroundColor: colors.surfaceContainerLowest, borderRadius: 24, padding: spacing.md, marginBottom: spacing.lg }, shadows.card]}>
          <Text style={{ fontFamily: fontFamilies.jakarta.bold, fontSize: 14, color: colors.onSurfaceVariant, marginBottom: spacing.md, flexDirection: "row" }}>
            Contact Details
          </Text>
          <ContactRow icon="call" label="Phone" value="+237 671 234 567" />
          <View style={{ height: 1, backgroundColor: colors.surfaceVariant, marginVertical: spacing.sm }} />
          <ContactRow icon="mail" label="Email" value="amara.oumarou@pharmacie-centrale.cm" />
        </View>

        <View style={[{ backgroundColor: colors.white, borderRadius: 24, padding: spacing.md, marginBottom: spacing.xl }, shadows.card]}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginBottom: spacing.md }}>
            <AppIcon name="storefront" size={16} color={colors.outline} />
            <Text style={{ fontFamily: fontFamilies.jakarta.bold, fontSize: 14, color: colors.onSurfaceVariant }}>Linked Pharmacy</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              padding: spacing.sm,
              borderRadius: radii.xl,
              backgroundColor: colors.surfaceContainerLow,
              borderWidth: 1,
              borderColor: colors.surfaceVariant,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm }}>
              <View style={{ width: 48, height: 48, borderRadius: 12, backgroundColor: "rgba(14,124,74,0.08)", alignItems: "center", justifyContent: "center" }}>
                <AppIcon name="local_pharmacy" size={20} color={colors.primary} />
              </View>
              <View>
                <Text style={{ fontFamily: fontFamilies.manrope.bold, fontSize: 15, color: colors.onSurface }}>Pharmacie Centrale de Yaoundé</Text>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 4, marginTop: 2 }}>
                  <AppIcon name="location_on" size={13} color={colors.onSurfaceVariant} />
                  <Text style={{ fontFamily: fontFamilies.manrope.medium, fontSize: 12.5, color: colors.onSurfaceVariant }}>Yaoundé Center</Text>
                </View>
              </View>
            </View>
            <Pressable style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: colors.surface, alignItems: "center", justifyContent: "center" }}>
              <AppIcon name="open_in_new" size={16} color={colors.onSurfaceVariant} />
            </Pressable>
          </View>
        </View>

        <Pressable
          onPress={() =>
            Alert.alert("Suspend account", `Suspend ${user.name}'s account?`, [
              { text: "Cancel", style: "cancel" },
              { text: "Suspend", style: "destructive", onPress: () => navigation.goBack() },
            ])
          }
          style={{ height: 52, borderRadius: radii.full, borderWidth: 2, borderColor: colors.error, backgroundColor: colors.white, alignItems: "center", justifyContent: "center", flexDirection: "row", gap: 8 }}
        >
          <AppIcon name="block" size={18} color={colors.error} />
          <Text style={{ fontFamily: fontFamilies.jakarta.bold, fontSize: 16, color: colors.error }}>Suspend Account</Text>
        </Pressable>
      </ScrollView>
    </Screen>
  );
}

function ContactRow({ icon, label, value }) {
  return (
    <View style={{ flexDirection: "row", alignItems: "flex-start", gap: spacing.md }}>
      <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: colors.surfaceContainer, alignItems: "center", justifyContent: "center" }}>
        <AppIcon name={icon} size={18} color={colors.primary} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ fontFamily: fontFamilies.jakarta.bold, fontSize: 11, color: colors.outline, textTransform: "uppercase", letterSpacing: 0.4, marginBottom: 2 }}>
          {label}
        </Text>
        <Text style={{ fontFamily: fontFamilies.manrope.medium, fontSize: 15, color: colors.onSurface }}>{value}</Text>
      </View>
    </View>
  );
}
