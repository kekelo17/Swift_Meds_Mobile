import React, { useState } from "react";
import { View, Text, ScrollView, TextInput, Pressable, KeyboardAvoidingView, Platform } from "react-native";
import Screen from "../../components/Screen";
import ChatBubble from "../../components/ChatBubble";
import AppIcon from "../../components/AppIcon";
import { colors, spacing, radii, fontFamilies, shadows } from "../../theme/tokens";

const INITIAL_MESSAGES = [
  { role: "user", text: "What are the common side effects of Paracetamol?", time: "10:42 AM" },
  {
    role: "assistant",
    text:
      "Paracetamol is generally safe when taken at recommended doses. Uncommon side effects can include allergic skin reactions, nausea, and fatigue. Severe side effects like liver damage usually only occur with significant overdose.",
    time: "10:42 AM",
  },
  { role: "user", text: "Can I take it on an empty stomach?", time: "10:43 AM" },
  {
    role: "assistant",
    text:
      "Yes, you can generally take paracetamol on an empty stomach. Unlike NSAIDs (like ibuprofen), it's less likely to irritate your stomach lining. If you feel any discomfort, taking it with a small snack might help.",
    time: "10:44 AM",
  },
];

// 1:1 with swiftty_ai_chat_1/code.html — scope: client_medical (see
// ai_conversations.scope in schema.sql; Swiftty is client + admin only).
export default function SwifttyChatScreen() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;
    setMessages((m) => [...m, { role: "user", text: input.trim(), time: "now" }]);
    setInput("");
  };

  return (
    <Screen>
      <View style={{ height: 64, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8 }}>
        <AppIcon name="bolt" size={20} color={colors.primary} />
        <Text style={{ fontFamily: fontFamilies.jakarta.extrabold, fontSize: 20, color: colors.primary }}>Swiftty</Text>
      </View>

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.containerMargin, paddingTop: 8 }}>
          <View style={{ flexDirection: "row", gap: 10, backgroundColor: colors.surfaceContainerHigh, borderRadius: radii.xl, padding: spacing.md, marginBottom: spacing.lg }}>
            <AppIcon name="info" size={18} color={colors.onSurfaceVariant} />
            <Text style={{ flex: 1, fontFamily: fontFamilies.manrope.medium, fontSize: 13, color: colors.onSurfaceVariant, lineHeight: 18 }}>
              Swiftty gives general information only and is not medical advice. Consult a pharmacist or doctor for
              guidance specific to you.
            </Text>
          </View>

          {messages.map((m, i) => (
            <ChatBubble key={i} role={m.role} text={m.text} time={m.time} />
          ))}
        </ScrollView>

        <View style={{ paddingHorizontal: spacing.containerMargin, paddingBottom: spacing.md }}>
          <View
            style={[
              {
                backgroundColor: colors.white,
                borderRadius: radii.full,
                borderWidth: 1,
                borderColor: colors.outlineVariant,
                flexDirection: "row",
                alignItems: "center",
                paddingLeft: 16,
                paddingRight: 6,
                paddingVertical: 6,
              },
              shadows.raised,
            ]}
          >
            <TextInput
              value={input}
              onChangeText={setInput}
              placeholder="Message Swiftty..."
              placeholderTextColor={colors.outline}
              style={{ flex: 1, fontFamily: fontFamilies.manrope.medium, fontSize: 15, color: colors.onSurface, height: 40 }}
              onSubmitEditing={send}
            />
            <Pressable onPress={send} style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: colors.primaryContainer, alignItems: "center", justifyContent: "center" }}>
              <AppIcon name="arrow_upward" size={20} color={colors.white} />
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
}
