"use client";
import { useFormState } from "react-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { useEffect, useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { resetPassword } from "@/actions/reset-password";
import { toast } from "sonner";

export const PasswordCard = ({ userId }: { userId: string }) => {
  const [error, action] = useFormState(
    resetPassword,
    {} as { [key: string]: string }
  );
  const [isEditActive, setIsEditActive] = useState<boolean>(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  useEffect(() => {
    if (error === undefined) {
      toast.success("Password updated successfully");
    }
    setIsEditActive(false);
  }, [error]);

  return (
    <form className="col-span-5" action={action}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Password</CardTitle>
          <CardDescription>Password Setting</CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className={cn(isEditActive ? "grid grid-cols-7 gap-2" : "hidden")}
          >
            <div className="space-y-2 col-span-6">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input
                id="currentPassword"
                type={isPasswordVisible ? "text" : "password"}
                name="password"
                placeholder="Current Password"
                required
              />
              {error?.password && (
                <div className="text-red-600">{error.password}</div>
              )}
            </div>
            <div className="col-span-1 flex justify-center relative mt-auto">
              <Button
                size="icon"
                type="button"
                variant="ghost"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                {isPasswordVisible ? <Eye /> : <EyeOff />}
              </Button>
            </div>
            <div className="space-y-2 col-span-7">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type={isPasswordVisible ? "text" : "password"}
                name="newPassword"
                placeholder="New Password"
                required
              />
              {error?.newConfirmPassword && (
                <div className="text-red-600">{error.newConfirmPassword}</div>
              )}
            </div>
            <div className="space-y-2 col-span-7">
              <Label htmlFor="confirmNewPassword">Confirm New Password</Label>
              <Input
                id="confirmNewPassword"
                type={isPasswordVisible ? "text" : "password"}
                name="newConfirmPassword"
                placeholder="Confirm New Password"
                required
              />
              {error?.newConfirmPassword && (
                <div className="text-red-600">{error.newConfirmPassword}</div>
              )}
              <input
                type="text"
                className="hidden"
                name="id"
                defaultValue={userId}
              />
            </div>
          </div>
          <div className="mt-4">
            {isEditActive ? (
              <div className="space-x-2">
                <Button
                  size="sm"
                  type="button"
                  onClick={() => setIsEditActive(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="green" size="sm">
                  Save
                </Button>
              </div>
            ) : (
              <Button
                size="sm"
                type="button"
                onClick={() => setIsEditActive(true)}
              >
                Change password
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </form>
  );
};
