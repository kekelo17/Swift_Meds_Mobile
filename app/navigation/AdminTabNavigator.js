import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CustomTabBar from "../components/CustomTabBar";

import AdminAnalyticsScreen from "../screens/admin/AdminAnalyticsScreen";
import ApprovalsScreen from "../screens/admin/ApprovalsScreen";
import DirectoryScreen from "../screens/admin/DirectoryScreen";
import SwifttyOpsChatScreen from "../screens/admin/SwifttyOpsChatScreen";

const Tab = createBottomTabNavigator();

// Matches the 4-tab admin bottom nav baked into every admin screen's
// markup: Analytics, Approvals, Directory, Swiftty. Admin lands on
// Analytics immediately after login (it's the first/default tab) — see
// RootNavigator's role redirect note.
export default function AdminTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Analytics"
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen
        name="Analytics"
        component={AdminAnalyticsScreen}
        options={{ tabBarIconName: "analytics", tabBarLabelText: "Analytics" }}
      />
      <Tab.Screen
        name="Approvals"
        component={ApprovalsScreen}
        options={{ tabBarIconName: "fact_check", tabBarLabelText: "Approvals" }}
      />
      <Tab.Screen
        name="Directory"
        component={DirectoryScreen}
        options={{ tabBarIconName: "contact_page", tabBarLabelText: "Directory" }}
      />
      <Tab.Screen
        name="AdminSwiftty"
        component={SwifttyOpsChatScreen}
        // NOTE: the source HTML literally uses the "local_shipping" (delivery
        // truck) icon for this tab, not a chat/bot icon — kept as-is for
        // 1:1 fidelity, but worth a design review since it reads oddly.
        options={{ tabBarIconName: "local_shipping", tabBarLabelText: "Swiftty" }}
      />
    </Tab.Navigator>
  );
}
