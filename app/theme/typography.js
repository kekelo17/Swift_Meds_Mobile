import { colors, typography, fontFamilies } from "./tokens";

// Ready-to-spread <Text style={type.headlineXl}> presets, combining the
// fontSize/lineHeight/weight tokens with the correct font family per the
// fontFamily block in the original tailwind config (headline/title/label/
// price -> Plus Jakarta Sans, body -> Manrope).
export const type = {
  headlineXl: {
    ...typography.headlineXl,
    fontFamily: fontFamilies.jakarta.extrabold,
    color: colors.onSurface,
  },
  headlineLg: {
    ...typography.headlineLg,
    fontFamily: fontFamilies.jakarta.extrabold,
    color: colors.onSurface,
  },
  headlineLgMobile: {
    ...typography.headlineLgMobile,
    fontFamily: fontFamilies.jakarta.extrabold,
    color: colors.onSurface,
  },
  titleMd: {
    ...typography.titleMd,
    fontFamily: fontFamilies.jakarta.bold,
    color: colors.onSurface,
  },
  priceDisplay: {
    ...typography.priceDisplay,
    fontFamily: fontFamilies.jakarta.extrabold,
    color: colors.primary,
  },
  labelBold: {
    ...typography.labelBold,
    fontFamily: fontFamilies.jakarta.bold,
    color: colors.onSurface,
    textTransform: "uppercase",
    letterSpacing: 0.4,
  },
  bodyLg: {
    ...typography.bodyLg,
    fontFamily: fontFamilies.manrope.medium,
    color: colors.onSurface,
  },
  bodyMd: {
    ...typography.bodyMd,
    fontFamily: fontFamilies.manrope.medium,
    color: colors.onSurfaceVariant,
  },
  bodyMdBold: {
    ...typography.bodyMd,
    fontFamily: fontFamilies.manrope.bold,
    color: colors.onSurface,
  },
};

export default type;
