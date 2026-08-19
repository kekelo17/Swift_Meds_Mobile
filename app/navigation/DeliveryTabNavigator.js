import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CustomTabBar from "../components/CustomTabBar";

import DeliveryRequestsScreen from "../screens/delivery/DeliveryRequestsScreen";
import ActiveDeliveryTrackingScreen from "../screens/delivery/ActiveDeliveryTrackingScreen";
import DeliveryAgentProfileScreen from "../screens/delivery/DeliveryAgentProfileScreen";

const Tab = createBottomTabNavigator();

// Matches the 3-tab nav baked into active_delivery_tracking_1: Requests,
// Active, Profile.
export default function DeliveryTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen
        name="Requests"
        component={DeliveryRequestsScreen}
        options={{ tabBarIconName: "list_alt", tabBarLabelText: "Requests" }}
      />
      <Tab.Screen
        name="Active"
        component={ActiveDeliveryTrackingScreen}
        options={{ tabBarIconName: "local_shipping", tabBarLabelText: "Active" }}
      />
      <Tab.Screen
        name="DeliveryProfile"
        component={DeliveryAgentProfileScreen}
        options={{ tabBarIconName: "person", tabBarLabelText: "Profile" }}
      />
    </Tab.Navigator>
  );
}
