"use client";

import React, { createContext, useContext, useState } from "react";
import F3KAuthCard from "@/components/f3k/F3KAuthCard";

// Mock user representation for local preview mode
export interface MockUser {
  id: string;
  fullName: string;
  firstName: string;
  lastName: string;
  primaryEmailAddress: { emailAddress: string };
  emailAddresses: Array<{ emailAddress: string }>;
  imageUrl: string;
}

const defaultMockUser: MockUser = {
  id: "user_mock_preview_01",
  fullName: "Preview Collector",
  firstName: "Preview",
  lastName: "Collector",
  primaryEmailAddress: { emailAddress: "collector@f3k.com" },
  emailAddresses: [{ emailAddress: "collector@f3k.com" }],
  imageUrl: "/models/hero_model.png",
};

interface MockClerkContextValue {
  user: MockUser | null;
  isSignedIn: boolean;
  setUser: React.Dispatch<React.SetStateAction<MockUser | null>>;
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const MockClerkContext = createContext<MockClerkContextValue>({
  user: defaultMockUser,
  isSignedIn: true,
  setUser: () => {},
  setIsSignedIn: () => {},
});

export function ClerkProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(defaultMockUser);
  const [isSignedIn, setIsSignedIn] = useState(true);

  return (
    <MockClerkContext.Provider value={{ user, isSignedIn, setUser, setIsSignedIn }}>
      {children}
    </MockClerkContext.Provider>
  );
}

export function useAuth() {
  const { isSignedIn, user } = useContext(MockClerkContext);
  return {
    isLoaded: true,
    isSignedIn,
    userId: isSignedIn && user ? user.id : null,
    sessionId: isSignedIn ? "sess_mock_preview_01" : null,
    getToken: async () => null,
    signOut: async () => {},
  };
}

export function useUser() {
  const { isSignedIn, user } = useContext(MockClerkContext);
  return {
    isLoaded: true,
    isSignedIn,
    user: isSignedIn ? user : null,
  };
}

export function useSession() {
  const { isSignedIn, user } = useContext(MockClerkContext);
  return {
    isLoaded: true,
    isSignedIn,
    session: isSignedIn
      ? {
          id: "sess_mock_preview_01",
          user,
        }
      : null,
  };
}

export function useClerk() {
  const { setUser, setIsSignedIn, user } = useContext(MockClerkContext);
  return {
    user,
    signOut: async () => {
      setIsSignedIn(false);
      setUser(null);
    },
    openSignIn: () => {},
    openSignUp: () => {},
    setActive: async () => {},
  };
}

export function useSignIn() {
  const { setIsSignedIn, setUser } = useContext(MockClerkContext);
  return {
    isLoaded: true,
    signIn: {
      create: async () => {
        setIsSignedIn(true);
        setUser(defaultMockUser);
        return { status: "complete" };
      },
    },
    setActive: async () => {
      setIsSignedIn(true);
      setUser(defaultMockUser);
    },
  };
}

export function useSignUp() {
  const { setIsSignedIn, setUser } = useContext(MockClerkContext);
  return {
    isLoaded: true,
    signUp: {
      create: async () => {
        setIsSignedIn(true);
        setUser(defaultMockUser);
        return { status: "complete" };
      },
    },
    setActive: async () => {
      setIsSignedIn(true);
      setUser(defaultMockUser);
    },
  };
}

export function SignIn() {
  return <F3KAuthCard initialMode="sign-in" />;
}

export function SignUp() {
  return <F3KAuthCard initialMode="sign-up" />;
}

export function UserButton() {
  return (
    <div className="w-8 h-8 rounded-full border border-white/20 bg-zinc-900 flex items-center justify-center text-xs font-mono text-white">
      DE
    </div>
  );
}

export function SignInButton({ children }: { children?: React.ReactNode }) {
  return <>{children || <button type="button">Sign In</button>}</>;
}

export function SignOutButton({ children }: { children?: React.ReactNode }) {
  return <>{children || <button type="button">Sign Out</button>}</>;
}

export function SignedIn({ children }: { children?: React.ReactNode }) {
  const { isSignedIn } = useContext(MockClerkContext);
  return isSignedIn ? <>{children}</> : null;
}

export function SignedOut({ children }: { children?: React.ReactNode }) {
  const { isSignedIn } = useContext(MockClerkContext);
  return !isSignedIn ? <>{children}</> : null;
}

export function Protect({ children }: { children?: React.ReactNode }) {
  return <>{children}</>;
}
