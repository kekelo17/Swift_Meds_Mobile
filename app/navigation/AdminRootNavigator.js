import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AdminTabNavigator from "./AdminTabNavigator";
import UserDetailsScreen from "../screens/admin/UserDetailsScreen";

const Stack = createNativeStackNavigator();

// Rendered once profile.role resolves to "admin". Admin accounts are
// created internally (no self-signup screen) — see profiles.role check
// constraint and the create_profile RPC, which is only ever called from
// the client/pharmacist/delivery-agent signup screens.
export default function AdminRootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: "slide_from_right" }}>
      <Stack.Screen name="AdminTabs" component={AdminTabNavigator} />
      <Stack.Screen name="UserDetails" component={UserDetailsScreen} />
    </Stack.Navigator>
  );
}
