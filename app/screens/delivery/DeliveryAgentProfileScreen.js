import React, { useState } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Screen from "../../components/Screen";
import AppIcon from "../../components/AppIcon";
import { colors, spacing, radii, fontFamilies, shadows } from "../../theme/tokens";

// 1:1 with delivery_agent_profile_1/code.html: avatar, name, "Delivery
// agent" pill, availability toggle, phone card, sign out.
export default function DeliveryAgentProfileScreen() {
  const navigation = useNavigation();
  const [available, setAvailable] = useState(true);

  return (
    <Screen>
      <ScrollView contentContainerStyle={{ padding: spacing.containerMargin, gap: spacing.lg }}>
        <View style={{ alignItems: "center", paddingTop: spacing.md }}>
          <View style={{ width: 96, height: 96, borderRadius: 48, backgroundColor: colors.surfaceContainerHigh, alignItems: "center", justifyContent: "center", marginBottom: spacing.sm, borderWidth: 4, borderColor: colors.white }}>
            <AppIcon name="person" size={42} color={colors.primary} />
          </View>
          <Text style={{ fontFamily: fontFamilies.jakarta.bold, fontSize: 18, color: colors.onSurface, marginBottom: 8 }}>Samuel Eto'o</Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: "rgba(133,249,186,0.2)", borderRadius: radii.full, paddingHorizontal: 12, paddingVertical: 5 }}>
            <AppIcon name="two_wheeler" size={15} color={colors.onSecondaryContainer} />
            <Text style={{ fontFamily: fontFamilies.manrope.bold, fontSize: 13, color: colors.onSecondaryContainer }}>Delivery agent</Text>
          </View>
        </View>

        <Pressable
          onPress={() => setAvailable((a) => !a)}
          style={[
            { backgroundColor: colors.white, borderRadius: radii.xl, padding: spacing.md, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
            shadows.card,
          ]}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm, flex: 1 }}>
            <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: colors.surfaceContainerLow, alignItems: "center", justifyContent: "center" }}>
              <AppIcon name="check_circle" size={18} color={colors.primaryContainer} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontFamily: fontFamilies.manrope.bold, fontSize: 15, color: colors.onSurface }}>Available for deliveries</Text>
              <Text style={{ fontFamily: fontFamilies.manrope.medium, fontSize: 12.5, color: colors.outline, marginTop: 2 }}>
                {available ? "Currently accepting requests" : "Not accepting new requests"}
              </Text>
            </View>
          </View>
          <View style={{ width: 44, height: 24, borderRadius: 12, backgroundColor: available ? colors.primary : colors.outlineVariant, justifyContent: "center", padding: 2 }}>
            <View style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: colors.white, alignSelf: available ? "flex-end" : "flex-start" }} />
          </View>
        </Pressable>

        <View style={[{ backgroundColor: colors.surfaceContainerLowest, borderRadius: 16, padding: spacing.md, flexDirection: "row", alignItems: "center", gap: spacing.md }, shadows.card]}>
          <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: colors.surfaceContainer, alignItems: "center", justifyContent: "center" }}>
            <AppIcon name="phone" size={18} color={colors.primaryContainer} />
          </View>
          <View>
            <Text style={{ fontFamily: fontFamilies.manrope.medium, fontSize: 13, color: colors.onSurfaceVariant }}>Phone Number</Text>
            <Text style={{ fontFamily: fontFamilies.jakarta.bold, fontSize: 16, color: colors.onSurface, marginTop: 2 }}>+237 655 987 654</Text>
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
