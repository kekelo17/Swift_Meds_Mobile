import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { supabase } from "../../lib/supabaseClient";
import Screen from "../../components/Screen";
import TopAppBar from "../../components/TopAppBar";
import TextField from "../../components/TextField";
import { PrimaryButton } from "../../components/Buttons";
import AppIcon from "../../components/AppIcon";
import { colors, spacing, fontFamilies } from "../../theme/tokens";

export default function ResetPasswordScreen() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSend = async () => {
    if (!email.trim()) {
      setError("Enter your email address.");
      return;
    }
    setLoading(true);
    setError(null);
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.trim());
    setLoading(false);
    if (resetError) {
      setError(resetError.message);
      return;
    }
    setSent(true);
  };

  if (sent) {
    return (
      <Screen>
        <TopAppBar title="" showBack />
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", padding: spacing.xl }}>
          <View
            style={{
              width: 88,
              height: 88,
              borderRadius: 44,
              backgroundColor: colors.secondaryContainer,
              alignItems: "center",
              justifyContent: "center",
              marginBottom: spacing.lg,
            }}
          >
            <AppIcon name="check_circle" size={44} color={colors.onSecondaryContainer} />
          </View>
          <Text style={{ fontFamily: fontFamilies.jakarta.extrabold, fontSize: 20, color: colors.onSurface, marginBottom: 8 }}>
            Check your email
          </Text>
          <Text style={{ fontFamily: fontFamilies.manrope.medium, fontSize: 14, color: colors.onSurfaceVariant, textAlign: "center" }}>
            We sent a password reset link to {email}.
          </Text>
          <PrimaryButton label="Resend link" onPress={handleSend} loading={loading} style={{ marginTop: spacing.xl, width: "100%" }} />
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      <TopAppBar title="" showBack />
      <ScrollView contentContainerStyle={{ padding: spacing.containerMargin, paddingTop: spacing.lg }}>
        <Text style={{ fontFamily: fontFamilies.jakarta.extrabold, fontSize: 24, color: colors.onSurface, marginBottom: 8 }}>
          Reset your password
        </Text>
        <Text style={{ fontFamily: fontFamilies.manrope.medium, fontSize: 14, color: colors.onSurfaceVariant, marginBottom: spacing.xl }}>
          Enter the email associated with your account and we will send you a link to reset your password.
        </Text>
        <TextField label="Email" icon="mail" placeholder="jean.dupont@example.com" value={email} onChangeText={setEmail} keyboardType="email-address" />
        {error ? (
          <Text style={{ fontFamily: fontFamilies.manrope.medium, fontSize: 13, color: colors.error, marginTop: spacing.sm }}>
            {error}
          </Text>
        ) : null}
        <PrimaryButton label="Send reset link" onPress={handleSend} loading={loading} style={{ marginTop: spacing.xl }} />
      </ScrollView>
    </Screen>
  );
}
