import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { supabase } from "../../lib/supabaseClient";
import { geocodeAddress } from "../../lib/geocoding";
import Screen from "../../components/Screen";
import TopAppBar from "../../components/TopAppBar";
import TextField, { ResolvedAddressRow } from "../../components/TextField";
import Checkbox from "../../components/Checkbox";
import { PrimaryButton } from "../../components/Buttons";
import { colors, spacing, radii, fontFamilies, shadows } from "../../theme/tokens";

const TERMS_VERSION = "v1";

// Real flow: supabase.auth.signUp -> geocode the typed address -> the
// create_profile RPC (security definer, so it can insert into `profiles`
// with the caller's own new auth.uid()). Nothing to navigate to on
// success: signUp() creates a session, SessionContext resolves the
// profile, and RootNavigator's gate moves to ClientRootNavigator on its own.
export default function ClientSignUpScreen() {
  const navigation = useNavigation();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState(false);

  const [resolvedAddress, setResolvedAddress] = useState(null);
  const [geocoding, setGeocoding] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const resolveAddress = async () => {
    if (!address.trim() || resolvedAddress) return;
    setGeocoding(true);
    const result = await geocodeAddress(address.trim());
    setResolvedAddress(result);
    setGeocoding(false);
  };

  const handleSubmit = async () => {
    if (!fullName.trim() || !email.trim() || !phone.trim() || !address.trim() || !password) {
      setError("Please fill in every field.");
      return;
    }
    if (!agreed) {
      setError("Please agree to the Terms & Conditions to continue.");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      let location = resolvedAddress;
      if (!location) location = await geocodeAddress(address.trim());

      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: email.trim(),
        password,
      });
      if (signUpError) throw signUpError;

      const userId = signUpData.user?.id;
      if (!userId) throw new Error("Sign up did not return a user. Please try again.");

      const { error: profileError } = await supabase.rpc("create_profile", {
        p_id: userId,
        p_role: "client",
        p_full_name: fullName.trim(),
        p_phone: phone.trim(),
        p_address: location?.formattedAddress ?? address.trim(),
        p_lat: location?.lat ?? null,
        p_lng: location?.lng ?? null,
        p_terms_version: TERMS_VERSION,
      });
      if (profileError) throw profileError;

      // SessionContext's onAuthStateChange already fired from signUp;
      // force one more profile fetch in case it beat this insert.
    } catch (e) {
      setError(e.message || "Could not create your account. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Screen>
      <TopAppBar title="Create your account" showBack />
      <ScrollView contentContainerStyle={{ padding: spacing.containerMargin, paddingBottom: 140 }}>
        <View style={[{ backgroundColor: colors.surfaceContainerLowest, borderRadius: radii.xl, padding: spacing.md, gap: spacing.md }, shadows.card]}>
          <TextField label="Full name" icon="person" placeholder="Jean Dupont" value={fullName} onChangeText={setFullName} />
          <TextField label="Email address" icon="mail" placeholder="jean.dupont@example.com" value={email} onChangeText={setEmail} keyboardType="email-address" />
          <TextField
            label="Phone number"
            icon="smartphone"
            placeholder="+237 6XX XXX XXX"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            helperText="Used for Mobile Money payments and delivery contact"
          />
          <View style={{ gap: spacing.sm }}>
            <TextField
              label="Delivery address"
              icon="location_on"
              placeholder="Rue 123, Bastos, Yaoundé"
              value={address}
              onChangeText={(v) => {
                setAddress(v);
                setResolvedAddress(null);
              }}
              onBlur={resolveAddress}
              rightIcon={geocoding ? undefined : "my_location"}
            />
            {resolvedAddress ? (
              <ResolvedAddressRow address={resolvedAddress.formattedAddress} helper="We use this to find pharmacies near you" />
            ) : null}
          </View>
          <TextField label="Password" icon="lock" placeholder="********" value={password} onChangeText={setPassword} secureTextEntry showPasswordToggle />
        </View>

        <View style={{ flexDirection: "row", gap: spacing.sm, marginTop: spacing.lg, paddingHorizontal: 4 }}>
          <Checkbox checked={agreed} onToggle={() => setAgreed((a) => !a)} />
          <Text style={{ flex: 1, fontFamily: fontFamilies.manrope.medium, fontSize: 14, color: colors.onSurfaceVariant }}>
            I agree to Swift Meds{" "}
            <Text style={{ color: colors.primaryContainer, fontFamily: fontFamilies.manrope.bold }}>Terms of Service</Text> and{" "}
            <Text style={{ color: colors.primaryContainer, fontFamily: fontFamilies.manrope.bold }}>Privacy Policy</Text>.
          </Text>
        </View>

        {error ? (
          <Text style={{ fontFamily: fontFamilies.manrope.medium, fontSize: 13, color: colors.error, marginTop: spacing.sm, paddingHorizontal: 4 }}>
            {error}
          </Text>
        ) : null}
      </ScrollView>

      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: colors.white,
          paddingHorizontal: spacing.containerMargin,
          paddingTop: spacing.md,
          paddingBottom: spacing.xl,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
      >
        <PrimaryButton label="Create account" disabled={!agreed} loading={submitting} onPress={handleSubmit} />
        <Text style={{ textAlign: "center", marginTop: 12, fontFamily: fontFamilies.manrope.medium, fontSize: 13, color: colors.onSurfaceVariant }}>
          Already have an account?{" "}
          <Text onPress={() => navigation.navigate("SignIn")} style={{ color: colors.primaryContainer, fontFamily: fontFamilies.manrope.bold }}>
            Log in
          </Text>
        </Text>
      </View>
    </Screen>
  );
}
