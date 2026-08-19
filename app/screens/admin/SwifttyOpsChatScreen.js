import React, { useState } from "react";
import { View, Text, ScrollView, TextInput, Pressable, KeyboardAvoidingView, Platform } from "react-native";
import Screen from "../../components/Screen";
import AdminTopAppBar from "../../components/AdminTopAppBar";
import AppIcon from "../../components/AppIcon";
import { colors, spacing, radii, fontFamilies, shadows } from "../../theme/tokens";

// 1:1 with swiftty_ops_chat/code.html — scope: admin_ops (see
// ai_conversations.scope in schema.sql). Same chat visual language as the
// client SwifttyChatScreen, but grounded on platform stats instead of the
// medical knowledge base, with a numbered stock-out breakdown as the
// example reply (exactly as rendered in the source HTML).
const STOCKOUTS = [
  { rank: 1, name: "AMOXICILLIN 500MG", branches: "4 branches", tone: "danger" },
  { rank: 2, name: "PARACETAMOL 1G", branches: "3 branches", tone: "warning" },
  { rank: 3, name: "ARTEMETHER/LUMEFANTRINE", branches: "2 branches", tone: "neutral" },
];

export default function SwifttyOpsChatScreen() {
  const [input, setInput] = useState("");

  return (
    <Screen>
      <AdminTopAppBar title="Swiftty — System insights" />

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <ScrollView contentContainerStyle={{ padding: spacing.containerMargin, gap: spacing.lg }}>
          <View style={[{ backgroundColor: colors.surfaceContainerHigh, borderRadius: radii.xl, padding: spacing.md, flexDirection: "row", gap: spacing.sm }, shadows.card]}>
            <AppIcon name="info" size={18} color={colors.primaryContainer} />
            <Text style={{ flex: 1, fontFamily: fontFamilies.manrope.medium, fontSize: 13, color: colors.onSurfaceVariant, lineHeight: 18 }}>
              Swiftty summarizes platform statistics here. Figures are informational and may lag live data slightly.
            </Text>
          </View>

          <View style={{ alignItems: "flex-end" }}>
            <View style={{ maxWidth: "85%", backgroundColor: colors.primaryContainer, borderTopLeftRadius: radii.xxl, borderTopRightRadius: radii.xxl, borderBottomLeftRadius: radii.xxl, borderBottomRightRadius: 4, padding: spacing.md }}>
              <Text style={{ fontFamily: fontFamilies.manrope.bold, fontSize: 12, color: "rgba(255,255,255,0.9)", marginBottom: 4 }}>Admin</Text>
              <Text style={{ fontFamily: fontFamilies.manrope.medium, fontSize: 15, color: colors.onPrimary }}>
                What were the top 3 stock-outs this week?
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", gap: spacing.sm, alignItems: "flex-start" }}>
            <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: colors.secondaryContainer, alignItems: "center", justifyContent: "center" }}>
              <AppIcon name="local_shipping" size={18} color={colors.onSecondaryContainer} />
            </View>
            <View style={[{ flex: 1, backgroundColor: colors.white, borderTopLeftRadius: 4, borderTopRightRadius: radii.xxl, borderBottomLeftRadius: radii.xxl, borderBottomRightRadius: radii.xxl, padding: spacing.md, borderWidth: 1, borderColor: colors.surfaceVariant }, shadows.card]}>
              <Text style={{ fontFamily: fontFamilies.manrope.bold, fontSize: 13, color: colors.primary, marginBottom: 8 }}>Swiftty Ops</Text>
              <Text style={{ fontFamily: fontFamilies.manrope.medium, fontSize: 14, color: colors.onSurface, marginBottom: spacing.sm, lineHeight: 20 }}>
                Here are the top 3 items that hit zero inventory across all Yaoundé branches this week:
              </Text>
              {STOCKOUTS.map((s) => (
                <View key={s.rank} style={{ flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <View
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: 11,
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: s.tone === "danger" ? colors.errorContainer : s.tone === "warning" ? colors.tertiaryContainer : colors.surfaceVariant,
                    }}
                  >
                    <Text style={{ fontFamily: fontFamilies.jakarta.bold, fontSize: 11, color: s.tone === "danger" ? colors.onErrorContainer : s.tone === "warning" ? colors.onTertiaryContainer : colors.onSurfaceVariant }}>
                      {s.rank}
                    </Text>
                  </View>
                  <Text style={{ fontFamily: fontFamilies.manrope.bold, fontSize: 13.5, color: colors.onSurface }}>{s.name}</Text>
                  <Text style={{ fontFamily: fontFamilies.manrope.medium, fontSize: 12, color: colors.outline }}>({s.branches})</Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>

        <View style={{ paddingHorizontal: spacing.containerMargin, paddingBottom: spacing.md }}>
          <View
            style={[
              { backgroundColor: colors.white, borderRadius: radii.full, borderWidth: 1, borderColor: colors.surfaceVariant, flexDirection: "row", alignItems: "center", paddingLeft: 16, paddingRight: 6, paddingVertical: 6 },
              shadows.raised,
            ]}
          >
            <TextInput
              value={input}
              onChangeText={setInput}
              placeholder="Ask Swiftty about operations..."
              placeholderTextColor={colors.outline}
              style={{ flex: 1, fontFamily: fontFamilies.manrope.medium, fontSize: 15, color: colors.onSurface, height: 40 }}
            />
            <Pressable style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: colors.primaryContainer, alignItems: "center", justifyContent: "center" }}>
              <AppIcon name="send" size={18} color={colors.white} />
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
}
