import F3KAuthCard from "@/components/f3k/F3KAuthCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Account — F3K Atelier",
  description: "Create your F3K collector account for priority access to Drop 001 releases and member privileges.",
};

export default function SignUpPage() {
  return <F3KAuthCard initialMode="sign-up" />;
}
