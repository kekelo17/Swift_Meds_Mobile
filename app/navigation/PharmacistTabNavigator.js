import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CustomTabBar from "../components/CustomTabBar";

import PharmacistDashboardScreen from "../screens/pharmacist/PharmacistDashboardScreen";
import InventoryManagementScreen from "../screens/pharmacist/InventoryManagementScreen";
import ReservationsManagementScreen from "../screens/pharmacist/ReservationsManagementScreen";
import PharmacistChatScreen from "../screens/pharmacist/PharmacistChatScreen";
import PharmacistProfileScreen from "../screens/pharmacist/PharmacistProfileScreen";

const Tab = createBottomTabNavigator();

export default function PharmacistTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen
        name="Dashboard"
        component={PharmacistDashboardScreen}
        options={{ tabBarIconName: "home", tabBarLabelText: "Dashboard" }}
      />
      <Tab.Screen
        name="Medications"
        component={InventoryManagementScreen}
        options={{ tabBarIconName: "inventory_2", tabBarLabelText: "Medications" }}
      />
      <Tab.Screen
        name="ReservationsMgmt"
        component={ReservationsManagementScreen}
        options={{ tabBarIconName: "event_note", tabBarLabelText: "Reservations" }}
      />
      <Tab.Screen
        name="PharmacistChat"
        component={PharmacistChatScreen}
        options={{ tabBarIconName: "chat_bubble", tabBarLabelText: "Chat" }}
      />
      <Tab.Screen
        name="PharmacistProfile"
        component={PharmacistProfileScreen}
        options={{ tabBarIconName: "person", tabBarLabelText: "Profile" }}
      />
    </Tab.Navigator>
  );
}
