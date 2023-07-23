import HomePage from "@/src/pages/HomePage";
import { serverFetch } from "@/src/utilities/serverFetch";

export default async function Home() {
  const recipes = await serverFetch.get("http://localhost:3000/api/recipes");

  return (
    <main className="max-w-4xl mx-auto p-5">
      <HomePage preRenderRecipes={recipes?.data} />
    </main>
  );
}
