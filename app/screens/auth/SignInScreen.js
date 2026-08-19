import React, { useState } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { supabase } from "../../lib/supabaseClient";
import Screen from "../../components/Screen";
import TopAppBar from "../../components/TopAppBar";
import TextField from "../../components/TextField";
import { PrimaryButton } from "../../components/Buttons";
import { colors, spacing, fontFamilies } from "../../theme/tokens";

// On success there is nothing else to do here: SessionContext's
// onAuthStateChange listener picks up the new session, resolves the
// profile + role, and RootNavigator's gate swaps to the right role shell
// automatically.
export default function SignInScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSignIn = async () => {
    if (!email.trim() || !password) {
      setError("Enter your email and password.");
      return;
    }
    setLoading(true);
    setError(null);
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    setLoading(false);
    if (signInError) {
      setError(
        signInError.message.includes("Invalid login credentials")
          ? "Incorrect email or password."
          : signInError.message
      );
    }
  };

  return (
    <Screen>
      <TopAppBar title="" showBack transparent />
      <ScrollView contentContainerStyle={{ padding: spacing.containerMargin, paddingTop: spacing.lg }}>
        <Text style={{ fontFamily: fontFamilies.jakarta.extrabold, fontSize: 28, color: colors.onSurface, marginBottom: 6 }}>
          Welcome back
        </Text>
        <Text style={{ fontFamily: fontFamilies.manrope.medium, fontSize: 14, color: colors.onSurfaceVariant, marginBottom: spacing.xl }}>
          Sign in to continue
        </Text>

        <View style={{ gap: spacing.md }}>
          <TextField
            label="Email"
            icon="mail"
            placeholder="jean.dupont@example.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <View>
            <TextField
              label="Password"
              icon="lock"
              placeholder="********"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              showPasswordToggle
            />
            <Pressable onPress={() => navigation.navigate("ResetPassword")} style={{ alignSelf: "flex-end", marginTop: 8 }}>
              <Text style={{ fontFamily: fontFamilies.manrope.bold, fontSize: 13, color: colors.primaryContainer }}>
                Forgot password?
              </Text>
            </Pressable>
          </View>
        </View>

        {error ? (
          <Text style={{ fontFamily: fontFamilies.manrope.medium, fontSize: 13, color: colors.error, marginTop: spacing.sm }}>
            {error}
          </Text>
        ) : null}

        <PrimaryButton label="Sign in" onPress={handleSignIn} loading={loading} style={{ marginTop: spacing.xl }} />

        <View style={{ alignItems: "center", marginTop: spacing.lg }}>
          <Text style={{ fontFamily: fontFamilies.manrope.medium, fontSize: 14, color: colors.onSurfaceVariant }}>
            New here?{" "}
            <Text onPress={() => navigation.navigate("RoleSelect")} style={{ fontFamily: fontFamilies.manrope.bold, color: colors.primaryContainer }}>
              Create an account
            </Text>
          </Text>
        </View>
      </ScrollView>
    </Screen>
  );
}
