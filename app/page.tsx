"use client";
import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import Navbar, { handleLogout } from "@/components/ui/navbar";
import Posts from "@/components/ui/posts";
import { Textarea } from "@/components/ui/textarea";
import { Bird, Loader2 } from "lucide-react";

export default function Home() {
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true); // Start loading state

    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/insertPost", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    if (response.ok) {
      if (result.message) {
        setMessage(result.message);
      } else {
        setMessage("Post successfully added!");
      }
    } else {
      setMessage("An error occurred. Please try again.");
    }

    setLoading(false); // End loading state
  }

  return (
    <div className="container w-full max-w-3xl mx-auto px-4 py-12 dark:bg-background dark:text-foreground">
      <Navbar onLogout={handleLogout} />
      <h1 className="text-3xl font-bold mb-4">
        <Bird />
      </h1>
      <div className="grid w-full gap-2">
        <form onSubmit={onSubmit}>
          <Textarea
            name="content"
            placeholder="Your thoughts..."
            className="border border-stone-800"
            disabled={loading}
          />
          {message && (
            <div
              className={`text-sm mt-2 ${
                message === "Post successfully added!"
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {message}
            </div>
          )}
          <Button
            disabled={loading}
            className="bg-white text-black hover:text-white hover:bg-stone-800 mt-2"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Post"
            )}
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
