"use client";

import { clientFetch } from "@/src/utilities/clientFetch";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import TextInput from "./TextInput";
import Tag from "../Tag";
import { Tag as TagProp } from "@/src/interfaces";

interface AddTagsProps {
  tags: TagProp[];
  setTags: Dispatch<SetStateAction<TagProp[]>>;
  recipeId?: number;
}

const AddTags = ({ recipeId, tags, setTags }: AddTagsProps) => {
  const [searchTags, setSearchTags] = useState<TagProp[]>([]);
  const [search, setSearch] = useState<string>("");
  const [existingSearchTag, setExistingSearchTag] = useState<
    TagProp | undefined
  >();

  const getSearchTags = () => {
    clientFetch
      .get(`/tags${!!search ? `?search=${search}` : ""}`)
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

  useEffect(() => {
    getSearchTags();
    const findTag = searchTags.find((tag) => {
      return tag.name.toLowerCase() === search.toLowerCase();
    });
    setExistingSearchTag(findTag);
  }, [search, tags]);

  const createTag = () => {
    if (recipeId) {
      clientFetch.post("/tags", {
        name: search,
        recipeId,
      });
    }
    setTags([
      ...tags,
      {
        id: tags.length + 100000,
        name: search,
        userId: 1,
      },
    ] as any);

    setSearch("");
  };

  const addTag = (tag: TagProp) => {
    if (recipeId) {
      clientFetch.post(`/recipes/${recipeId}/tags/${tag.id}`);
    }
    setTags([
      ...tags,
      {
        id: tag.id,
        name: tag.name,
      },
    ] as any);
    setSearch("");
  };

  const removeTag = (tag: TagProp) => {
    if (recipeId) {
      clientFetch.delete(`/recipes/${recipeId}/tags/${tag.id}`);
    }
    const preDeleteTags = JSON.parse(JSON.stringify(tags));
    const tagId = preDeleteTags.find(
      (preDeleteTag: any) => preDeleteTag.id === tag.id
    );
    if (tagId !== -1) preDeleteTags.splice(tagId, 1);
    setTags(preDeleteTags);
  };

  return (
    <div className="sm:flex flex-wrap gap-2 items-center">
      <div className="my-2 sm:my-0">
        <TextInput
          value={search}
          setValue={setSearch}
          onKeyDown={(e) => {
            if (e.code === "Enter") {
              if (!!existingSearchTag) {
                addTag(existingSearchTag);
              } else {
                createTag();
              }
            }
          }}
          inputClassName="placeholder:text-sm"
          placeholder="Search tags..."
        />
      </div>

      <div className="flex items-center gap-1 flex-wrap text-sm">
        {tags?.map((tag) => (
          <div
            onClick={() => removeTag(tag)}
            className="cursor-pointer w-min"
            key={tag.id}
          >
            <Tag tag={tag} />
          </div>
        ))}
        {!!searchTags && searchTags.length > 0 && (
          <div className="text-sm">
            Add
            {searchTags.map((tag) => (
              <span
                onClick={() => addTag(tag)}
                className="ml-1 text-sm text-white bg-black rounded px-1.5 py-0.5 cursor-pointer"
                key={tag.id}
              >
                {tag.name}
              </span>
            ))}
          </div>
        )}
        {!!search && !!search && !existingSearchTag && (
          <div onClick={() => createTag()} className="text-sm cursor-pointer">
            Create
            <span className="ml-1 text-sm text-white bg-black rounded px-1.5 py-0.5">
              {search}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddTags;
