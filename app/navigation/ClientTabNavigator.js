import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CustomTabBar from "../components/CustomTabBar";

import FindMedicationScreen from "../screens/client/FindMedicationScreen";
import PharmaciesDirectoryScreen from "../screens/client/PharmaciesDirectoryScreen";
import MyReservationsScreen from "../screens/client/MyReservationsScreen";
import SwifttyChatScreen from "../screens/client/SwifttyChatScreen";
import ProfileHubScreen from "../screens/client/ProfileHubScreen";

const Tab = createBottomTabNavigator();

// Matches the 5-tab bottom nav baked into every client screen's markup:
// Search, Pharmacies, Reservations, Swiftty, Profile.
export default function ClientTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen
        name="Search"
        component={FindMedicationScreen}
        options={{ tabBarIconName: "search", tabBarLabelText: "Search" }}
      />
      <Tab.Screen
        name="Pharmacies"
        component={PharmaciesDirectoryScreen}
        options={{ tabBarIconName: "local_pharmacy", tabBarLabelText: "Pharmacies" }}
      />
      <Tab.Screen
        name="Reservations"
        component={MyReservationsScreen}
        options={{ tabBarIconName: "event_note", tabBarLabelText: "Reservations" }}
      />
      <Tab.Screen
        name="Swiftty"
        component={SwifttyChatScreen}
        options={{ tabBarIconName: "bolt", tabBarLabelText: "Swiftty" }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileHubScreen}
        options={{ tabBarIconName: "person", tabBarLabelText: "Profile" }}
      />
    </Tab.Navigator>
  );
}
