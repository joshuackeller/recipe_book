"use client";

import TextInput from "@/src/components/base/fields/TextInput";
import { MouseEvent, useState } from "react";
import Tiptap from "@/src/components/base/fields/TipTap";
import Button from "@/src/components/base/Button";
import { clientFetch } from "@/src/utilities/clientFetch";
import { useRouter } from "next/navigation";
import BackButton from "@/src/components/general/BackButton";
import AddTags from "@/src/components/base/fields/AddTags";
import { Tag } from "@/src/interfaces";

const CreateRecipe = () => {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [html, setHtml] = useState<string>(INITIAL_HTML);
  const [tags, setTags] = useState<Tag[]>([]);

  const createRecipe = (e: MouseEvent) => {
    e.preventDefault();
    clientFetch
      .post("/recipes", {
        name,
        html,
        tags,
      })
      .then((response) => {
        if (response?.id) {
          router.push(`/recipes/${response.id}`);
        } else {
          router.push("/");
        }
      });
  };

  return (
    <div>
      <BackButton />
      <h2>Create a New Recipe</h2>
      <div className="py-2 space-y-5">
        <TextInput
          inputClassName="w-full h-12 font-bold text-3xl"
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
        <div>
          <div className="text-xs text-gray-600">Tags</div>
          <AddTags tags={tags} setTags={setTags} />
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
  <li>1 cup of this</li>
  <li>2 T of another</li>
  <li>dash of that thing</li>
</ul>
<h3>Instructions</h3>
<ol>
  <li>Mix something, another, and that thing</li>
  <li>Fold in this</li>
  <li>Bake for 30 minutes at 350&deg;</li>
</ol>
`;
