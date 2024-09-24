"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  onLogout: () => void;
}

export default function Navbar({ onLogout }: NavbarProps) {
  return (
    <nav className="flex items-center justify-between mb-5">
      <ul className="flex items-center space-x-4">
        <li>
          <Link href="/" className="text-sm hover:underline font-medium">
            home
          </Link>
        </li>
        <li>
          <Button
            variant="ghost"
            className="text-sm hover:bg-accent hover:text-accent-foreground font-medium"
            onClick={onLogout}
          >
            logout
          </Button>
        </li>
      </ul>
    </nav>
  );
}

// Function to handle logout
export async function handleLogout() {
  try {
    const response = await fetch("/auth/signout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      // Redirect to home page or login page after successful logout
      window.location.href = "/";
    } else {
      console.error("Failed to logout");
    }
  } catch (error) {
    console.error("An error occurred during logout", error);
  }
}
