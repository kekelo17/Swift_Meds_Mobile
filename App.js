import React from "react";
import { View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import RootNavigator from "./app/navigation/RootNavigator";
import { SessionProvider } from "./app/lib/SessionContext";
import useAppFonts from "./app/theme/useAppFonts";
import { colors } from "./app/theme/tokens";

export default function App() {
  const fontsLoaded = useAppFonts();

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: colors.screenBg }}>
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      {/* SessionProvider wraps navigation because RootNavigator itself reads
          useSession() to decide which role's screen tree to render — see
          app/navigation/RootNavigator.js for the gate logic. */}
      <SessionProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </SessionProvider>
    </SafeAreaProvider>
  );
}
