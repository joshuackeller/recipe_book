"use client";

import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

const BackButton = () => {
  return (
    <Link href="/">
      <div className="flex gap-2 items-center text-sm pb-5">
        <ArrowLeftIcon className="h-3 w-3" /> Back
      </div>
    </Link>
  );
};

export default BackButton;
