"use client";

import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { useAuth } from "@clerk/nextjs";

export default function Header() {
  const { isSignedIn } = useAuth();

  return (
    <header className="flex items-center justify-end gap-4 px-6 py-4 border-b">
      {!isSignedIn ? (
        <>
          <SignInButton />
          <SignUpButton />
        </>
      ) : (
        <UserButton />
      )}
    </header>
  );
}
