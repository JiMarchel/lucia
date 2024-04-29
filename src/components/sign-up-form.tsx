"use client";

import { signUp } from "@/actions/sign-up";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormState } from "react-dom";

export function SignUpForm({ onClick }: { onClick: () => void }) {
  const [error, action] = useFormState(signUp, {} as { [key: string]: string });

  return (
    <form action={action}>
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="firstName">First name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  placeholder="Naruto"
                  required
                />
                {error?.firstName && (
                  <div className="text-red-600">{error.firstName}</div>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lastName">Last name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  placeholder="Uzumaki"
                  required
                />
                {error?.lastName && (
                  <div className="text-red-600">{error.lastName}</div>
                )}
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="mmm@example.com"
                required
              />
              {error?.email && (
                <div className="text-red-600">{error.email}</div>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" />
              {error?.password && (
                <div className="text-red-600">{error.password}</div>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
              />
              {error?.confirmPassword && (
                <div className="text-red-600">{error.confirmPassword}</div>
              )}
            </div>
            <Button type="submit" className="w-full" size="sm">
              Create an account
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Button onClick={onClick} variant="link">
              Sign in
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
