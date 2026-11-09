import F3KAuthCard from "@/components/f3k/F3KAuthCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Account — F3K",
  description: "Create your F3K account for priority access to Drop 001 releases and member privileges.",
};

export default function SignUpPage() {
  return <F3KAuthCard initialMode="sign-up" />;
}
