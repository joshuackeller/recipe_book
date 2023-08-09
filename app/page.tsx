import HomePage from "@/src/srcPages/HomePage";
import { serverFetch } from "@/src/utilities/serverFetch";

export default async function Home() {
  let recipes = [];
  try {
    recipes = await serverFetch.get("/recipes");
  } catch (error) {
    console.error(error);
  }

  return (
    <div>
      <HomePage preRenderRecipes={recipes} />
    </div>
  );
}
