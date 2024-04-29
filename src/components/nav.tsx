import { AvatarIcon } from "./avatar-icon";
import { ThemeToggle } from "./theme-toggle";

export const Nav = () => {
  return (
    <nav className="flex px-20 py-2 items-center justify-end border-b mb-3">
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <AvatarIcon/>
      </div>
    </nav>
  );
};
