import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DeliveryTabNavigator from "./DeliveryTabNavigator";

const Stack = createNativeStackNavigator();

// Rendered once profile.role resolves to "delivery_agent" AND
// delivery_agents.status is "approved" — otherwise RootNavigator's gate
// sends them to VerificationPending instead.
export default function DeliveryRootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: "slide_from_right" }}>
      <Stack.Screen name="DeliveryTabs" component={DeliveryTabNavigator} />
    </Stack.Navigator>
  );
}
