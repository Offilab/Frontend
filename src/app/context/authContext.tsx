"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "../supabaseclient";

// Define types for context
interface AuthContextType {
  session: any;
  signUpNewUser: (email: string, password: string, role: string, full_name: string) => Promise<any>;
  signInUser: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<void>;
}

// Create context with type safety
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthProviderProps) => {
  const [session, setSession] = useState<any>(null);

  // Sign up
  const signUpNewUser = async (email: string, password: string, role: string, full_name: string) => {
    const { data, error } = await supabase.auth.signUp({
      email: email.toLowerCase(),
      password: password,
    });

    if (error) {
      console.error("Error signing up: ", error);
      return { success: false, error };
    }

    if (data?.user) {
      await supabase.from("profiles").insert([
        { id: data.user.id, name: full_name, role: role },
      ]);
      console.log("New user created");
    }
    return { success: true, data };
  };

  // Sign in
  const signInUser = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.toLowerCase(),
        password: password,
      });

      if (error) {
        console.error("Sign-in error:", error.message);
        return { success: false, error: error.message };
      }

      const user = data?.user;
      if (!user) {
        return {
          success: false,
          error: "An unexpected error occurred. Please try again.",
        };
      }

      return { success: true, data };
    } catch (err: any) {
      console.error("Unexpected error during sign-in:", err.message);
      return {
        success: false,
        error: "An unexpected error occurred. Please try again.",
      };
    }
  };

  // Track auth state
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Sign out
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ signUpNewUser, signInUser, session, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook for consuming auth
export const UserAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("UserAuth must be used within AuthContextProvider");
  return context;
};
