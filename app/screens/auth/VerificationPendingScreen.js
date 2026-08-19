import React, { useState } from "react";
import { View, Text } from "react-native";
import { useSession } from "../../lib/SessionContext";
import Screen from "../../components/Screen";
import AppIcon from "../../components/AppIcon";
import { OutlineButton, PrimaryButton } from "../../components/Buttons";
import { colors, spacing, radii, fontFamilies, shadows } from "../../theme/tokens";

// Rendered two ways: (1) directly by RootNavigator's gate, for a signed-in
// pharmacist/delivery-agent whose approval status is still "pending" or
// was "rejected" — this is the common real-world path, since supabase.auth
// signUp() signs the user in immediately; (2) as a plain AuthNavigator
// screen for any other reachable case. Either way it reads live status
// off useSession() rather than a navigation param, and offers "Refresh
// "Refresh status" (re-fetch) and "Sign out" rather than a "back to sign in" link,
// since by the time this screen matters the person is already signed in.
export default function VerificationPendingScreen() {
  const { role, roleStatus, refreshProfile, signOut } = useSession();
  const [refreshing, setRefreshing] = useState(false);

  const rejected = roleStatus?.status === "rejected";
  const roleLabel = role === "delivery_agent" ? "delivery agent" : "pharmacist";

  const handleRefresh = async () => {
    setRefreshing(true);
    await refreshProfile();
    setRefreshing(false);
  };

  return (
    <Screen>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", padding: spacing.containerMargin }}>
        <View
          style={[
            { width: "100%", maxWidth: 360, backgroundColor: colors.surfaceContainerLowest, borderRadius: 24, padding: spacing.lg, alignItems: "center" },
            shadows.raised,
          ]}
        >
          <View
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: rejected ? "#FDECEA" : "#FFF4E5",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: spacing.xl,
            }}
          >
            <AppIcon name={rejected ? "cancel" : "hourglass_top"} size={40} color={rejected ? colors.error : "#FF9800"} />
          </View>

          <View
            style={{
              backgroundColor: rejected ? colors.errorContainer : colors.tertiaryFixed,
              borderRadius: radii.full,
              paddingHorizontal: 12,
              paddingVertical: 4,
              marginBottom: spacing.sm,
            }}
          >
            <Text
              style={{
                fontFamily: fontFamilies.jakarta.bold,
                fontSize: 11,
                color: rejected ? colors.onErrorContainer : colors.onTertiaryFixedVariant,
                textTransform: "uppercase",
              }}
            >
              {rejected ? "Not approved" : "Pending"}
            </Text>
          </View>

          <Text style={{ fontFamily: fontFamilies.jakarta.extrabold, fontSize: 20, color: colors.onSurface, textAlign: "center", marginBottom: spacing.sm }}>
            {rejected ? "Your application was not approved" : "Your application is under review"}
          </Text>
          <Text style={{ fontFamily: fontFamilies.manrope.medium, fontSize: 14, color: colors.onSurfaceVariant, textAlign: "center", marginBottom: spacing.xl }}>
            {rejected
              ? `Our team could not approve your ${roleLabel} account. Contact support if you believe this is a mistake.`
              : `Our team is verifying your ${roleLabel} details. You'll get access to your dashboard as soon as an admin approves your account.`}
          </Text>

          <PrimaryButton
            label={refreshing ? "Checking..." : "Refresh status"}
            loading={refreshing}
            onPress={handleRefresh}
            style={{ width: "100%", marginBottom: spacing.sm }}
          />
          <OutlineButton label="Sign out" onPress={signOut} style={{ width: "100%" }} />
        </View>
      </View>
    </Screen>
  );
}
