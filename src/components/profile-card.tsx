"use client";
import { DatabaseUserAttributes } from "@/lib/lucia";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { UploadImage } from "./ui/upload-button";
import { useFormState } from "react-dom";
import { editProfile } from "@/actions/edit-profile";
import { toast } from "sonner";

type ProfileCardProps = {
  user: DatabaseUserAttributes;
  userId: string;
};

export const ProfileCard = ({ user, userId }: ProfileCardProps) => {
  const [disabledForm, setDisabledForm] = useState<boolean>(true);
  const [userImage, setUserImage] = useState<string | null>(null);

  const [error, action] = useFormState(
    editProfile,
    {} as { [key: string]: string }
  );

  useEffect(() => {
    if (error === undefined) {
      toast.success("Profile updated successfully");
    }
    setDisabledForm(true)
  }, [error]);

  return (
    <form action={action} className="col-span-7">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Profile</CardTitle>
          <CardDescription>
            Basic account information. Your username is a combination of your
            first name and last name.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 grid-rows-8 space-x-2">
            <div className="col-span-3 row-span-8 flex justify-center items-center relative">
              <Image
                src={user.image ? user.image : "/noImage.webp"}
                alt="asa"
                fill
                priority
                // sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="col-span-4 row-span-2 space-y-2">
              <Label htmlFor="firstName">First name</Label>
              <Input
                id="firstName"
                name="firstName"
                defaultValue={user.firstName}
                disabled={disabledForm}
                required
              />
            </div>
            <div className="col-span-4 row-span-2 space-y-2">
              <Label htmlFor="lastName">Last name</Label>
              <Input
                id="lastName"
                name="lastName"
                defaultValue={user.lastName}
                disabled={disabledForm}
                required
              />
            </div>
            <div className="col-span-4 row-span-2 space-y-2">
              <UploadImage setImageUrl={setUserImage} />
              <input
                className="hidden"
                type="text"
                defaultValue={userImage ? userImage : user.image}
                name="image"
              />
              <input
                type="text"
                className="hidden"
                defaultValue={userId}
                name="id"
              />
            </div>
            <div className="col-span-4 ">
              {disabledForm ? (
                <Button
                  variant="secondary"
                  onClick={(e) => {
                    e.preventDefault();
                    setDisabledForm(false);
                  }}
                >
                  Edit
                </Button>
              ) : (
                <div className="space-x-2">
                  <Button
                    variant="secondary"
                    onClick={(e) => {
                      e.preventDefault();
                      setDisabledForm(true);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button variant="green" type="submit">
                    Save
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </form>
  );
};
