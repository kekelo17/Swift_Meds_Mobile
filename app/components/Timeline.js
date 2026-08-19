import React from "react";
import { View, Text } from "react-native";
import AppIcon from "./AppIcon";
import { colors, fontFamilies } from "../theme/tokens";

// Matches the vertical connected-dot stepper in delivery_tracking_1 and the
// pickup/drop-off timeline in active_delivery_tracking_1.
// steps: [{ title, subtitle, state: "done" | "active" | "upcoming" }]
export default function Timeline({ steps }) {
  return (
    <View style={{ paddingLeft: 4 }}>
      {steps.map((step, i) => {
        const isLast = i === steps.length - 1;
        return (
          <View key={i} style={{ flexDirection: "row", alignItems: "flex-start" }}>
            <View style={{ alignItems: "center", width: 28 }}>
              <StepDot state={step.state} />
              {!isLast ? (
                <View
                  style={{
                    width: 2,
                    flex: 1,
                    minHeight: 32,
                    backgroundColor: step.state === "done" ? colors.primary : colors.surfaceVariant,
                    marginVertical: 2,
                  }}
                />
              ) : null}
            </View>
            <View style={{ flex: 1, paddingBottom: isLast ? 0 : 16, paddingLeft: 8 }}>
              <Text
                style={{
                  fontFamily: fontFamilies.manrope.bold,
                  fontSize: 14,
                  color: colors.onSurface,
                }}
              >
                {step.title}
              </Text>
              {step.subtitle ? (
                <Text
                  style={{
                    fontFamily: fontFamilies.jakarta.bold,
                    fontSize: 11,
                    color: colors.onSurfaceVariant,
                    marginTop: 2,
                  }}
                >
                  {step.subtitle}
                </Text>
              ) : null}
            </View>
          </View>
        );
      })}
    </View>
  );
}

function StepDot({ state }) {
  if (state === "done") {
    return (
      <View
        style={{
          width: 24,
          height: 24,
          borderRadius: 12,
          backgroundColor: colors.primary,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <AppIcon name="check" size={14} color={colors.white} />
      </View>
    );
  }
  if (state === "active") {
    return (
      <View
        style={{
          width: 24,
          height: 24,
          borderRadius: 12,
          backgroundColor: colors.white,
          borderWidth: 2,
          borderColor: colors.tertiaryFixedDim,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: colors.tertiaryFixedDim }} />
      </View>
    );
  }
  return (
    <View
      style={{
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: colors.surfaceContainer,
        borderWidth: 2,
        borderColor: colors.surfaceContainerLowest,
      }}
    />
  );
}
