"use client";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/ui/navbar";
import Posts from "@/components/ui/posts";
import { Textarea } from "@/components/ui/textarea";
import { Bird } from "lucide-react";
import { FormEvent } from "react";

export default function Home() {
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/insertPost", {
      method: "POST",
      body: formData,
    });
  }
  return (
    <div className="container w-full max-w-3xl mx-auto px-4 py-12 dark:bg-background dark:text-foreground">
      <Navbar onLogout={() => {}} />
      <h1 className="text-3xl font-bold mb-4">
        <Bird />
      </h1>
      <div className="grid w-full gap-2">
        <form onSubmit={onSubmit}>
          <Textarea
            name="content"
            placeholder="Your thoughts..."
            className="border border-stone-800"
          />
          <Button className="bg-white text-black hover:text-white hover:bg-stone-800 mt-2">
            Post your thoughts
          </Button>
        </form>
        <div>
          <h1 className="text-xl tracking-tight mt-5">your feed</h1>
          <Posts />
        </div>
      </div>
    </div>
  );
}
