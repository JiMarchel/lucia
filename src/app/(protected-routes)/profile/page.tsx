import { ProfileCard } from "@/components/profile-card";
import { getAuth } from "@/lib/get-auth";
import { redirect } from "next/navigation";

const ProfilePage = async () => {
  const { user } = await getAuth();
  console.log(user);

  if (!user) {
    redirect("/");
  }
  return (
    <div className="grid grid-cols-9 col-span-7">
      <ProfileCard user={user} userId={user.id} />
    </div>
  );
};

export default ProfilePage;
