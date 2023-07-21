"use client";

import { Recipe } from "@prisma/client";
import { MouseEvent, useState } from "react";
import Modal from "../base/Modal";
import { clientFetch } from "@/src/utilities/clientFetch";
import { useRouter } from "next/navigation";
import Button from "../base/Button";

interface DeleteButtonProps {
  recipe: Recipe;
}

const DeleteButton = ({ recipe }: DeleteButtonProps) => {
  const [open, setOpen] = useState<boolean>(false);

  const router = useRouter();

  const deleteRecipe = (e: MouseEvent) => {
    clientFetch.delete(`/api/recipes/${recipe.id}`).then(() => {
      router.push("/");
    });
  };

  return (
    <>
      <button onClick={() => setOpen(true)} className="text-red-600 text-sm">
        Delete
      </button>
      <Modal open={open} setOpen={setOpen}>
        <div className="space-y-2">
          <h3>Delete Recipe</h3>
          <p>
            Are you sure you want to delete this recipe? You can't undo it...
          </p>
          <Button onClick={deleteRecipe}>Delete</Button>
        </div>
      </Modal>
    </>
  );
};

export default DeleteButton;
