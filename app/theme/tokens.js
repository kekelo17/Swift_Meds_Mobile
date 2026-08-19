// Design tokens extracted verbatim from the Stitch HTML export
// (stitch_swift_meds_mobile_platform/*/code.html — every one of the 29
// screens defines the exact same 47-token Tailwind color palette, so this
// file is the single source of truth converted 1:1 from that config).
//
// Naming matches the Material 3 token names Stitch used (e.g. "primary",
// "on-primary-container") so it's easy to trace any given style back to
// the original HTML class it came from.

export const colors = {
  secondaryFixed: "#85f9ba",
  error: "#ba1a1a",
  secondaryFixedDim: "#68dca0",
  onPrimary: "#ffffff",
  onSecondaryFixedVariant: "#005232",
  onErrorContainer: "#93000a",
  tertiaryContainer: "#956100",
  onSecondaryFixed: "#002111",
  primaryContainer: "#0e7c4a",
  onTertiaryFixed: "#291800",
  surfaceContainerHighest: "#d5e7db",
  surfaceVariant: "#d5e7db",
  tertiaryFixedDim: "#ffb955",
  primaryFixed: "#96f7b9",
  onTertiaryContainer: "#ffebd6",
  secondary: "#006d44",
  onSurfaceVariant: "#3f4941",
  inverseOnSurface: "#e3f5e9",
  surface: "#ecfef2",
  onPrimaryContainer: "#b6ffcd",
  tertiary: "#754b00",
  surfaceDim: "#cdded3",
  onSurface: "#101e18",
  surfaceContainer: "#e1f2e7",
  outlineVariant: "#becabe",
  surfaceTint: "#006d3f",
  onSecondaryContainer: "#007349",
  onPrimaryFixed: "#002110",
  inversePrimary: "#7ada9f",
  inverseSurface: "#25342c",
  onTertiary: "#ffffff",
  primaryFixedDim: "#7ada9f",
  background: "#ecfef2",
  onError: "#ffffff",
  tertiaryFixed: "#ffddb4",
  secondaryContainer: "#85f9ba",
  onBackground: "#101e18",
  onTertiaryFixedVariant: "#633f00",
  surfaceContainerLowest: "#ffffff",
  primary: "#006138",
  surfaceContainerLow: "#e6f8ec",
  onPrimaryFixedVariant: "#00522e",
  surfaceBright: "#ecfef2",
  errorContainer: "#ffdad6",
  onSecondary: "#ffffff",
  outline: "#6f7a70",
  surfaceContainerHigh: "#dbece1",

  // Literal one-off hex values used directly in the HTML outside the
  // Tailwind token map (screen background fallback, gradient stops).
  screenBg: "#F6FAF7",
  gradientDark: "#08512F",
  gradientMid: "#0E7C4A",
  gradientLight: "#3FAE72",
  white: "#FFFFFF",
};

// borderRadius block from tailwind.config, converted from rem/px to RN
// numeric points (1rem = 16px).
export const radii = {
  default: 4, // 0.25rem
  lg: 8, // 0.5rem
  xl: 12, // 0.75rem
  full: 9999,
  // Cards throughout the screens use rounded-xl (12px) and rounded-2xl
  // (16px, used for chat bubbles / sheets) even though 2xl isn't in the
  // named scale — Tailwind's default 2xl is 16px, kept here for parity.
  xxl: 16,
};

// spacing block from tailwind.config (already px in the source, so this
// is a direct copy).
export const spacing = {
  base: 4,
  xs: 8,
  sm: 12,
  md: 16,
  gutter: 16,
  lg: 24,
  xl: 32,
  containerMargin: 20,
};

// fontSize block from tailwind.config — each entry there was
// [px, { lineHeight, letterSpacing, fontWeight }]; flattened here.
export const typography = {
  headlineXl: { fontSize: 32, lineHeight: 40, letterSpacing: -0.6, fontWeight: "800" },
  headlineLg: { fontSize: 24, lineHeight: 32, letterSpacing: -0.24, fontWeight: "800" },
  headlineLgMobile: { fontSize: 20, lineHeight: 28, fontWeight: "800" },
  titleMd: { fontSize: 18, lineHeight: 24, fontWeight: "700" },
  priceDisplay: { fontSize: 20, lineHeight: 24, letterSpacing: 0.4, fontWeight: "800" },
  labelBold: { fontSize: 12, lineHeight: 16, fontWeight: "700" },
  bodyLg: { fontSize: 16, lineHeight: 24, fontWeight: "500" },
  bodyMd: { fontSize: 14, lineHeight: 20, fontWeight: "500" },
};

// fontFamily block — "headline/title/label/price" styles use Plus Jakarta
// Sans, "body" styles use Manrope. Font family names below match what's
// registered in app/theme/fonts.js via expo-font / @expo-google-fonts.
export const fontFamilies = {
  jakarta: {
    regular: "PlusJakartaSans_500Medium",
    bold: "PlusJakartaSans_700Bold",
    extrabold: "PlusJakartaSans_800ExtraBold",
  },
  manrope: {
    medium: "Manrope_500Medium",
    bold: "Manrope_700Bold",
  },
};

// Shadows — every card in the HTML uses one of these two soft shadow
// recipes (rgba(18,33,26, alpha)), converted to RN shadow props (iOS) +
// elevation (Android).
export const shadows = {
  card: {
    shadowColor: "#12211A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 3,
  },
  raised: {
    shadowColor: "#12211A",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 30,
    elevation: 8,
  },
  navBar: {
    shadowColor: "#12211A",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 10,
  },
};

export default { colors, radii, spacing, typography, fontFamilies, shadows };
