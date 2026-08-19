import React from "react";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

// Every screen in the Stitch export uses Google's "Material Symbols
// Outlined" font via <span class="material-symbols-outlined">icon_name</span>.
// React Native doesn't have that exact font bundled, so each name below is
// mapped to the closest icon in @expo/vector-icons — MaterialIcons where
// the name is a long-standing classic Material Icon (safe, exact match),
// MaterialCommunityIcons where the Stitch name is a newer Material Symbols
// glyph that may not exist in the classic set (safer fallback with a much
// larger glyph library). Spot-check any icon flagged "verify" below against
// the rendered app — these are best-effort visual matches, not guaranteed
// byte-identical glyphs.
//
// Full list of the 75 icon names actually used across the 29 screens.
const ICON_MAP = {
  add: { family: "material", name: "add" },
  analytics: { family: "material", name: "analytics" },
  arrow_back: { family: "material", name: "arrow-back" },
  arrow_forward: { family: "material", name: "arrow-forward" },
  arrow_upward: { family: "material", name: "arrow-upward" },
  assignment: { family: "community", name: "clipboard-text-outline" },
  badge: { family: "community", name: "badge-account-outline" },
  block: { family: "material", name: "block" },
  bolt: { family: "community", name: "lightning-bolt" },
  bookmark_manager: { family: "community", name: "bookmark-multiple-outline" },
  calendar_today: { family: "material", name: "calendar-today" },
  call: { family: "material", name: "call" },
  cancel: { family: "material", name: "cancel" },
  chat_bubble: { family: "material", name: "chat-bubble" },
  check: { family: "material", name: "check" },
  check_circle: { family: "material", name: "check-circle" },
  chevron_left: { family: "material", name: "chevron-left" },
  chevron_right: { family: "material", name: "chevron-right" },
  close: { family: "material", name: "close" },
  cloud_upload: { family: "material", name: "cloud-upload" },
  contact_mail: { family: "material", name: "contact-mail" },
  contact_page: { family: "community", name: "card-account-details-outline" },
  description: { family: "material", name: "description" },
  directions_car: { family: "material", name: "directions-car" },
  directions_walk: { family: "material", name: "directions-walk" },
  done: { family: "material", name: "done" },
  done_all: { family: "material", name: "done-all" },
  edit: { family: "material", name: "edit" },
  error: { family: "material", name: "error" },
  event: { family: "material", name: "event" },
  event_available: { family: "material", name: "event-available" },
  event_note: { family: "material", name: "event-note" },
  explore: { family: "material", name: "explore" },
  fact_check: { family: "community", name: "clipboard-check-outline" },
  filter_list: { family: "material", name: "filter-list" },
  history: { family: "material", name: "history" },
  home: { family: "material", name: "home" },
  hourglass_top: { family: "community", name: "timer-sand" },
  info: { family: "material", name: "info" },
  inventory_2: { family: "community", name: "package-variant-closed" },
  list_alt: { family: "material", name: "list-alt" },
  local_pharmacy: { family: "material", name: "local-pharmacy" },
  local_shipping: { family: "material", name: "local-shipping" },
  location_on: { family: "material", name: "location-on" },
  lock: { family: "material", name: "lock" },
  logout: { family: "material", name: "logout" },
  mail: { family: "material", name: "mail" },
  map: { family: "material", name: "map" },
  medical_services: { family: "community", name: "medical-bag" },
  medication: { family: "community", name: "pill" },
  menu: { family: "material", name: "menu" },
  more_vert: { family: "material", name: "more-vert" },
  my_location: { family: "material", name: "my-location" },
  notifications: { family: "material", name: "notifications" },
  open_in_new: { family: "material", name: "open-in-new" },
  payments: { family: "community", name: "cash-multiple" },
  pedal_bike: { family: "community", name: "bike" },
  pending_actions: { family: "community", name: "clipboard-clock-outline" },
  person: { family: "material", name: "person" },
  phone: { family: "material", name: "phone" },
  phone_iphone: { family: "material", name: "phone-iphone" },
  pill: { family: "community", name: "pill" },
  prescriptions: { family: "community", name: "prescription" },
  receipt_long: { family: "community", name: "receipt-text-outline" },
  remove: { family: "material", name: "remove" },
  route: { family: "community", name: "map-marker-path" },
  save: { family: "material", name: "save" },
  schedule: { family: "material", name: "schedule" },
  search: { family: "material", name: "search" },
  send: { family: "material", name: "send" },
  shopping_bag: { family: "community", name: "shopping-outline" },
  smart_toy: { family: "community", name: "robot-outline" },
  smartphone: { family: "material", name: "smartphone" },
  store: { family: "material", name: "store" },
  storefront: { family: "material", name: "storefront" },
  two_wheeler: { family: "material", name: "two-wheeler" },
  upload_file: { family: "community", name: "file-upload-outline" },
  verified: { family: "material", name: "verified" },
  visibility: { family: "material", name: "visibility" },
  visibility_off: { family: "material", name: "visibility-off" },
  warning: { family: "material", name: "warning" },
  workspace_premium: { family: "community", name: "crown-outline" },
};

const FALLBACK = { family: "community", name: "help-circle-outline" };

// <AppIcon name="local_pharmacy" size={24} color={colors.primary} />
// `name` is the exact Material-Symbols name from the original HTML
// (data-icon attribute), so converting a screen is a direct copy-paste.
export default function AppIcon({ name, size = 24, color = "#101e18", style }) {
  const entry = ICON_MAP[name] || FALLBACK;
  const Component = entry.family === "community" ? MaterialCommunityIcons : MaterialIcons;
  return <Component name={entry.name} size={size} color={color} style={style} />;
}
