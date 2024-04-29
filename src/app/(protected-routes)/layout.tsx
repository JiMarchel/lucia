import { Nav } from "@/components/nav";
import Sidebar from "@/components/sidebar";
import { getAuth } from "@/lib/get-auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const ProtectedLayout = async ({ children }: { children: ReactNode }) => {
  const { user } = await getAuth();

  if (!user) {
    redirect("/");
  }

  return (
    <main>
      <Nav />
      <div className="grid grid-cols-10 my-8">
        <Sidebar />
        {children}
      </div>
    </main>
  );
};

export default ProtectedLayout;
