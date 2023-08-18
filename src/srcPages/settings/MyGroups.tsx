"use client";

import useGetGroups from "@/src/apiCalls/queries/groups/useGetGroups";
import { Group } from "@/src/interfaces";
import { SquaresPlusIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

const MyGroups = () => {
  const { data: groups } = useGetGroups();

  return (
    <div>
      <h2>My Groups</h2>
      <div className="flex items-center flex-wrap gap-5">
        <Link href="/groups/new">
          <div className="bg-black border-2 border-black py-2 w-36  rounded-md">
            <SquaresPlusIcon className="h-5 w-5 text-white mx-auto" />
          </div>
        </Link>
        {groups?.map((group: Group) => (
          <Link
            href={`/groups/${group.id}`}
            key={group.id}
            className="border-2 border-black py-2 w-36  rounded-md text-center "
          >
            {group.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MyGroups;
