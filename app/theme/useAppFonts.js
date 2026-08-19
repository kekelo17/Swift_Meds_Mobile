import {
  useFonts as usePlusJakarta,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_700Bold,
  PlusJakartaSans_800ExtraBold,
} from "@expo-google-fonts/plus-jakarta-sans";
import { useFonts as useManrope, Manrope_500Medium, Manrope_700Bold } from "@expo-google-fonts/manrope";

// Loads the exact two font families the Stitch export links via Google
// Fonts (<link ...family=Manrope:wght@400;500;600;700&family=Plus+Jakarta+
// Sans:wght@500;600;700;800>). Call this once in App.js and hold rendering
// until it resolves true.
export default function useAppFonts() {
  const [jakartaLoaded] = usePlusJakarta({
    PlusJakartaSans_500Medium,
    PlusJakartaSans_700Bold,
    PlusJakartaSans_800ExtraBold,
  });
  const [manropeLoaded] = useManrope({ Manrope_500Medium, Manrope_700Bold });
  return jakartaLoaded && manropeLoaded;
}
