"use client";

import Button from "@/src/components/base/Button";
import TextInput from "@/src/components/base/fields/TextInput";
import TipTap from "@/src/components/base/fields/TipTap";
import BackButton from "@/src/components/general/BackButton";
import DeleteButton from "@/src/components/general/DeleteButton";
import { clientFetch } from "@/src/utilities/clientFetch";
import { useState } from "react";
import { Recipe, Tag as TagProp } from "@/src/interfaces";
import Tag from "@/src/components/base/Tag";
import AddTags from "@/src/components/base/fields/AddTags";

interface SingleRecipePageProps {
  recipe: Recipe;
  error?: any;
}

const SingleRecipePage = ({ recipe, error }: SingleRecipePageProps) => {
  console.log(1, recipe);
  console.log(2, error);
  return <div>testing single page</div>;
  // const [edit, setEdit] = useState<boolean>(false);

  // const [name, setName] = useState<string>(recipe.name || "");
  // const [html, setHtml] = useState<string>(recipe.html || "");
  // const [tags, setTags] = useState<TagProp[]>(recipe.tags || []);

  // const saveRecipe = () => {
  //   clientFetch
  //     .put(`/recipes/${recipe.id}`, { name, html })
  //     .then(() => setEdit(false));
  // };

  // return (
  //   <div className=" space-y-5">
  //     <BackButton />
  //     {edit ? (
  //       <>
  //         <TextInput
  //           inputClassName="w-full h-12 font-bold text-2xl "
  //           label="Name"
  //           value={name}
  //           setValue={setName}
  //         />
  //         <div>
  //           <div className="text-xs text-gray-600">
  //             <label>Details</label>
  //           </div>
  //           <TipTap value={html} setValue={setHtml} />
  //         </div>
  //         <div>
  //           <div className="text-xs text-gray-600">Tags</div>
  //           <AddTags tags={tags} setTags={setTags} recipeId={recipe.id} />
  //         </div>
  //         <div className="flex justify-end">
  //           <Button onClick={saveRecipe} type="submit">
  //             Save
  //           </Button>
  //         </div>
  //       </>
  //     ) : (
  //       <>
  //         <h2>{name}</h2>
  //         {html && (
  //           <div
  //             className="ProseMirror"
  //             dangerouslySetInnerHTML={{ __html: html }}
  //           />
  //         )}
  //         <div className="flex gap-1">
  //           {tags?.map((tag) => (
  //             <Tag tag={tag} key={tag.id} />
  //           ))}
  //         </div>

  //         <div className="flex justify-between">
  //           <button
  //             onClick={() => setEdit(true)}
  //             className="text-blue-500 text-sm"
  //           >
  //             Edit
  //           </button>
  //           <DeleteButton recipe={recipe} />
  //         </div>
  //       </>
  //     )}
  //   </div>
  // );
};

export default SingleRecipePage;
