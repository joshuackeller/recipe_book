import { Tag } from "@/src/interfaces";
import clsx from "clsx";

interface TagProps {
  tag: Tag;
  onClick?: (tag: Tag) => any;
  className?: string;
}

const Tag = ({ tag, onClick, className }: TagProps) => {
  return (
    <div
      onClick={() => {
        if (!!onClick) {
          onClick(tag);
        }
      }}
      className={clsx(
        "text-sm text-white bg-black rounded px-1.5 py-0.5",
        className
      )}
    >
      {tag.name}
    </div>
  );
};

export default Tag;
