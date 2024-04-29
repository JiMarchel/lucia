import { PasswordCard } from "@/components/password-card";
import { getAuth } from "@/lib/get-auth";
import { redirect } from "next/navigation";

const SettingsPage = async () => {
  const { user } = await getAuth();
  if (!user) {
    redirect("/");
  }
  return (
    <div className="grid grid-cols-9 col-span-7">
      <PasswordCard userId={user.id} />
    </div>
  );
};

export default SettingsPage;
