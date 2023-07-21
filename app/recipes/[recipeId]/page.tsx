import { serverFetch } from "@/src/utilities/serverFetch";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import DeleteButton from "@/src/components/general/DeleteButton";

interface PageProps {
  params: {
    recipeId: string;
  };
}

const Page = async ({ params: { recipeId } }: PageProps) => {
  const recipe = await serverFetch.get(
    `http://localhost:3000/api/recipes/${recipeId}`
  );

  return (
    <div className="max-w-4xl mx-auto p-5 space-y-5">
      <Link href="/">
        <div className="flex gap-2 items-center text-sm">
          <ArrowLeftIcon className="h-3 w-3" /> Back
        </div>
      </Link>
      <h2>{recipe?.data?.name}</h2>
      {recipe?.data?.html && (
        <div dangerouslySetInnerHTML={{ __html: recipe?.data?.html }} />
      )}
      <div>
        <DeleteButton recipe={recipe?.data} />
      </div>
    </div>
  );
};

export default Page;
