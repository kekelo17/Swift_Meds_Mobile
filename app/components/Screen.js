import React from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../theme/tokens";

// Every screen body sits on #F6FAF7 (the literal screenBg fallback color
// used outside the token map) — this wrapper is what every screen file
// starts with.
export default function Screen({ children, edges = ["top"], style }) {
  return (
    <SafeAreaView edges={edges} style={[styles.root, style]}>
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.screenBg,
  },
});
