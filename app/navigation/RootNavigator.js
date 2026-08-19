import React from "react";
import { View, ActivityIndicator } from "react-native";
import { useSession } from "../lib/SessionContext";
import { colors } from "../theme/tokens";

import AuthNavigator from "./AuthNavigator";
import ClientRootNavigator from "./ClientRootNavigator";
import PharmacistRootNavigator from "./PharmacistRootNavigator";
import DeliveryRootNavigator from "./DeliveryRootNavigator";
import AdminRootNavigator from "./AdminRootNavigator";
import VerificationPendingScreen from "../screens/auth/VerificationPendingScreen";

// The role-based redirect from the architecture doc, implemented as a
// render branch instead of a router redirect (React Navigation doesn't
// have go_router's `redirect` concept): signed out -> AuthNavigator;
// signed in -> the matching role's *RootNavigator, UNLESS that role is
// still pending approval, in which case they see the same
// VerificationPending screen the signup flow shows, until an admin
// approves them (pharmacists.status / delivery_agents.status).
export default function RootNavigator() {
  const { loading, isLoggedIn, role, roleStatus } = useSession();

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: colors.screenBg }}>
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    );
  }

  if (!isLoggedIn) return <AuthNavigator />;

  if (role === "pharmacist") {
    // Owners are approved immediately on the pharmacists row (their real
    // gate is pharmacies.status instead, checked inside the pharmacist
    // screens); staff who joined an existing pharmacy stay pending until
    // an admin approves them here.
    if (roleStatus && !roleStatus.isOwner && roleStatus.status !== "approved") {
      return <VerificationPendingScreen embedded />;
    }
    return <PharmacistRootNavigator />;
  }

  if (role === "delivery_agent") {
    if (roleStatus && roleStatus.status !== "approved") {
      return <VerificationPendingScreen embedded />;
    }
    return <DeliveryRootNavigator />;
  }

  if (role === "admin") return <AdminRootNavigator />;

  // Default / "client" / role still resolving on a signed-in session.
  return <ClientRootNavigator />;
}
