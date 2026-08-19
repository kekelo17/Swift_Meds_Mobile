import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { supabase } from "../../lib/supabaseClient";
import { geocodeAddress } from "../../lib/geocoding";
import Screen from "../../components/Screen";
import TopAppBar from "../../components/TopAppBar";
import TextField, { ResolvedAddressRow } from "../../components/TextField";
import SegmentedControl from "../../components/SegmentedControl";
import Checkbox from "../../components/Checkbox";
import AppIcon from "../../components/AppIcon";
import { PrimaryButton } from "../../components/Buttons";
import { colors, spacing, radii, fontFamilies, shadows } from "../../theme/tokens";

const TERMS_VERSION = "v1";

// Real flow, split by mode:
//   "new"  -> signUp -> create_profile(role='pharmacist') -> insert into
//             pharmacies (status='pending', owner_id=self) -> insert into
//             pharmacists (is_owner=true, status='approved' — the owner's
//             OWN account isn't separately gated, the pharmacy itself is
//             what's pending; see the schema patch note on this).
//   "join" -> signUp -> create_profile(role='pharmacist') -> insert into
//             pharmacists (is_owner=false, status='pending') against the
//             pharmacy the user picked from a live search.
// Either way, nothing to navigate to afterward — RootNavigator's gate
// reads pharmacists.status itself and routes accordingly.
export default function PharmacistSignUpScreen() {
  const [mode, setMode] = useState("new"); // "new" | "join"

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [onpcLicense, setOnpcLicense] = useState("");
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // "new" mode fields
  const [pharmacyName, setPharmacyName] = useState("");
  const [pharmacyAddress, setPharmacyAddress] = useState("");
  const [resolvedPharmacyAddress, setResolvedPharmacyAddress] = useState(null);
  const [dpmlLicense, setDpmlLicense] = useState("");
  const [pharmacyPhone, setPharmacyPhone] = useState("");

  // "join" mode fields
  const [pharmacySearch, setPharmacySearch] = useState("");
  const [pharmacyResults, setPharmacyResults] = useState([]);
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    if (mode !== "join" || !pharmacySearch.trim()) {
      setPharmacyResults([]);
      return;
    }
    let cancelled = false;
    setSearching(true);
    const timeout = setTimeout(async () => {
      const { data } = await supabase
        .from("pharmacies_public")
        .select("id, name, address_text")
        .eq("status", "approved")
        .ilike("name", `%${pharmacySearch.trim()}%`)
        .limit(10);
      if (!cancelled) {
        setPharmacyResults(data || []);
        setSearching(false);
      }
    }, 350);
    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, [pharmacySearch, mode]);

  const handleSubmit = async () => {
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !phone.trim() || !onpcLicense.trim() || !password) {
      setError("Please fill in every field.");
      return;
    }
    if (mode === "new" && (!pharmacyName.trim() || !pharmacyAddress.trim() || !dpmlLicense.trim() || !pharmacyPhone.trim())) {
      setError("Please fill in the pharmacy details.");
      return;
    }
    if (mode === "join" && !selectedPharmacy) {
      setError("Please select your pharmacy.");
      return;
    }
    if (!agreed) {
      setError("Please agree to the Terms & Conditions to continue.");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const fullName = `${firstName.trim()} ${lastName.trim()}`;

      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({ email: email.trim(), password });
      if (signUpError) throw signUpError;
      const userId = signUpData.user?.id;
      if (!userId) throw new Error("Sign up did not return a user. Please try again.");

      const { error: profileError } = await supabase.rpc("create_profile", {
        p_id: userId,
        p_role: "pharmacist",
        p_full_name: fullName,
        p_phone: phone.trim(),
        p_address: pharmacyAddress.trim() || null,
        p_lat: resolvedPharmacyAddress?.lat ?? null,
        p_lng: resolvedPharmacyAddress?.lng ?? null,
        p_terms_version: TERMS_VERSION,
      });
      if (profileError) throw profileError;

      if (mode === "new") {
        let location = resolvedPharmacyAddress;
        if (!location) location = await geocodeAddress(pharmacyAddress.trim());

        const { data: pharmacyRow, error: pharmacyError } = await supabase
          .from("pharmacies")
          .insert({
            owner_id: userId,
            name: pharmacyName.trim(),
            amm_number: dpmlLicense.trim(),
            license_number: dpmlLicense.trim(),
            status: "pending",
            address_text: location?.formattedAddress ?? pharmacyAddress.trim(),
            location: location ? `SRID=4326;POINT(${location.lng} ${location.lat})` : null,
            phone: pharmacyPhone.trim(),
          })
          .select()
          .single();
        if (pharmacyError) throw pharmacyError;

        const { error: pharmacistError } = await supabase.from("pharmacists").insert({
          user_id: userId,
          pharmacy_id: pharmacyRow.id,
          is_owner: true,
          status: "approved",
        });
        if (pharmacistError) throw pharmacistError;
      } else {
        const { error: pharmacistError } = await supabase.from("pharmacists").insert({
          user_id: userId,
          pharmacy_id: selectedPharmacy.id,
          is_owner: false,
          status: "pending",
        });
        if (pharmacistError) throw pharmacistError;
      }
    } catch (e) {
      setError(e.message || "Could not submit your application. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Screen>
      <TopAppBar title="Register" showBack />
      <ScrollView contentContainerStyle={{ padding: spacing.containerMargin, paddingBottom: spacing.xl }}>
        <Text style={{ fontFamily: fontFamilies.jakarta.extrabold, fontSize: 22, color: colors.primary, marginBottom: 4 }}>
          Pharmacist Sign Up
        </Text>
        <Text style={{ fontFamily: fontFamilies.manrope.medium, fontSize: 14, color: colors.onSurfaceVariant, marginBottom: spacing.md }}>
          Create your account to start managing pharmacy operations.
        </Text>

        <SegmentedControl
          options={[
            { label: "New pharmacy", value: "new" },
            { label: "Join existing", value: "join" },
          ]}
          value={mode}
          onChange={setMode}
        />

        <View
          style={{
            backgroundColor: "rgba(255,221,180,0.3)",
            borderWidth: 1,
            borderColor: "rgba(255,185,85,0.4)",
            borderRadius: radii.xl,
            padding: spacing.md,
            flexDirection: "row",
            gap: spacing.sm,
            marginTop: spacing.md,
          }}
        >
          <AppIcon name="info" size={20} color={colors.tertiaryContainer} />
          <View style={{ flex: 1 }}>
            <Text style={{ fontFamily: fontFamilies.jakarta.bold, fontSize: 11, color: colors.tertiaryContainer, marginBottom: 2 }}>
              APPROVAL REQUIRED
            </Text>
            <Text style={{ fontFamily: fontFamilies.manrope.medium, fontSize: 12.5, color: colors.onTertiaryContainer, lineHeight: 17 }}>
              {mode === "join"
                ? "Your account will need to be approved by the pharmacy administrator before you can access the dashboard."
                : "Your pharmacy will be reviewed by our admin team for DPML license verification before it goes live."}
            </Text>
          </View>
        </View>

        <View style={[{ backgroundColor: colors.surfaceContainerLowest, borderRadius: 20, padding: spacing.md, gap: spacing.md, marginTop: spacing.md }, shadows.card]}>
          <Text style={{ fontFamily: fontFamilies.jakarta.bold, fontSize: 16, color: colors.onSurface, borderBottomWidth: 1, borderBottomColor: colors.surfaceVariant, paddingBottom: 8 }}>
            Your details
          </Text>
          <View style={{ flexDirection: "row", gap: spacing.sm }}>
            <View style={{ flex: 1 }}>
              <TextField label="First name" placeholder="e.g. Jean" value={firstName} onChangeText={setFirstName} />
            </View>
            <View style={{ flex: 1 }}>
              <TextField label="Last name" placeholder="e.g. Dupont" value={lastName} onChangeText={setLastName} />
            </View>
          </View>
          <TextField label="Email address" icon="mail" placeholder="jean.dupont@example.com" value={email} onChangeText={setEmail} keyboardType="email-address" />
          <TextField label="Phone number" icon="phone" placeholder="+237 6XX XXX XXX" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
          <TextField label="ONPC professional license number" icon="badge" placeholder="ONPC-XXXXXX" value={onpcLicense} onChangeText={setOnpcLicense} />
          <TextField label="Password" icon="lock" placeholder="********" value={password} onChangeText={setPassword} secureTextEntry showPasswordToggle />
        </View>

        {mode === "new" ? (
          <View style={[{ backgroundColor: colors.surfaceContainerLowest, borderRadius: 20, padding: spacing.md, gap: spacing.md, marginTop: spacing.md }, shadows.card]}>
            <Text style={{ fontFamily: fontFamilies.jakarta.bold, fontSize: 16, color: colors.onSurface, borderBottomWidth: 1, borderBottomColor: colors.surfaceVariant, paddingBottom: 8 }}>
              Pharmacy details
            </Text>
            <TextField label="Pharmacy name" icon="local_pharmacy" placeholder="Pharmacie du Centre" value={pharmacyName} onChangeText={setPharmacyName} />
            <TextField
              label="Pharmacy address"
              icon="location_on"
              placeholder="Avenue Kennedy, Yaoundé"
              value={pharmacyAddress}
              onChangeText={(v) => {
                setPharmacyAddress(v);
                setResolvedPharmacyAddress(null);
              }}
              onBlur={async () => {
                if (!pharmacyAddress.trim()) return;
                const result = await geocodeAddress(pharmacyAddress.trim());
                setResolvedPharmacyAddress(result);
              }}
            />
            {resolvedPharmacyAddress ? (
              <ResolvedAddressRow address={resolvedPharmacyAddress.formattedAddress} helper="Detected location" />
            ) : null}
            <TextField label="DPML operating license number" icon="assignment" placeholder="DPML-XXXXXX" value={dpmlLicense} onChangeText={setDpmlLicense} />
            <TextField label="Pharmacy phone number" icon="call" placeholder="+237 2XX XXX XXX" value={pharmacyPhone} onChangeText={setPharmacyPhone} keyboardType="phone-pad" />
          </View>
        ) : (
          <View style={[{ backgroundColor: colors.surfaceContainerLowest, borderRadius: 20, padding: spacing.md, gap: spacing.md, marginTop: spacing.md }, shadows.card]}>
            <Text style={{ fontFamily: fontFamilies.jakarta.bold, fontSize: 16, color: colors.onSurface, borderBottomWidth: 1, borderBottomColor: colors.surfaceVariant, paddingBottom: 8 }}>
              Select your pharmacy
            </Text>
            <TextField
              label="Search pharmacy"
              icon="search"
              placeholder="Start typing pharmacy name..."
              value={pharmacySearch}
              onChangeText={(v) => {
                setPharmacySearch(v);
                setSelectedPharmacy(null);
              }}
            />
            <View style={{ gap: 8 }}>
              {searching ? (
                <Text style={{ fontFamily: fontFamilies.manrope.medium, fontSize: 13, color: colors.onSurfaceVariant }}>Searching...</Text>
              ) : (
                pharmacyResults.map((p) => {
                  const isSelected = selectedPharmacy?.id === p.id;
                  return (
                    <Pressable
                      key={p.id}
                      onPress={() => setSelectedPharmacy(p)}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 12,
                        padding: 12,
                        borderRadius: radii.lg,
                        borderWidth: 1,
                        borderStyle: isSelected ? "solid" : "dashed",
                        borderColor: isSelected ? colors.primaryContainer : colors.surfaceVariant,
                        backgroundColor: isSelected ? colors.surfaceContainerLow : "transparent",
                      }}
                    >
                      <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: colors.surfaceContainer, alignItems: "center", justifyContent: "center" }}>
                        <AppIcon name="storefront" size={18} color={colors.primary} />
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={{ fontFamily: fontFamilies.manrope.bold, fontSize: 15, color: colors.onSurface }}>{p.name}</Text>
                        <Text style={{ fontFamily: fontFamilies.manrope.medium, fontSize: 12, color: colors.onSurfaceVariant }}>{p.address_text}</Text>
                      </View>
                      {isSelected ? <AppIcon name="check_circle" size={20} color={colors.primaryContainer} /> : null}
                    </Pressable>
                  );
                })
              )}
              {!searching && pharmacySearch.trim() && pharmacyResults.length === 0 ? (
                <Text style={{ fontFamily: fontFamilies.manrope.medium, fontSize: 13, color: colors.onSurfaceVariant }}>
                  No approved pharmacy matches that name.
                </Text>
              ) : null}
            </View>
          </View>
        )}

        <View style={{ flexDirection: "row", gap: spacing.sm, marginTop: spacing.lg, paddingHorizontal: 4 }}>
          <Checkbox checked={agreed} onToggle={() => setAgreed((a) => !a)} />
          <Text style={{ flex: 1, fontFamily: fontFamilies.manrope.medium, fontSize: 14, color: colors.onSurfaceVariant }}>
            I confirm that the details provided are accurate and I agree to the{" "}
            <Text style={{ color: colors.primaryContainer, fontFamily: fontFamilies.manrope.bold }}>Terms & Conditions</Text> and{" "}
            <Text style={{ color: colors.primaryContainer, fontFamily: fontFamilies.manrope.bold }}>Privacy Policy</Text>.
          </Text>
        </View>

        {error ? (
          <Text style={{ fontFamily: fontFamilies.manrope.medium, fontSize: 13, color: colors.error, marginTop: spacing.sm, paddingHorizontal: 4 }}>
            {error}
          </Text>
        ) : null}

        <PrimaryButton
          label={mode === "join" ? "Submit for approval" : "Submit for review"}
          disabled={!agreed || (mode === "join" && !selectedPharmacy)}
          loading={submitting}
          onPress={handleSubmit}
          style={{ marginTop: spacing.lg }}
        />
      </ScrollView>
    </Screen>
  );
}
