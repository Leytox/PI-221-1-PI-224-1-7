import { auth } from "@/auth";
import { RegistrationForm } from "@/components/auth/RegistrationForm";
import { redirect } from "next/navigation";

export default async function Registration() {
  const session = await auth();
  if (session) redirect("/");
  return (
    <div className="min-h-svh flex items-center justify-center w-full p-6 md:p-10">
      <div className="w-full max-w-sm">
        <RegistrationForm />
      </div>
    </div>
  );
}
