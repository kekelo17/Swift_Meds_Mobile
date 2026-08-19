import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import WelcomeScreen from "../screens/auth/WelcomeScreen";
import RoleSelectScreen from "../screens/auth/RoleSelectScreen";
import SignInScreen from "../screens/auth/SignInScreen";
import ResetPasswordScreen from "../screens/auth/ResetPasswordScreen";
import ClientSignUpScreen from "../screens/auth/ClientSignUpScreen";
import PharmacistSignUpScreen from "../screens/auth/PharmacistSignUpScreen";
import DeliveryAgentSignUpScreen from "../screens/auth/DeliveryAgentSignUpScreen";
import VerificationPendingScreen from "../screens/auth/VerificationPendingScreen";

const Stack = createNativeStackNavigator();

// Everything shown to a signed-out user. RootNavigator renders this
// whenever useSession().isLoggedIn is false — once supabase.auth.signIn
// succeeds, the session listener in SessionContext flips isLoggedIn to
// true and RootNavigator swaps to the matching role's *RootNavigator
// automatically (no manual navigation.reset needed anywhere in here).
export default function AuthNavigator() {
  return (
    <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false, animation: "slide_from_right" }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="RoleSelect" component={RoleSelectScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
      <Stack.Screen name="ClientSignUp" component={ClientSignUpScreen} />
      <Stack.Screen name="PharmacistSignUp" component={PharmacistSignUpScreen} />
      <Stack.Screen name="DeliveryAgentSignUp" component={DeliveryAgentSignUpScreen} />
      <Stack.Screen name="VerificationPending" component={VerificationPendingScreen} />
    </Stack.Navigator>
  );
}
