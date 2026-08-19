import React from "react";
import { View, Text, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import AppIcon from "../../components/AppIcon";
import { colors, spacing, radii, fontFamilies, shadows } from "../../theme/tokens";

// 1:1 with welcome_to_swift_meds_1/code.html: diagonal gradient hero,
// white circular logo badge, headline + tagline, bottom sheet with two
// actions ("Get started" / "I already have an account").
export default function WelcomeScreen() {
  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={[colors.gradientDark, colors.gradientMid, colors.gradientLight]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: spacing.containerMargin }}>
        <View
          style={{
            width: 128,
            height: 128,
            borderRadius: 64,
            backgroundColor: colors.white,
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 32,
            ...shadows.raised,
          }}
        >
          <AppIcon name="local_pharmacy" size={64} color={colors.primaryContainer} />
        </View>
        <Text
          style={{
            fontFamily: fontFamilies.jakarta.extrabold,
            fontSize: 32,
            color: colors.white,
            marginBottom: 12,
          }}
        >
          Swift Meds
        </Text>
        <Text
          style={{
            fontFamily: fontFamilies.manrope.medium,
            fontSize: 16,
            color: "rgba(255,255,255,0.9)",
            textAlign: "center",
            maxWidth: 280,
          }}
        >
          Find medication near you, reserve it, and pick it up or get it delivered.
        </Text>
      </View>

      <View
        style={{
          backgroundColor: colors.surfaceContainerLowest,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          paddingHorizontal: spacing.containerMargin,
          paddingTop: 32,
          paddingBottom: 32,
          gap: 16,
        }}
      >
        <View
          style={{
            position: "absolute",
            top: 12,
            left: "50%",
            marginLeft: -20,
            width: 40,
            height: 4,
            borderRadius: 2,
            backgroundColor: colors.outlineVariant,
            opacity: 0.5,
          }}
        />
        <Pressable
          onPress={() => navigation.navigate("RoleSelect")}
          style={({ pressed }) => ({
            height: 52,
            borderRadius: radii.full,
            backgroundColor: colors.primaryContainer,
            alignItems: "center",
            justifyContent: "center",
            transform: [{ scale: pressed ? 0.98 : 1 }],
          })}
        >
          <Text style={{ color: colors.onPrimary, fontFamily: fontFamilies.jakarta.bold, fontSize: 18 }}>
            GET STARTED
          </Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate("SignIn")}
          style={({ pressed }) => ({
            height: 52,
            borderRadius: radii.full,
            alignItems: "center",
            justifyContent: "center",
            opacity: pressed ? 0.7 : 1,
          })}
        >
          <Text style={{ color: colors.primaryContainer, fontFamily: fontFamilies.jakarta.bold, fontSize: 18 }}>
            I ALREADY HAVE AN ACCOUNT
          </Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
}
