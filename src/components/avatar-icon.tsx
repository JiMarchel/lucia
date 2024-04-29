import { getAuth } from "@/lib/get-auth";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { signOut } from "@/actions/sign-out";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "./ui/dialog";
import { redirect } from "next/navigation";

export const AvatarIcon = async () => {
  const { user } = await getAuth();
  if(!user){
    redirect("/");
  }
  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage
              src={user.image ? user.image : ""}
              alt={user?.username}
            />
            <AvatarFallback>{user?.username[0]}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{user?.username}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="bg-destructive focus:bg-destructive">
            <DialogTrigger asChild>
              <Button
                size="dropdown"
                type="button"
                variant="ghost"
                className="hover:bg-destructive"
              >
                Sign out
              </Button>
            </DialogTrigger>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>
        <DialogHeader>Are you sure want to SignOut?</DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" size="sm" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
          <form action={signOut}>
            <Button type="submit" size="sm" variant="destructive">
              Sign out
            </Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
