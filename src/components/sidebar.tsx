"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathName = usePathname();
  const routes = [
    {
      name: "Dashboard",
      path: "/dashboard",
    },
    {
      name: "Profile",
      path: "/profile",
    },
    {
      name: "Settings",
      path: "/settings",
    },
  ];

  return (
    <nav className="flex flex-col col-span-3 gap-2 text-muted-foreground text-sm ml-10">
      <h1 className="font-bold text-4xl text-primary mb-6">
        {pathName[1].toUpperCase() + pathName.slice(2)}
      </h1>
      <div className="flex flex-col gap-3">
        {routes.map((route) => (
          <Link
            key={route.name}
            href={route.path}
            className={cn(
              route.path === pathName && "font-semibold text-primary"
            )}
          >
            {route.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}
