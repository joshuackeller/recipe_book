"use client";

import Link from "next/link";
import TextInput from "../components/base/fields/TextInput";
import { BeakerIcon, WrenchScrewdriverIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { Recipe, Tag as TagProp } from "@/src/interfaces";
import Tag from "../components/base/Tag";
import useGetRecipes, {
  GetRecipes,
} from "../apiCalls/queries/recipes/useGetRecipes";
import useGetTags, { GetTags } from "../apiCalls/queries/tags/useGetTags";

interface HomePageProps {}

const HomePage = ({}: HomePageProps) => {
  const { data: tagsData } = useGetTags();
  const { data: recipesData } = useGetRecipes();

  const [search, setSearch] = useState<string>("");

  const [recipes, setRecipes] = useState<Recipe[]>(recipesData || []);
  const [tags, setTags] = useState<TagProp[]>([]);

  const [searchTags, setSearchTags] = useState<TagProp[]>(tagsData || []);

  const getSearchTags = () => {
    GetTags({ search }).then((response) => {
      if (!!response) {
        let preFilterSearchTags = response;
        const newSearchTags = preFilterSearchTags.filter((searchTag: any) => {
          if (!!tags && tags.length > 0) {
            const index = tags.findIndex(
              (tag) => tag.name === searchTag.name || tag.id === searchTag.id
            );
            if (index === -1) return true;
            else return false;
          } else {
            return true;
          }
        });
        setSearchTags(newSearchTags);
      }
    });
  };

  const getRecipes = () => {
    GetRecipes({ search, tagIds: tags?.map((tag) => tag.id) }).then(
      (response) => {
        setRecipes(response);
      }
    );
  };

  useEffect(() => {
    getSearchTags();
    getRecipes();
  }, [search, tags]);

  const removeTag = (tag: TagProp) => {
    const preDeleteTags = JSON.parse(JSON.stringify(tags));
    const tagId = preDeleteTags.find(
      (preDeleteTag: any) => preDeleteTag.id === tag.id
    );
    if (tagId !== -1) preDeleteTags.splice(tagId, 1);
    setTags(preDeleteTags);
  };

  return (
    <div>
      <div className="flex items-center gap-2 justify-between">
        <TextInput
          value={search}
          setValue={setSearch}
          className="w-full"
          inputClassName="w-full placeholder:text-sm text-sm py-1.5"
          placeholder="Search..."
        />
        <div className="p-2">
          <Link href="/settings">
            <WrenchScrewdriverIcon className="h-5 w-5 " />
          </Link>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-1 text-sm py-2">
        {tags?.map((tag) => (
          <Tag
            tag={tag}
            key={tag.id}
            onClick={removeTag}
            className="cursor-pointer "
          />
        ))}
        {!!searchTags && searchTags.length > 0 && (
          <>
            <span>Add Filters </span>
            {searchTags?.map((tag) => (
              <Tag
                tag={tag}
                key={tag.id}
                className="cursor-pointer bg-black/70 hover:bg-black"
                onClick={(tag) => {
                  setTags([...tags, tag]);
                  setSearch("");
                }}
              />
            ))}
          </>
        )}
      </div>

      <div className="py-5 flex flex-wrap gap-5">
        <Link
          href="/new"
          className="border-2 border-black bg-black rounded-lg h-[150px] max-w-[150px] w-full flex justify-center items-center hover:border-black/80 text-black/80"
        >
          <BeakerIcon className="h-10 w-10 text-white" />
        </Link>
        {recipes?.map((recipe: Recipe) => (
          <Link
            className="border-2 border-black rounded-lg h-[150px] max-w-[150px] w-full flex justify-center items-center hover:border-black/80 text-black/80 p-1"
            href={`/recipes/${recipe.id}`}
            key={recipe.id}
          >
            <div className="text-center line-clamp-3">{recipe.name}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
