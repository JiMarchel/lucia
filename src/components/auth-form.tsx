"use client"
import { useState } from "react";
import { SignUpForm } from "./sign-up-form";
import { SignInForm } from "./sign-in-form";

export const AuthForm = () => {
  //if formType is true, show sign up form
  const [formType, setFormType] = useState<boolean>(true);

  return formType ? (
    <SignUpForm onClick={() => setFormType(false)} />
  ) : (
    <SignInForm onClick={() => setFormType(true)} />
  );
};
