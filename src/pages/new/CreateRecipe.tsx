"use client";

import TextInput from "@/src/components/base/TextInput";
import { FormEvent, MouseEvent, useState } from "react";
import Tiptap from "@/src/components/base/TipTap";
import Button from "@/src/components/base/Button";
import { clientFetch } from "@/src/utilities/clientFetch";
import { useRouter } from "next/navigation";

const CreateRecipe = () => {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [html, setHtml] = useState<string>("<h1>Let's get started</h1>");

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
      <h2>Create a New Recipe</h2>

      <div className="py-2 space-y-5">
        <TextInput label="Name" value={name} setValue={setName} />
        <Tiptap value={html} setValue={setHtml} />
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
