import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { supabase } from "./supabaseClient";

const SessionContext = createContext(null);

// Holds the current auth session + profile (with role) and re-fetches the
// profile whenever the auth state changes. This is what the navigation
// gate reads to decide which role's app shell to render — mirrors the
// role-based redirect logic from the architecture doc, just implemented as
// a render branch instead of a router redirect since React Navigation
// doesn't have an exact equivalent to go_router's `redirect`.
export function SessionProvider({ children }) {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [roleStatus, setRoleStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = useCallback(async (userId) => {
    if (!userId) {
      setProfile(null);
      setRoleStatus(null);
      return;
    }
    const { data, error } = await supabase
      .from("profiles_with_latlng")
      .select("*")
      .eq("id", userId)
      .maybeSingle();
    if (!error && data) setProfile(data);

    // Pharmacist and delivery-agent accounts can be gated behind approval
    // (joined-an-existing-pharmacy pharmacists, and every delivery agent).
    // Resolve that status here so the navigation gate can redirect pending
    // accounts to VerificationPending instead of their dashboard.
    if (data?.role === "pharmacist") {
      const { data: row } = await supabase
        .from("pharmacists")
        .select("status, is_owner, pharmacy_id")
        .eq("user_id", userId)
        .maybeSingle();
      setRoleStatus(row ? { status: row.status, isOwner: row.is_owner, pharmacyId: row.pharmacy_id } : null);
    } else if (data?.role === "delivery_agent") {
      const { data: row } = await supabase
        .from("delivery_agents")
        .select("status")
        .eq("user_id", userId)
        .maybeSingle();
      setRoleStatus(row ? { status: row.status } : null);
    } else {
      setRoleStatus(null);
    }
  }, []);

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(async ({ data: { session: initialSession } }) => {
      if (!mounted) return;
      setSession(initialSession);
      if (initialSession?.user?.id) await loadProfile(initialSession.user.id);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, newSession) => {
      setSession(newSession);
      if (newSession?.user?.id) {
        await loadProfile(newSession.user.id);
      } else {
        setProfile(null);
      }
    });

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, [loadProfile]);

  const refreshProfile = useCallback(() => loadProfile(session?.user?.id), [loadProfile, session]);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setProfile(null);
  }, []);

  const value = {
    session,
    profile,
    roleStatus,
    role: profile?.role ?? null,
    userId: session?.user?.id ?? null,
    isLoggedIn: !!session,
    loading,
    refreshProfile,
    signOut,
  };

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error("useSession must be used within a SessionProvider");
  return ctx;
}
