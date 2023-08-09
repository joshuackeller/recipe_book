import HomePage from "@/src/srcPages/HomePage";
import { serverFetch } from "@/src/utilities/serverFetch";

export default async function Home() {
  let recipes = [];
  try {
    recipes = await serverFetch.get("/recipes");
    console.log(41, recipes);
  } catch (error) {
    console.log(43, error);
  }

  return (
    <div>
      <HomePage preRenderRecipes={recipes} />
    </div>
  );
}
