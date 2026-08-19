import React from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Screen from "../../components/Screen";
import TopAppBar from "../../components/TopAppBar";
import AppIcon from "../../components/AppIcon";
import { colors, spacing, radii, fontFamilies, shadows } from "../../theme/tokens";

const ROLES = [
  { key: "client", icon: "search", title: "Client", desc: "Search pharmacies, reserve medication, and get it delivered.", route: "ClientSignUp" },
  { key: "pharmacy", icon: "storefront", title: "Pharmacy", desc: "List your pharmacy's stock and manage reservations.", route: "PharmacistSignUp" },
  { key: "delivery", icon: "two_wheeler", title: "Delivery agent", desc: "Deliver reservations to clients and earn per delivery.", route: "DeliveryAgentSignUp" },
];

// 1:1 with choose_your_role_1/code.html.
export default function RoleSelectScreen() {
  const navigation = useNavigation();

  return (
    <Screen>
      <TopAppBar title="Swift Meds" showBack />
      <ScrollView contentContainerStyle={{ padding: spacing.containerMargin, paddingTop: spacing.lg }}>
        <View style={{ alignItems: "center", marginBottom: spacing.xl }}>
          <Text style={{ fontFamily: fontFamilies.jakarta.extrabold, fontSize: 24, color: colors.onSurface, marginBottom: 4 }}>
            How will you use Swift Meds?
          </Text>
          <Text style={{ fontFamily: fontFamilies.manrope.medium, fontSize: 14, color: colors.onSurfaceVariant }}>
            Select a role to get started.
          </Text>
        </View>

        <View style={{ gap: spacing.md }}>
          {ROLES.map((role) => (
            <Pressable
              key={role.key}
              onPress={() => navigation.navigate(role.route)}
              style={({ pressed }) => [
                {
                  backgroundColor: colors.surfaceContainerLowest,
                  borderRadius: 20,
                  padding: spacing.md,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: spacing.md,
                  opacity: pressed ? 0.9 : 1,
                },
                shadows.card,
              ]}
            >
              <View
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 24,
                  backgroundColor: colors.surfaceContainer,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <AppIcon name={role.icon} size={22} color={colors.primaryContainer} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontFamily: fontFamilies.jakarta.bold, fontSize: 18, color: colors.onSurface }}>
                  {role.title}
                </Text>
                <Text style={{ fontFamily: fontFamilies.manrope.medium, fontSize: 14, color: colors.onSurfaceVariant, marginTop: 4 }}>
                  {role.desc}
                </Text>
              </View>
              <AppIcon name="chevron_right" size={22} color={colors.outlineVariant} />
            </Pressable>
          ))}
        </View>

        <Pressable onPress={() => navigation.navigate("SignIn")} style={{ marginTop: spacing.xl, alignItems: "center", padding: spacing.sm }}>
          <Text style={{ fontFamily: fontFamilies.jakarta.bold, fontSize: 12, color: colors.outline }}>
            Admin login
          </Text>
        </Pressable>
      </ScrollView>
    </Screen>
  );
}
