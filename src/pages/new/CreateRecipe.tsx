"use client";

import TextInput from "@/src/components/base/TextInput";
import { MouseEvent, useState } from "react";
import Tiptap from "@/src/components/base/TipTap";
import Button from "@/src/components/base/Button";
import { clientFetch } from "@/src/utilities/clientFetch";
import { useRouter } from "next/navigation";
import BackButton from "@/src/components/general/BackButton";

const CreateRecipe = () => {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [html, setHtml] = useState<string>(INITIAL_HTML);

  const createRecipe = (e: MouseEvent) => {
    e.preventDefault();
    clientFetch
      .post("/api/recipes", {
        name,
        html,
      })
      .then((response) => {
        if (response?.data?.id) {
          router.push(`/recipes/${response.data.id}`);
        } else {
          router.push("/");
        }
      });
  };

  return (
    <div className="max-w-4xl mx-auto p-5">
      <BackButton />
      <h2>Create a New Recipe</h2>
      <div className="py-2 space-y-5">
        <TextInput
          inputClassName="w-full h-12 font-bold text-2xl "
          label="Name"
          value={name}
          setValue={setName}
        />
        <div>
          <div className="text-xs text-gray-600">
            <label>Details</label>
          </div>
          <Tiptap value={html} setValue={setHtml} />
        </div>
        <div className="flex justify-end">
          <Button onClick={createRecipe} type="submit">
            Create Recipe
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateRecipe;

const INITIAL_HTML = `
<h3>Ingredients</h3>
<ul>
  <li>2 cup of something</li>
  <li>1 cup of this<li>
  <li>2 T of another</li>
  <li>dash of that thing</li>
</ul>
<h3>Instructions</h3>
<ol>
  <li>Mix something, another, and that thing</li>
  <li>Fold in this<li>
  <li>Bake for 30 minutes at 350&deg;</li>
</ol>
`;
