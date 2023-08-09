"use client";

import Button from "@/src/components/base/Button";
import TextInput from "@/src/components/base/fields/TextInput";
import BackButton from "@/src/components/general/BackButton";
import { useState } from "react";
import Toggle from "@/src/components/base/fields/Toggle";
import { clientFetch } from "@/src/utilities/clientFetch";
import { useRouter } from "next/navigation";

const CreateGroup = () => {
  const [name, setName] = useState<string>("");
  const [autoAddRecipes, setAutoAddRecipes] = useState<boolean>(true);

  const router = useRouter();
  const createGroup = () => {
    clientFetch
      .post("/groups", {
        name,
        autoAddRecipes,
      })
      .then((response) => {
        if (response?.id) {
          router.push(`/groups/${response?.id}`);
        } else {
          router.push("/settings");
        }
      });
  };

  return (
    <div>
      <BackButton />
      <h2>Create a New Recipe Group</h2>
      <div className="py-2 space-y-5">
        <TextInput
          inputClassName="w-full h-12 font-semibold text-xl"
          label="Name"
          value={name}
          setValue={setName}
        />
        <Toggle
          label="Automatically Add Recipes"
          value={autoAddRecipes}
          setValue={setAutoAddRecipes}
        />
        <div className="flex justify-end">
          <Button onClick={createGroup} type="submit">
            Create Group
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateGroup;
