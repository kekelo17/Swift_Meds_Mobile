import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import Screen from "../../components/Screen";
import AppIcon from "../../components/AppIcon";
import { PrimaryButton } from "../../components/Buttons";
import { colors, spacing, radii, fontFamilies, shadows } from "../../theme/tokens";

const INITIAL_REQUESTS = [
  { id: "1", pickup: "Pharmacie du Centre", dropoff: "Quartier Bastos, Yaoundé", fee: "800 XAF" },
  { id: "2", pickup: "Pharmacie de la Paix", dropoff: "Mvog-Mbi, Yaoundé", fee: "1,000 XAF" },
  { id: "3", pickup: "Pharmacie du Soleil", dropoff: "Nlongkak, Yaoundé", fee: "650 XAF" },
];

// 1:1 with delivery_requests_1/code.html — mini pickup/drop-off timeline
// per card + fee + Accept button. Accepting is enforced server-side by the
// accept_delivery_request RPC (one active delivery per agent, unless it's
// the same client + same drop-off — see schema.sql).
export default function DeliveryRequestsScreen() {
  const [requests, setRequests] = useState(INITIAL_REQUESTS);

  const accept = (id) => setRequests((r) => r.filter((req) => req.id !== id));

  return (
    <Screen>
      <ScrollView contentContainerStyle={{ padding: spacing.containerMargin, gap: spacing.lg }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end" }}>
          <View>
            <Text style={{ fontFamily: fontFamilies.jakarta.bold, fontSize: 18, color: colors.onSurface }}>Available Requests</Text>
            <Text style={{ fontFamily: fontFamilies.manrope.medium, fontSize: 13, color: colors.onSurfaceVariant, marginTop: 2 }}>
              New deliveries in your area
            </Text>
          </View>
          <View style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: "rgba(0,97,56,0.1)", alignItems: "center", justifyContent: "center" }}>
            <Text style={{ fontFamily: fontFamilies.jakarta.bold, fontSize: 13, color: colors.primary }}>{requests.length}</Text>
          </View>
        </View>

        {requests.length === 0 ? (
          <View style={{ alignItems: "center", paddingTop: 60 }}>
            <AppIcon name="list_alt" size={36} color={colors.outlineVariant} />
            <Text style={{ fontFamily: fontFamilies.manrope.medium, fontSize: 14, color: colors.onSurfaceVariant, marginTop: 10 }}>
              No pending requests right now.
            </Text>
          </View>
        ) : (
          requests.map((r) => (
            <View
              key={r.id}
              style={[
                { backgroundColor: colors.surfaceContainerLowest, borderRadius: 16, padding: spacing.md, borderWidth: 1, borderColor: colors.surfaceVariant, gap: spacing.md },
                shadows.card,
              ]}
            >
              <View style={{ gap: 10 }}>
                <View style={{ flexDirection: "row", alignItems: "flex-start", gap: spacing.md }}>
                  <View style={{ width: 24, height: 24, borderRadius: 12, backgroundColor: colors.surfaceContainerHigh, alignItems: "center", justifyContent: "center" }}>
                    <AppIcon name="storefront" size={13} color={colors.onSurfaceVariant} />
                  </View>
                  <View>
                    <Text style={{ fontFamily: fontFamilies.manrope.medium, fontSize: 12.5, color: colors.onSurfaceVariant }}>Pickup</Text>
                    <Text style={{ fontFamily: fontFamilies.jakarta.bold, fontSize: 15, color: colors.onSurface }}>{r.pickup}</Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row", alignItems: "flex-start", gap: spacing.md }}>
                  <View style={{ width: 24, height: 24, borderRadius: 12, backgroundColor: "rgba(0,97,56,0.1)", alignItems: "center", justifyContent: "center" }}>
                    <AppIcon name="location_on" size={13} color={colors.primary} />
                  </View>
                  <View>
                    <Text style={{ fontFamily: fontFamilies.manrope.medium, fontSize: 12.5, color: colors.onSurfaceVariant }}>Drop-off</Text>
                    <Text style={{ fontFamily: fontFamilies.jakarta.bold, fontSize: 15, color: colors.onSurface }}>{r.dropoff}</Text>
                  </View>
                </View>
              </View>

              <View style={{ height: 1, backgroundColor: colors.surfaceVariant, opacity: 0.6 }} />

              <View style={{ gap: 10 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                  <Text style={{ fontFamily: fontFamilies.manrope.medium, fontSize: 13, color: colors.onSurfaceVariant }}>Delivery Fee</Text>
                  <Text style={{ fontFamily: fontFamilies.jakarta.extrabold, fontSize: 18, color: colors.primary }}>{r.fee}</Text>
                </View>
                <PrimaryButton label="Accept Request" onPress={() => accept(r.id)} />
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </Screen>
  );
}
