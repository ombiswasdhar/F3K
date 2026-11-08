import { redirect } from "next/navigation";

export default function AddressesRedirectPage() {
  redirect("/dashboard?tab=addresses");
}
