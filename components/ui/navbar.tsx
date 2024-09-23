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
            className="text-sm hover:bg-accent hover:text-accent-foreground"
            onClick={onLogout}
          >
            logout
          </Button>
        </li>
      </ul>
    </nav>
  );
}
