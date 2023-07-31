import HomePage from "@/src/pages/HomePage";
import { serverFetch } from "@/src/utilities/serverFetch";

export default async function Home() {
  const recipes = await serverFetch.get("/recipes");

  return (
    <div>
      <HomePage preRenderRecipes={recipes?.data} />
    </div>
  );
}
