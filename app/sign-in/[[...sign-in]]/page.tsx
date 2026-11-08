import F3KAuthCard from "@/components/f3k/F3KAuthCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In — F3K Atelier",
  description: "Sign in to access your F3K Drop 001 reservations, order tracking, and client privileges.",
};

export default function SignInPage() {
  return <F3KAuthCard initialMode="sign-in" />;
}
