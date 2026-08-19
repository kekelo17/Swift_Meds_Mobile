import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PharmacistTabNavigator from "./PharmacistTabNavigator";
import AddMedicationScreen from "../screens/pharmacist/AddMedicationScreen";
import PrescriptionReviewScreen from "../screens/pharmacist/PrescriptionReviewScreen";
import WalkInReservationScreen from "../screens/pharmacist/WalkInReservationScreen";

const Stack = createNativeStackNavigator();

// Rendered once profile.role resolves to "pharmacist". A pharmacist whose
// pharmacists.status is still "pending" (joined an existing pharmacy,
// awaiting approval) is redirected to VerificationPending by
// RootNavigator's gate before this ever mounts — see RootNavigator.js.
export default function PharmacistRootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: "slide_from_right" }}>
      <Stack.Screen name="PharmacistTabs" component={PharmacistTabNavigator} />
      <Stack.Screen name="AddMedication" component={AddMedicationScreen} options={{ presentation: "modal" }} />
      <Stack.Screen name="PrescriptionReview" component={PrescriptionReviewScreen} />
      <Stack.Screen name="WalkInReservation" component={WalkInReservationScreen} />
    </Stack.Navigator>
  );
}
