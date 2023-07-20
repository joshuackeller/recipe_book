"use client";

import { Recipe } from "@prisma/client";
import Button from "../components/base/Button";
import Link from "next/link";

const HomePage = ({ recipes }: { recipes: any }) => {
  return (
    <div>
      <Button href="/new">Create Recipe</Button>
      <div className="py-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-5">
        {(recipes as any)?.data?.map((recipe: Recipe) => (
          <Link
            className="border-2 border-black rounded-lg h-48 w-48 flex justify-center items-center hover:border-black/80 text-black/80"
            href={`/recipes/${recipe.id}`}
            key={recipe.id}
          >
            <div>{recipe.name}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
