import React from "react";
import { View, Text, ScrollView } from "react-native";
import Screen from "../../components/Screen";
import TopAppBar from "../../components/TopAppBar";
import AppIcon from "../../components/AppIcon";
import { colors, spacing, radii, fontFamilies, shadows } from "../../theme/tokens";

const CONVERSATIONS = [
  { initials: "JL", name: "Jean-Luc A.", ref: "Res #4829", preview: "Is the medication available for pickup today?", time: "2m ago", unread: true },
  { initials: "MC", name: "Marie Claire T.", ref: "Res #8903", preview: "Thank you, I'll come by this afternoon.", time: "1h ago", unread: false },
];

// 1:1 with pharmacist_chat_1/code.html. Plain messaging with clients about
// their reservations — Swiftty is NOT available to pharmacists.
export default function PharmacistChatScreen() {
  return (
    <Screen>
      <TopAppBar title="Chat" showBack={false} />
      <ScrollView contentContainerStyle={{ padding: spacing.containerMargin, gap: spacing.md }}>
        <View
          style={{
            height: 56,
            borderRadius: radii.xxl,
            borderWidth: 1.5,
            borderColor: colors.surfaceContainerHighest,
            backgroundColor: colors.surfaceContainerLowest,
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: spacing.md,
          }}
        >
          <AppIcon name="search" size={18} color={colors.outline} />
          <Text style={{ marginLeft: 10, fontFamily: fontFamilies.manrope.medium, fontSize: 16, color: colors.outlineVariant }}>
            Search conversations...
          </Text>
        </View>

        {CONVERSATIONS.length === 0 ? (
          <View style={{ alignItems: "center", paddingTop: 60, gap: 10 }}>
            <AppIcon name="chat_bubble" size={36} color={colors.outlineVariant} />
            <Text style={{ fontFamily: fontFamilies.manrope.medium, fontSize: 14, color: colors.onSurfaceVariant, textAlign: "center" }}>
              Conversations with clients about their reservations will appear here.
            </Text>
          </View>
        ) : (
          CONVERSATIONS.map((c) => (
            <View
              key={c.name}
              style={[
                { backgroundColor: colors.surfaceContainerLowest, borderRadius: 20, padding: spacing.md, flexDirection: "row", gap: spacing.md, borderWidth: 1, borderColor: colors.surfaceContainerHighest, overflow: "hidden" },
                shadows.card,
                c.unread && { borderLeftWidth: 4, borderLeftColor: colors.primary },
              ]}
            >
              <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: colors.surfaceContainer, alignItems: "center", justifyContent: "center" }}>
                <Text style={{ fontFamily: fontFamilies.jakarta.bold, fontSize: 15, color: colors.primary }}>{c.initials}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "baseline" }}>
                  <Text numberOfLines={1} style={{ flex: 1, fontFamily: fontFamilies.jakarta.bold, fontSize: 15, color: colors.onSurface }}>
                    {c.name} <Text style={{ fontFamily: fontFamilies.manrope.medium, fontSize: 12, color: colors.outline }}>({c.ref})</Text>
                  </Text>
                  <Text style={{ fontFamily: fontFamilies.jakarta.bold, fontSize: 11, color: colors.primary, marginLeft: 8 }}>{c.time}</Text>
                </View>
                <Text numberOfLines={1} style={{ fontFamily: fontFamilies.manrope.medium, fontSize: 13.5, color: colors.onSurface, marginTop: 4 }}>
                  {c.preview}
                </Text>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </Screen>
  );
}
