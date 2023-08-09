import BackButton from "@/src/components/general/BackButton";
import SignOutButton from "@/src/components/general/SignOutButton";
import { Group } from "@/src/interfaces";
import { serverFetch } from "@/src/utilities/serverFetch";
import { SquaresPlusIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

const Page = async () => {
  let groups = [];
  try {
    groups = await serverFetch.get("/groups");
  } catch (error) {
    console.error(error);
  }

  return (
    <div>
      <BackButton />
      <div className="flex items-center flex-wrap gap-5">
        <Link href="/groups/new">
          <div className="bg-black border-2 border-black py-2 w-36  rounded-md">
            <SquaresPlusIcon className="h-5 w-5 text-white mx-auto" />
          </div>
        </Link>
        {groups?.map((group: Group) => (
          <div
            key={group.id}
            className="border-2 border-black py-2 w-36  rounded-md text-center "
          >
            {group.name}
          </div>
        ))}
      </div>
      <div className="mt-24 float-right">
        <SignOutButton />
      </div>
    </div>
  );
};

export default Page;
