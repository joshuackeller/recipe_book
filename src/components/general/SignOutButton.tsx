"use client";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { AuthContext } from "../wrappers/auth/AuthWrapper";

const SignOutButton = () => {
  const router = useRouter();

  const { signOut } = useContext(AuthContext);

  const handleSignOut = () => {
    if (typeof window !== "undefined") {
      signOut();
      router.push("/");
    }
  };
  return (
    <button className="text-sm" onClick={handleSignOut}>
      Sign Out
    </button>
  );
};

export default SignOutButton;
