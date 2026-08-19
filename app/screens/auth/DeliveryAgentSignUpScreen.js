import React, { useState } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { supabase } from "../../lib/supabaseClient";
import { geocodeAddress } from "../../lib/geocoding";
import { uploadDocumentAsync } from "../../lib/storage";
import Screen from "../../components/Screen";
import TopAppBar from "../../components/TopAppBar";
import TextField from "../../components/TextField";
import Checkbox from "../../components/Checkbox";
import AppIcon from "../../components/AppIcon";
import { PrimaryButton } from "../../components/Buttons";
import { colors, spacing, radii, fontFamilies, shadows } from "../../theme/tokens";

const TERMS_VERSION = "v1";

const VEHICLES = [
  { key: "motorcycle", label: "Motorcycle", icon: "two_wheeler" },
  { key: "bicycle", label: "Bicycle", icon: "pedal_bike" },
  { key: "car", label: "Car", icon: "directions_car" },
];

// Real flow: signUp -> create_profile(role='delivery_agent') -> upload
// both documents to Storage (documents/delivery-agents/<file>) -> insert
// delivery_agents with status='pending'. The documents have to be picked
// AFTER signUp (need userId for the storage path) but the account is
// created either way — if a document upload fails, the person lands on
// VerificationPending with a "rejected"-free pending row and can be asked
// to re-upload later rather than losing the whole signup.
export default function DeliveryAgentSignUpScreen() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [vehicle, setVehicle] = useState("motorcycle");
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState(false);

  const [idDoc, setIdDoc] = useState(null); // { uri, name, mimeType }
  const [licenseDoc, setLicenseDoc] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const pickDocument = async (setter) => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ["image/jpeg", "image/png", "application/pdf"],
      copyToCacheDirectory: true,
    });
    if (result.canceled) return;
    const asset = result.assets?.[0];
    if (asset) setter({ uri: asset.uri, name: asset.name, mimeType: asset.mimeType });
  };

  const handleSubmit = async () => {
    if (!fullName.trim() || !email.trim() || !phone.trim() || !address.trim() || !password) {
      setError("Please fill in every field.");
      return;
    }
    if (!idDoc || !licenseDoc) {
      setError("Please upload both verification documents.");
      return;
    }
    if (!agreed) {
      setError("Please agree to the Terms & Conditions to continue.");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const location = await geocodeAddress(address.trim());

      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({ email: email.trim(), password });
      if (signUpError) throw signUpError;
      const userId = signUpData.user?.id;
      if (!userId) throw new Error("Sign up did not return a user. Please try again.");

      const { error: profileError } = await supabase.rpc("create_profile", {
        p_id: userId,
        p_role: "delivery_agent",
        p_full_name: fullName.trim(),
        p_phone: phone.trim(),
        p_address: location?.formattedAddress ?? address.trim(),
        p_lat: location?.lat ?? null,
        p_lng: location?.lng ?? null,
        p_terms_version: TERMS_VERSION,
      });
      if (profileError) throw profileError;

      const [idPath, licensePath] = await Promise.all([
        uploadDocumentAsync({
          localUri: idDoc.uri,
          folder: `delivery-agents/${userId}`,
          fileName: idDoc.name || "id_document",
          contentType: idDoc.mimeType,
        }),
        uploadDocumentAsync({
          localUri: licenseDoc.uri,
          folder: `delivery-agents/${userId}`,
          fileName: licenseDoc.name || "license_document",
          contentType: licenseDoc.mimeType,
        }),
      ]);

      const { error: agentError } = await supabase.from("delivery_agents").insert({
        user_id: userId,
        vehicle_type: vehicle,
        id_document_url: idPath,
        license_document_url: licensePath,
        status: "pending",
      });
      if (agentError) throw agentError;
    } catch (e) {
      setError(e.message || "Could not submit your application. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Screen>
      <TopAppBar title="Register as a delivery agent" showBack />
      <ScrollView contentContainerStyle={{ padding: spacing.containerMargin, paddingBottom: spacing.xl, gap: spacing.lg }}>
        <View style={{ gap: spacing.md }}>
          <TextField label="Full name" icon="person" placeholder="Jean Dupont" value={fullName} onChangeText={setFullName} />
          <TextField label="Email address" icon="mail" placeholder="jean.dupont@example.com" value={email} onChangeText={setEmail} keyboardType="email-address" />
          <TextField label="Phone number" icon="smartphone" placeholder="+237 6XX XXX XXX" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
          <TextField label="Address" icon="location_on" placeholder="Your neighborhood, Yaoundé" value={address} onChangeText={setAddress} />
        </View>

        <View style={{ gap: spacing.sm }}>
          <Text style={{ fontFamily: fontFamilies.jakarta.bold, fontSize: 16, color: colors.onSurface }}>Vehicle type</Text>
          <View style={{ flexDirection: "row", gap: spacing.sm }}>
            {VEHICLES.map((v) => {
              const active = vehicle === v.key;
              return (
                <Pressable
                  key={v.key}
                  onPress={() => setVehicle(v.key)}
                  style={{
                    flex: 1,
                    paddingVertical: 14,
                    borderRadius: radii.full,
                    alignItems: "center",
                    gap: 4,
                    backgroundColor: active ? colors.primaryContainer : colors.surfaceContainerLowest,
                    borderWidth: active ? 0 : 1,
                    borderColor: colors.surfaceVariant,
                  }}
                >
                  <AppIcon name={v.icon} size={20} color={active ? colors.onPrimary : colors.onSurfaceVariant} />
                  <Text style={{ fontFamily: fontFamilies.jakarta.bold, fontSize: 12, color: active ? colors.onPrimary : colors.onSurfaceVariant }}>
                    {v.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={{ gap: spacing.sm }}>
          <Text style={{ fontFamily: fontFamilies.jakarta.bold, fontSize: 16, color: colors.onSurface }}>Verification documents</Text>
          <View style={{ flexDirection: "row", gap: spacing.sm, alignItems: "flex-start", backgroundColor: "#FFF8E6", padding: spacing.md, borderRadius: radii.xl }}>
            <AppIcon name="info" size={18} color={colors.tertiaryContainer} />
            <Text style={{ flex: 1, fontFamily: fontFamilies.manrope.medium, fontSize: 12.5, color: colors.tertiaryContainer, lineHeight: 17 }}>
              Your documents will be reviewed by our admin team before your account is approved. This usually takes 24-48 hours.
            </Text>
          </View>

          <View style={{ flexDirection: "row", gap: spacing.sm }}>
            <DocUploadTile label="National ID card" doc={idDoc} onPress={() => pickDocument(setIdDoc)} />
            <DocUploadTile label="Driver's license / registration" doc={licenseDoc} onPress={() => pickDocument(setLicenseDoc)} />
          </View>
        </View>

        <TextField label="Create password" icon="lock" placeholder="********" value={password} onChangeText={setPassword} secureTextEntry showPasswordToggle />

        <View style={{ flexDirection: "row", gap: spacing.sm, paddingHorizontal: 4 }}>
          <Checkbox checked={agreed} onToggle={() => setAgreed((a) => !a)} />
          <Text style={{ flex: 1, fontFamily: fontFamilies.manrope.medium, fontSize: 14, color: colors.onSurfaceVariant }}>
            I agree to Swift Meds{" "}
            <Text style={{ color: colors.primaryContainer, fontFamily: fontFamilies.manrope.bold }}>Terms of Service</Text> and{" "}
            <Text style={{ color: colors.primaryContainer, fontFamily: fontFamilies.manrope.bold }}>Privacy Policy</Text>.
          </Text>
        </View>

        {error ? (
          <Text style={{ fontFamily: fontFamilies.manrope.medium, fontSize: 13, color: colors.error }}>{error}</Text>
        ) : null}

        <PrimaryButton
          label="Submit for approval"
          disabled={!agreed || !idDoc || !licenseDoc}
          loading={submitting}
          onPress={handleSubmit}
        />
      </ScrollView>
    </Screen>
  );
}

function DocUploadTile({ label, doc, onPress }) {
  const uploaded = !!doc;
  return (
    <Pressable
      onPress={onPress}
      style={[
        {
          flex: 1,
          height: 128,
          borderRadius: radii.xl,
          borderWidth: 2,
          borderStyle: "dashed",
          borderColor: uploaded ? colors.primaryContainer : colors.outlineVariant,
          backgroundColor: uploaded ? colors.surfaceContainerLow : colors.white,
          alignItems: "center",
          justifyContent: "center",
          padding: spacing.sm,
        },
      ]}
    >
      {uploaded ? (
        <View style={{ position: "absolute", top: 8, right: 8 }}>
          <AppIcon name="check_circle" size={18} color={colors.primaryContainer} />
        </View>
      ) : null}
      <AppIcon name={uploaded ? "description" : "cloud_upload"} size={28} color={uploaded ? colors.primary : colors.outline} />
      <Text style={{ fontFamily: fontFamilies.jakarta.bold, fontSize: 12, color: colors.onSurface, marginTop: 6, textAlign: "center" }}>{label}</Text>
      <Text numberOfLines={1} style={{ fontFamily: fontFamilies.manrope.medium, fontSize: 11, color: colors.outline, marginTop: 2, maxWidth: "90%" }}>
        {uploaded ? doc.name : "Tap to upload (JPG, PNG, PDF)"}
      </Text>
    </Pressable>
  );
}
