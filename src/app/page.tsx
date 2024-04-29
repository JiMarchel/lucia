import { AuthForm } from "@/components/auth-form";
import { getAuth } from "@/lib/get-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const { user } = await getAuth();

  if (user) {
    redirect("/dashboard");
  }
  
  return (
    <main className="flex justify-center items-center h-screen">
      <AuthForm />
    </main>
  );
}
