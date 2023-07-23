"use client";

import Button from "../components/base/Button";
import Link from "next/link";
import TextInput from "../components/base/fields/TextInput";
import { PlusIcon } from "@heroicons/react/24/solid";
import { clientFetch } from "@/src/utilities/clientFetch";
import { useEffect, useState } from "react";
import { Recipe, Tag as TagProp } from "@/src/interfaces";
import Tag from "../components/base/Tag";

const API_BASE = "/api/recipes";

interface HomePageProps {
  preRenderRecipes: Recipe[];
}

const HomePage = ({ preRenderRecipes }: HomePageProps) => {
  const [search, setSearch] = useState<string>("");
  const [recipes, setRecipes] = useState<Recipe[]>(preRenderRecipes || []);

  const [tags, setTags] = useState<TagProp[]>([]);
  const [searchTags, setSearchTags] = useState<TagProp[]>([]);

  const getSearchTags = () => {
    clientFetch
      .get(`/api/tags${!!search ? `?search=${search}` : ""}`)
      .then((response) => {
        if (!!response.data) {
          let preFilterSearchTags = response.data;
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
    let searchUrl = API_BASE;
    let tagIds = tags?.reduce((ids, tag, index) => {
      if (index == tags.length - 1) {
        return (ids += `${tag.id}`);
      } else {
        return (ids += `${tag.id},`);
      }
    }, "");
    if (!!search && !!tagIds) searchUrl += `?search=${search}&tagIds=${tagIds}`;
    else if (!!search) searchUrl += `?search=${search}`;
    else if (!!tagIds) searchUrl += `?tagIds=${tagIds}`;
    clientFetch.get(searchUrl).then((response) => {
      setRecipes(response.data);
    });
  };

  useEffect(() => {
    getSearchTags();
    getRecipes();
    const findTag = searchTags.find((tag) => {
      return tag.name.toLowerCase() === search.toLowerCase();
    });
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
      <div className="flex gap-2 justify-between">
        <div className="flex-1">
          <TextInput
            value={search}
            setValue={setSearch}
            inputClassName="w-full placeholder:text-sm text-sm py-1.5"
            placeholder="Search..."
          />
          <div className="flex items-center gap-1 text-sm py-1">
            {tags?.map((tag) => (
              <Tag
                tag={tag}
                key={tag.id}
                onClick={removeTag}
                className="cursor-pointer"
              />
            ))}
            {!!searchTags && searchTags.length > 0 && (
              <>
                <span>Add Filter </span>
                {searchTags?.map((tag) => (
                  <Tag
                    tag={tag}
                    key={tag.id}
                    className="cursor-pointer"
                    onClick={(tag) => setTags([...tags, tag])}
                  />
                ))}
              </>
            )}
          </div>
        </div>

        <Button href="/new" className="px-2">
          <PlusIcon className="h-5 w-5" />
        </Button>
      </div>
      <div className="py-5 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-5 ">
        {recipes.map((recipe: Recipe) => (
          <Link
            className="border-2 border-black rounded-lg h-48 w-48 flex justify-center items-center hover:border-black/80 text-black/80"
            href={`/recipes/${recipe.id}`}
            key={recipe.id}
          >
            <div>{recipe.name}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
