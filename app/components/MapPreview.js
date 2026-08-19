import React from "react";
import { View } from "react-native";
import Svg, { Rect, Circle, Path } from "react-native-svg";
import AppIcon from "./AppIcon";
import { colors, radii } from "../theme/tokens";

// The Stitch mock uses a remote placeholder photo for the map. Rather than
// hardcode a dependency on that specific external image URL, this renders
// a lightweight stylized map (soft green blocks standing in for streets/
// blocks) with the same pin markers, so the layout/spacing is pixel-
// accurate and ready to swap for a real <MapView> (react-native-maps +
// the Directions/Geocoding APIs from the architecture doc) later.
export default function MapPreview({ height = "35%", pins = [], showMe = true, style }) {
  return (
    <View style={[{ width: "100%", height, backgroundColor: colors.surfaceContainer, overflow: "hidden" }, style]}>
      <Svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
        <Rect x={0} y={0} width={100} height={100} fill={colors.surfaceContainer} />
        <Rect x={0} y={20} width={100} height={4} fill={colors.surfaceContainerHigh} />
        <Rect x={0} y={55} width={100} height={4} fill={colors.surfaceContainerHigh} />
        <Rect x={25} y={0} width={4} height={100} fill={colors.surfaceContainerHigh} />
        <Rect x={65} y={0} width={4} height={100} fill={colors.surfaceContainerHigh} />
        <Circle cx={40} cy={40} r={14} fill={colors.secondaryContainer} opacity={0.35} />
        <Circle cx={75} cy={70} r={10} fill={colors.secondaryContainer} opacity={0.3} />
      </Svg>

      {showMe ? (
        <View style={{ position: "absolute", left: "48%", top: "52%", alignItems: "center" }}>
          <View style={{ width: 16, height: 16, borderRadius: 8, backgroundColor: colors.info, borderWidth: 3, borderColor: colors.white }} />
        </View>
      ) : null}

      {pins.map((pin, i) => (
        <View key={i} style={{ position: "absolute", left: pin.left, top: pin.top, alignItems: "center" }}>
          <View
            style={{
              width: 28,
              height: 28,
              borderRadius: 14,
              backgroundColor: colors.white,
              alignItems: "center",
              justifyContent: "center",
              ...({}),
            }}
          >
            <AppIcon name="local_pharmacy" size={16} color={colors.primary} />
          </View>
        </View>
      ))}
    </View>
  );
}
