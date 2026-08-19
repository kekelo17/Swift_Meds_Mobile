import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ClientTabNavigator from "./ClientTabNavigator";
import PharmacyDetailsScreen from "../screens/client/PharmacyDetailsScreen";
import ReservePayScreen from "../screens/client/ReservePayScreen";
import DeliveryTrackingScreen from "../screens/client/DeliveryTrackingScreen";

const Stack = createNativeStackNavigator();

// Rendered by RootNavigator once a signed-in user's profile.role resolves
// to "client". Holds the 5-tab shell plus every screen pushed on top of it.
export default function ClientRootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: "slide_from_right" }}>
      <Stack.Screen name="ClientTabs" component={ClientTabNavigator} />
      <Stack.Screen name="PharmacyDetails" component={PharmacyDetailsScreen} options={{ presentation: "modal" }} />
      <Stack.Screen name="ReservePay" component={ReservePayScreen} />
      <Stack.Screen name="DeliveryTracking" component={DeliveryTrackingScreen} />
    </Stack.Navigator>
  );
}
