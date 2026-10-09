"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { User } from "firebase/auth";

type AuthContextValue = {
  user: User | null;
  authLoading: boolean;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    let unsubscribe: (() => void) | undefined;

    // Load Firebase after first paint so it never blocks the page from showing.
    Promise.all([import("firebase/auth"), import("@/lib/firebase")]).then(
      ([{ onAuthStateChanged }, { getAuthSafe }]) => {
        if (cancelled) return;
        unsubscribe = onAuthStateChanged(getAuthSafe(), (nextUser) => {
          setUser(nextUser);
          setAuthLoading(false);
        });
      },
      () => {
        // Couldn't load auth (e.g. offline): show the signed-out UI rather than nothing.
        if (!cancelled) setAuthLoading(false);
      },
    );

    return () => {
      cancelled = true;
      unsubscribe?.();
    };
  }, []);

  const value = useMemo(
    () => ({
      user,
      authLoading,
    }),
    [user, authLoading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
