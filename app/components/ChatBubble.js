import React from "react";
import { View, Text } from "react-native";
import AppIcon from "./AppIcon";
import { colors, radii, fontFamilies } from "../theme/tokens";

// Matches the user (right, solid green) / assistant (left, white card with
// a small bolt-badge avatar) message bubbles in swiftty_ai_chat_1.
export default function ChatBubble({ role, text, time }) {
  const isUser = role === "user";
  return (
    <View
      style={{
        flexDirection: isUser ? "column" : "row",
        alignItems: isUser ? "flex-end" : "flex-end",
        marginBottom: 20,
        gap: 8,
      }}
    >
      {!isUser ? (
        <View
          style={{
            width: 32,
            height: 32,
            borderRadius: 16,
            backgroundColor: colors.surfaceContainerHighest,
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 20,
          }}
        >
          <AppIcon name="bolt" size={16} color={colors.primary} />
        </View>
      ) : null}

      <View style={{ maxWidth: "78%", alignItems: isUser ? "flex-end" : "flex-start" }}>
        <View
          style={{
            backgroundColor: isUser ? colors.primaryContainer : colors.white,
            borderColor: isUser ? "transparent" : colors.surfaceVariant,
            borderWidth: isUser ? 0 : 1,
            paddingVertical: 12,
            paddingHorizontal: 16,
            borderTopLeftRadius: radii.xxl,
            borderTopRightRadius: radii.xxl,
            borderBottomLeftRadius: isUser ? radii.xxl : 4,
            borderBottomRightRadius: isUser ? 4 : radii.xxl,
          }}
        >
          <Text
            style={{
              fontFamily: fontFamilies.manrope.medium,
              fontSize: 14,
              lineHeight: 20,
              color: isUser ? colors.onPrimary : colors.onSurface,
            }}
          >
            {text}
          </Text>
        </View>
        {time ? (
          <Text style={{ fontSize: 10, color: colors.outline, marginTop: 4, fontFamily: fontFamilies.manrope.medium }}>
            {time}
          </Text>
        ) : null}
      </View>
    </View>
  );
}
