"use client";

import { signIn } from "@/actions/sign-in";
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

export function SignInForm({onClick} : {onClick : () => void}) {
  const [error, action] = useFormState(signIn, {} as { [key: string]: string });
  return (
    <form action={action}>
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Sign In</CardTitle>
          <CardDescription>
            Enter your email and password for sign in.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
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
            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{""}
            <Button onClick={onClick} variant="link" size="sm">
              Sign up
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
