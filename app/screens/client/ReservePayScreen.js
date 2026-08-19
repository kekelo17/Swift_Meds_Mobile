import React, { useState } from "react";
import { View, Text, ScrollView, Pressable, TextInput } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Screen from "../../components/Screen";
import TopAppBar from "../../components/TopAppBar";
import AppIcon from "../../components/AppIcon";
import { OutlineButton, PrimaryButton } from "../../components/Buttons";
import { colors, spacing, radii, fontFamilies, shadows } from "../../theme/tokens";

// 1:1 with reserve_pay_1/code.html: info banner, summary card, prescription
// upload, delivery toggle, MTN MoMo / Orange Money picker, phone input,
// sticky "Confirm & pay" CTA.
export default function ReservePayScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const pharmacy = route.params?.pharmacy || { name: "Pharmacie du Centre" };

  const [wantsDelivery, setWantsDelivery] = useState(false);
  const [operatorChoice, setOperatorChoice] = useState("momo"); // "momo" | "om"
  const [phone, setPhone] = useState("670 123 456");

  return (
    <Screen>
      <TopAppBar title="Reserve & pay" showBack />
      <ScrollView contentContainerStyle={{ padding: spacing.containerMargin, paddingBottom: 140, gap: spacing.lg }}>
        <View style={{ flexDirection: "row", gap: 10, backgroundColor: colors.surfaceContainerHigh, borderRadius: radii.lg, padding: spacing.sm }}>
          <AppIcon name="info" size={18} color={colors.primaryContainer} />
          <Text style={{ flex: 1, fontFamily: fontFamilies.manrope.medium, fontSize: 13, color: colors.onSurfaceVariant, lineHeight: 18 }}>
            Swift Meds is a reservation platform. You will pay the pharmacy directly upon pickup or delivery unless
            specified otherwise.
          </Text>
        </View>

        <View style={[{ backgroundColor: colors.surfaceContainerLowest, borderRadius: 16, padding: spacing.md, gap: spacing.sm }, shadows.card]}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
            <View>
              <Text style={{ fontFamily: fontFamilies.jakarta.bold, fontSize: 16, color: colors.onSurface }}>{pharmacy.name}</Text>
              <Text style={{ fontFamily: fontFamilies.manrope.medium, fontSize: 13, color: colors.onSurfaceVariant, marginTop: 4 }}>
                Avenue Kennedy, Yaoundé
              </Text>
            </View>
            <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: colors.surfaceContainer, alignItems: "center", justifyContent: "center" }}>
              <AppIcon name="local_pharmacy" size={18} color={colors.primaryContainer} />
            </View>
          </View>
          <View style={{ height: 1, backgroundColor: colors.surfaceVariant, marginVertical: 4 }} />
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <Text style={{ fontFamily: fontFamilies.manrope.medium, fontSize: 16, color: colors.onSurfaceVariant }}>Total</Text>
            <Text style={{ fontFamily: fontFamilies.jakarta.extrabold, fontSize: 20, color: colors.primaryContainer }}>1,200 XAF</Text>
          </View>
        </View>

        <OutlineButton label="Upload prescription (if required)" icon={<AppIcon name="upload_file" size={18} color={colors.primaryContainer} />} onPress={() => {}} />

        <View style={[{ backgroundColor: colors.surfaceContainerLowest, borderRadius: 16, padding: spacing.md, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }, shadows.card]}>
          <View style={{ flex: 1, marginRight: 12 }}>
            <Text style={{ fontFamily: fontFamilies.jakarta.bold, fontSize: 16, color: colors.onSurface }}>Request delivery</Text>
            <Text style={{ fontFamily: fontFamilies.manrope.medium, fontSize: 13, color: colors.onSurfaceVariant, marginTop: 2 }}>
              Additional fees may apply — estimated time is based on distance.
            </Text>
          </View>
          <Pressable
            onPress={() => setWantsDelivery((v) => !v)}
            style={{
              width: 48,
              height: 28,
              borderRadius: 14,
              backgroundColor: wantsDelivery ? colors.primaryContainer : colors.outlineVariant,
              justifyContent: "center",
              padding: 3,
            }}
          >
            <View
              style={{
                width: 22,
                height: 22,
                borderRadius: 11,
                backgroundColor: colors.white,
                alignSelf: wantsDelivery ? "flex-end" : "flex-start",
              }}
            />
          </Pressable>
        </View>

        <View style={{ gap: spacing.sm }}>
          <Text style={{ fontFamily: fontFamilies.jakarta.bold, fontSize: 16, color: colors.onSurface }}>Pay with</Text>
          <View style={{ flexDirection: "row", gap: spacing.sm }}>
            <PaymentOption
              label="MTN MoMo"
              badgeText="MTN"
              badgeColor="#FFCC00"
              badgeTextColor="#101E18"
              selected={operatorChoice === "momo"}
              onPress={() => setOperatorChoice("momo")}
            />
            <PaymentOption
              label="Orange Money"
              badgeText="OM"
              badgeColor="#FF6600"
              badgeTextColor="#FFFFFF"
              selected={operatorChoice === "om"}
              onPress={() => setOperatorChoice("om")}
            />
          </View>
        </View>

        <View>
          <Text style={{ fontFamily: fontFamilies.manrope.medium, fontSize: 14, color: colors.onSurfaceVariant, marginBottom: 6 }}>
            Mobile money number
          </Text>
          <View
            style={{
              height: 56,
              borderRadius: 16,
              borderWidth: 1,
              borderColor: colors.divider || colors.surfaceVariant,
              backgroundColor: colors.surfaceContainerLowest,
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 14,
            }}
          >
            <Text style={{ fontFamily: fontFamilies.manrope.medium, fontSize: 16, color: colors.onSurfaceVariant, marginRight: 8 }}>+237</Text>
            <TextInput
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              placeholder="6XX XXX XXX"
              style={{ flex: 1, fontFamily: fontFamilies.manrope.medium, fontSize: 16, color: colors.onSurface }}
            />
          </View>
        </View>
      </ScrollView>

      <View style={{ position: "absolute", bottom: 0, left: 0, right: 0, backgroundColor: colors.white, padding: spacing.containerMargin, paddingBottom: spacing.xl }}>
        <PrimaryButton
          label="Confirm & pay"
          icon={<AppIcon name="arrow_forward" size={18} color={colors.white} />}
          onPress={() => navigation.navigate("ClientTabs", { screen: "Reservations" })}
        />
      </View>
    </Screen>
  );
}

function PaymentOption({ label, badgeText, badgeColor, badgeTextColor, selected, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        {
          flex: 1,
          borderRadius: 16,
          borderWidth: 2,
          borderColor: selected ? colors.primaryContainer : "transparent",
          backgroundColor: colors.surfaceContainerLowest,
          padding: spacing.sm,
          alignItems: "center",
          gap: 8,
        },
        !selected && shadows.card,
      ]}
    >
      {selected ? (
        <View style={{ position: "absolute", top: 8, right: 8, width: 20, height: 20, borderRadius: 10, backgroundColor: colors.primaryContainer, alignItems: "center", justifyContent: "center" }}>
          <AppIcon name="check" size={12} color={colors.white} />
        </View>
      ) : null}
      <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: badgeColor, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ fontFamily: fontFamilies.jakarta.extrabold, fontSize: 12, color: badgeTextColor }}>{badgeText}</Text>
      </View>
      <Text style={{ fontFamily: fontFamilies.manrope.bold, fontSize: 13, color: selected ? colors.onSurface : colors.onSurfaceVariant }}>{label}</Text>
    </Pressable>
  );
}
