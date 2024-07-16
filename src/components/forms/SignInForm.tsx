"use client";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/label";
import { SignInFormSchema } from "@/lib/types";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2 } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, onLogin } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignInForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const form = useForm<z.infer<typeof SignInFormSchema>>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof SignInFormSchema>) => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        const user = userCredential.user;
        onLogin(user.uid);
        console.log(`User successfully sign in!`);
        // Todo: Toast welcome user
        router.push("/chats");
      })
      .catch((error) => setError(error.message))
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-black">
      <h2 className="font-bold text-xl text-neutral-200">
        Welcome back to Chat Verse!
      </h2>
      <p className=" text-sm max-w-sm mt-2 mb-5 text-neutral-300">
        Sign in to continue chatting with your friends and family. Enter your
        email and password to access your account.
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            disabled={isLoading}
            render={({ field }) => (
              <FormItem>
                <LabelInputContainer className="text-white">
                  <FormLabel>
                    <Label htmlFor="email">Email</Label>
                  </FormLabel>

                  <FormControl className="bg-zinc-800 text-white">
                    <Input
                      id="email"
                      placeholder="example@gmail.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                </LabelInputContainer>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            disabled={isLoading}
            render={({ field }) => (
              <FormItem>
                <LabelInputContainer>
                  <FormLabel>
                    <Label htmlFor="password">Password</Label>
                  </FormLabel>

                  <FormControl className="bg-zinc-800 text-white">
                    <Input
                      id="email"
                      placeholder="••••••••"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                </LabelInputContainer>
                <FormMessage />
              </FormItem>
            )}
          />
          <button
            className="bg-gradient-to-br relative group/btn text-white from-zinc-900 to-zinc-900  block bg-zinc-800 w-full rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit">
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="ml-4 h-4 w-4 animate-spin" />
                <span>Signing in...</span>
              </div>
            ) : (
              <p>Sign in &rarr;</p>
            )}
            <BottomGradient />
          </button>
        </form>
      </Form>

      <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <p className="text-sm  mt-2 text-center text-white">
        Don't have an account?
        <Link
          href="/sign-up"
          className="text-small-semibold ml-1 text-blue-500">
          Sign up
        </Link>
      </p>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
