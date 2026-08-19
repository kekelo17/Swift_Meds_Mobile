import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Screen from "../../components/Screen";
import AppIcon from "../../components/AppIcon";
import { colors, spacing, radii, fontFamilies, shadows } from "../../theme/tokens";

// 1:1 with profile_hub_1/code.html.
export default function ProfileHubScreen() {
  const navigation = useNavigation();

  return (
    <Screen>
      <ScrollView contentContainerStyle={{ padding: spacing.containerMargin, gap: spacing.lg }}>
        <View style={{ alignItems: "center", paddingTop: spacing.md }}>
          <View style={{ width: 100, height: 100, borderRadius: 50, backgroundColor: colors.surfaceContainerHigh, alignItems: "center", justifyContent: "center", marginBottom: spacing.md }}>
            <AppIcon name="person" size={48} color={colors.primary} />
          </View>
          <Text style={{ fontFamily: fontFamilies.jakarta.extrabold, fontSize: 20, color: colors.onSurface, marginBottom: 8 }}>Jean Dupont</Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 4, backgroundColor: "rgba(255,185,85,0.2)", borderRadius: radii.full, paddingHorizontal: 10, paddingVertical: 4 }}>
            <AppIcon name="workspace_premium" size={13} color={colors.tertiaryContainer} />
            <Text style={{ fontFamily: fontFamilies.jakarta.bold, fontSize: 11, color: colors.tertiaryContainer }}>PREMIUM</Text>
          </View>
        </View>

        <View style={[{ backgroundColor: colors.surfaceContainerLowest, borderRadius: 16, overflow: "hidden" }, shadows.card]}>
          <ProfileRow icon="phone" label="Phone Number" value="+237 6 00 00 00 00" bordered />
          <ProfileRow icon="location_on" label="Address" value="Quartier Bastos, Yaoundé" />
        </View>

        <Pressable
          style={[
            {
              backgroundColor: "rgba(255,185,85,0.08)",
              borderRadius: 16,
              borderWidth: 1,
              borderColor: "rgba(255,185,85,0.3)",
              padding: spacing.md,
              flexDirection: "row",
              alignItems: "center",
              gap: spacing.md,
            },
            shadows.card,
          ]}
        >
          <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: colors.tertiaryContainer, alignItems: "center", justifyContent: "center" }}>
            <AppIcon name="workspace_premium" size={18} color={colors.onTertiary} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontFamily: fontFamilies.jakarta.bold, fontSize: 16, color: colors.tertiaryContainer }}>Upgrade to Premium</Text>
            <Text style={{ fontFamily: fontFamilies.manrope.medium, fontSize: 13, color: colors.onSurfaceVariant, marginTop: 2 }}>
              Unlock faster delivery and discounts
            </Text>
          </View>
          <AppIcon name="chevron_right" size={20} color={colors.tertiaryContainer} />
        </Pressable>

        <Pressable
          onPress={() => navigation.reset({ index: 0, routes: [{ name: "Welcome" }] })}
          style={{
            marginTop: spacing.md,
            height: 52,
            borderRadius: radii.full,
            borderWidth: 1.5,
            borderColor: colors.error,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            gap: 8,
          }}
        >
          <AppIcon name="logout" size={18} color={colors.error} />
          <Text style={{ fontFamily: fontFamilies.jakarta.bold, fontSize: 16, color: colors.error }}>Sign out</Text>
        </Pressable>
      </ScrollView>
    </Screen>
  );
}

function ProfileRow({ icon, label, value, bordered }) {
  return (
    <View
      style={{
        padding: spacing.md,
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.md,
        borderBottomWidth: bordered ? 1 : 0,
        borderBottomColor: colors.surfaceVariant,
      }}
    >
      <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: colors.surfaceContainerLow, alignItems: "center", justifyContent: "center" }}>
        <AppIcon name={icon} size={18} color={colors.primary} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ fontFamily: fontFamilies.manrope.medium, fontSize: 13, color: colors.onSurfaceVariant }}>{label}</Text>
        <Text style={{ fontFamily: fontFamilies.jakarta.bold, fontSize: 15, color: colors.onSurface, marginTop: 2 }}>{value}</Text>
      </View>
      <AppIcon name="chevron_right" size={18} color={colors.outline} />
    </View>
  );
}
