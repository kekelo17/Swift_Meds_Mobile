import React, { useState } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Screen from "../../components/Screen";
import TopAppBar from "../../components/TopAppBar";
import AppIcon from "../../components/AppIcon";
import { colors, spacing, radii, fontFamilies, shadows } from "../../theme/tokens";

const INITIAL_STOCK = [
  { id: "1", name: "Amoxicillin 500mg", price: "1,200 XAF", qty: 45 },
  { id: "2", name: "Ventolin Inhaler", price: "4,500 XAF", qty: 2 },
  { id: "3", name: "Paracetamol 1g", price: "500 XAF", qty: 120 },
  { id: "4", name: "Ibuprofen 400mg", price: "800 XAF", qty: 4 },
  { id: "5", name: "Metformin 500mg", price: "1,500 XAF", qty: 60 },
];

// 1:1 with inventory_management_1/code.html — quantity stepper per row,
// amber warning icon when quantity is low (<=5, matching the low-stock
// threshold used elsewhere in the architecture).
export default function InventoryManagementScreen() {
  const navigation = useNavigation();
  const [stock, setStock] = useState(INITIAL_STOCK);

  const updateQty = (id, delta) => {
    setStock((s) => s.map((item) => (item.id === id ? { ...item, qty: Math.max(0, item.qty + delta) } : item)));
  };

  return (
    <Screen>
      <TopAppBar title="Medications" showBack={false} rightIconName="add" onRightPress={() => navigation.navigate("AddMedication")} />
      <ScrollView contentContainerStyle={{ padding: spacing.containerMargin, gap: spacing.sm }}>
        {stock.map((item) => {
          const lowStock = item.qty <= 5;
          return (
            <View
              key={item.id}
              style={[
                { backgroundColor: colors.surfaceContainerLowest, borderRadius: 16, padding: spacing.md, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
                shadows.card,
              ]}
            >
              <View>
                <Text style={{ fontFamily: fontFamilies.jakarta.bold, fontSize: 16, color: colors.onSurface }}>{item.name}</Text>
                <Text style={{ fontFamily: fontFamilies.jakarta.extrabold, fontSize: 18, color: colors.primaryContainer, marginTop: 4 }}>{item.price}</Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                {lowStock ? (
                  <View style={{ backgroundColor: "rgba(149,97,0,0.1)", borderRadius: 20, padding: 4 }}>
                    <AppIcon name="warning" size={18} color={colors.tertiaryContainer} />
                  </View>
                ) : null}
                <View style={{ flexDirection: "row", alignItems: "center", gap: 10, backgroundColor: colors.surfaceContainerLow, borderRadius: radii.full, paddingHorizontal: 10, paddingVertical: 6 }}>
                  <Pressable onPress={() => updateQty(item.id, -1)}>
                    <AppIcon name="remove" size={18} color={colors.primaryContainer} />
                  </Pressable>
                  <Text style={{ fontFamily: fontFamilies.jakarta.bold, fontSize: 16, color: colors.onSurface, minWidth: 22, textAlign: "center" }}>
                    {item.qty}
                  </Text>
                  <Pressable onPress={() => updateQty(item.id, 1)}>
                    <AppIcon name="add" size={18} color={colors.primaryContainer} />
                  </Pressable>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </Screen>
  );
}
