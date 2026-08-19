import React from "react";
import { View } from "react-native";
import Svg, { Path, Circle, Text as SvgText } from "react-native-svg";
import { colors, radii } from "../theme/tokens";

// Recreates the stylized route illustration from delivery_tracking_1
// exactly: a curved green path from an origin dot to a destination dot,
// with a circular vehicle marker roughly at the midpoint. This is a static
// illustration (matches the Stitch mock, which was also a static SVG-over-
// image graphic, not a live map) — swap for react-native-maps + Directions
// polyline when wiring real data, per the Directions API already in the
// architecture doc.
export default function RouteMapCard({ height = 220, vehicleIcon = "two_wheeler" }) {
  return (
    <View
      style={{
        height,
        borderRadius: radii.xl,
        backgroundColor: colors.surfaceContainer,
        overflow: "hidden",
      }}
    >
      <Svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
        <Path
          d="M 20 80 Q 40 40 80 20"
          fill="none"
          stroke={colors.gradientMid}
          strokeWidth={1.6}
          strokeLinecap="round"
        />
        <Circle cx={20} cy={80} r={2.4} fill={colors.gradientMid} />
        <Circle cx={20} cy={80} r={4.5} fill={colors.gradientMid} opacity={0.2} />
        <Circle cx={80} cy={20} r={2.4} fill={colors.onSurface} />
        <Circle cx={50} cy={45} r={6} fill={colors.white} />
        <SvgText x={50} y={47.5} fontSize={5} fill={colors.gradientMid} textAnchor="middle">
          •
        </SvgText>
      </Svg>
    </View>
  );
}
