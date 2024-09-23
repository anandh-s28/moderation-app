"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { login, signup } from "./actions";
import { Bird } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="container w-full max-w-xl mx-auto px-4 py-12 dark:bg-background dark:text-foreground mt-10">
      <h1 className="font-normal mb-4 flex flex-row">
        login to <Bird className="ml-2" />
      </h1>
      <div className="grid w-full gap-2">
        <form>
          <Input
            id="display_name"
            name="display_name"
            type="display_name"
            required
            className="border border-stone-800 mb-2"
            placeholder="User Name"
          />
          <Input
            id="email"
            name="email"
            type="email"
            required
            className="border border-stone-800 mb-2"
            placeholder="Email"
          />
          <Input
            id="password"
            name="password"
            type="password"
            required
            className="border border-stone-800"
            placeholder="Password"
          />
          <Button formAction={login} className="mr-2 mt-2">
            Log in
          </Button>
          <Button formAction={signup}>Sign up</Button>
        </form>
      </div>
    </div>
  );
}
