import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import Svg, { Path } from "react-native-svg";
import Screen from "../../components/Screen";
import AdminTopAppBar from "../../components/AdminTopAppBar";
import AppIcon from "../../components/AppIcon";
import { colors, spacing, radii, fontFamilies, shadows } from "../../theme/tokens";

// 1:1 with admin_analytics/code.html — Admin lands here immediately after
// login (this is the first tab / default screen). Bento grid of 6 stat
// cards, an SVG donut chart for search success/failure, and a recent-
// pharmacy-approvals list.
const STATS = [
  { icon: "storefront", label: "Pharmacies", value: "1,204", suffix: "/ 1.5k" },
  { icon: "local_pharmacy", label: "On duty now", value: "842" },
  { icon: "medication", label: "Medicines listed", value: "14.2k" },
  { icon: "check_circle", label: "Search success", value: "78%", primary: true },
  { icon: "event_available", label: "Reservations", value: "3,190" },
  { icon: "smart_toy", label: "AI consultations", value: "856" },
];

const RECENT_APPROVALS = [
  { name: "Pharmacie de la Paix", when: "Approved today, 09:45 AM" },
  { name: "Cité Verte Care", when: "Approved yesterday, 14:20 PM" },
  { name: "MedPlus Bonamoussadi", when: "Approved Oct 24, 2023" },
];

export default function AdminAnalyticsScreen() {
  return (
    <Screen>
      <AdminTopAppBar />
      <ScrollView contentContainerStyle={{ padding: spacing.containerMargin, gap: spacing.lg }}>
        <View>
          <Text style={{ fontFamily: fontFamilies.jakarta.extrabold, fontSize: 24, color: colors.onSurface }}>Analytics Overview</Text>
          <Text style={{ fontFamily: fontFamilies.manrope.medium, fontSize: 14, color: colors.onSurfaceVariant, marginTop: 4 }}>
            Live metrics for Yaoundé sector
          </Text>
        </View>

        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.sm }}>
          {STATS.map((s) => (
            <View
              key={s.label}
              style={[
                { width: "31%", minHeight: 130, backgroundColor: colors.surfaceContainerLowest, borderRadius: 16, padding: spacing.sm, justifyContent: "space-between" },
                shadows.card,
              ]}
            >
              <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: colors.surfaceContainerLow, alignItems: "center", justifyContent: "center" }}>
                <AppIcon name={s.icon} size={18} color={colors.primaryContainer} />
              </View>
              <View>
                <Text style={{ fontFamily: fontFamilies.jakarta.bold, fontSize: 10, color: colors.onSurfaceVariant, textTransform: "uppercase", letterSpacing: 0.3 }}>
                  {s.label}
                </Text>
                <Text style={{ fontFamily: fontFamilies.jakarta.extrabold, fontSize: 18, color: s.primary ? colors.primaryContainer : colors.onSurface, marginTop: 2 }}>
                  {s.value} {s.suffix ? <Text style={{ fontFamily: fontFamilies.manrope.medium, fontSize: 11, color: colors.outline }}>{s.suffix}</Text> : null}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <View style={[{ backgroundColor: colors.surfaceContainerLowest, borderRadius: 24, padding: spacing.lg, alignItems: "center" }, shadows.card]}>
          <Text style={{ fontFamily: fontFamilies.jakarta.bold, fontSize: 16, color: colors.onSurface, marginBottom: spacing.lg, alignSelf: "flex-start" }}>
            Search Performance
          </Text>
          <DonutChart percent={78} />
          <View style={{ width: "100%", gap: 10, marginTop: spacing.lg }}>
            <LegendRow color={colors.primaryContainer} label="Found instantly" value="78%" />
            <LegendRow color={colors.tertiaryFixedDim} label="Not found / Pending" value="22%" muted />
          </View>
        </View>

        <View style={[{ backgroundColor: colors.surfaceContainerLowest, borderRadius: 24, padding: spacing.lg }, shadows.card]}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: spacing.md }}>
            <Text style={{ fontFamily: fontFamilies.jakarta.bold, fontSize: 16, color: colors.onSurface }}>Recent Pharmacy Approvals</Text>
            <Pressable>
              <Text style={{ fontFamily: fontFamilies.jakarta.bold, fontSize: 11, color: colors.primaryContainer, textTransform: "uppercase" }}>View All</Text>
            </Pressable>
          </View>
          {RECENT_APPROVALS.map((a) => (
            <View key={a.name} style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 10 }}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm }}>
                <View style={{ width: 44, height: 44, borderRadius: 14, backgroundColor: colors.surfaceContainer, alignItems: "center", justifyContent: "center" }}>
                  <AppIcon name="verified" size={18} color={colors.primary} />
                </View>
                <View>
                  <Text style={{ fontFamily: fontFamilies.jakarta.bold, fontSize: 15, color: colors.onSurface }}>{a.name}</Text>
                  <Text style={{ fontFamily: fontFamilies.manrope.medium, fontSize: 12.5, color: colors.onSurfaceVariant, marginTop: 2 }}>{a.when}</Text>
                </View>
              </View>
              <AppIcon name="chevron_right" size={18} color={colors.outlineVariant} />
            </View>
          ))}
        </View>
      </ScrollView>
    </Screen>
  );
}

function LegendRow({ color, label, value, muted }) {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: color }} />
        <Text style={{ fontFamily: fontFamilies.manrope.medium, fontSize: 14, color: muted ? colors.onSurfaceVariant : colors.onSurface }}>{label}</Text>
      </View>
      <Text style={{ fontFamily: fontFamilies.jakarta.bold, fontSize: 14, color: muted ? colors.onSurfaceVariant : colors.onSurface }}>{value}</Text>
    </View>
  );
}

// Recreates the SVG stroke-dasharray donut from the source HTML exactly
// (a circle traced by two arcs — background amber-ish track + green
// foreground arc sized to `percent`).
function DonutChart({ percent }) {
  const circumference = 100;
  return (
    <View style={{ width: 176, height: 176, alignItems: "center", justifyContent: "center" }}>
      <Svg width={176} height={176} viewBox="0 0 36 36" style={{ transform: [{ rotate: "-90deg" }] }}>
        <Path
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke={colors.tertiaryFixedDim}
          strokeOpacity={0.3}
          strokeWidth={4}
        />
        <Path
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke={colors.primaryContainer}
          strokeWidth={4}
          strokeDasharray={`${percent}, ${circumference}`}
          strokeLinecap="round"
        />
      </Svg>
      <View style={{ position: "absolute", alignItems: "center" }}>
        <Text style={{ fontFamily: fontFamilies.jakarta.extrabold, fontSize: 32, color: colors.primaryContainer }}>{percent}%</Text>
      </View>
    </View>
  );
}
