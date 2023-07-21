"use client";

import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { Dispatch, ReactNode, SetStateAction } from "react";
import clsx from "clsx";

interface TipTapProps {
  value?: string;
  setValue: Dispatch<SetStateAction<string>>;
}

const TipTap = ({ value, setValue }: TipTapProps) => {
  const editor = useEditor({
    extensions: [
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      // @ts-ignore
      TextStyle.configure({ types: [ListItem.name] }),
      TextStyle,
      StarterKit.configure({
        // bulletList: {
        //   keepMarks: true,
        //   keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        // },
        // orderedList: {
        //   keepMarks: true,
        //   keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        // },
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setValue(html);
    },
  });

  return (
    <div className="border-2 border-black rounded-lg p-5">
      <MenuBar editor={editor} />
      <div className="h-0.5 bg-black w-full my-2" />
      <EditorContent
        editor={editor}
        className="pt-2 ring-0 focus:ring-0 outline-none"
      />
    </div>
  );
};

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null;
  }

  return (
    <>
      <TipTapButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        active={editor.isActive("bold")}
      >
        bold
      </TipTapButton>
      <TipTapButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        active={editor.isActive("italic")}
      >
        italic
      </TipTapButton>
      <TipTapButton
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        active={editor.isActive("strike")}
      >
        strike
      </TipTapButton>

      <TipTapButton
        onClick={() => editor.chain().focus().setParagraph().run()}
        active={editor.isActive("paragraph")}
      >
        paragraph
      </TipTapButton>
      <TipTapButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        active={editor.isActive("heading", { level: 1 })}
      >
        h1
      </TipTapButton>
      <TipTapButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        active={editor.isActive("heading", { level: 2 })}
      >
        h2
      </TipTapButton>
      <TipTapButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        active={editor.isActive("heading", { level: 3 })}
      >
        h3
      </TipTapButton>

      <TipTapButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        active={editor.isActive("bulletList")}
      >
        bullet list
      </TipTapButton>
      <TipTapButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        active={editor.isActive("orderedList")}
      >
        ordered list
      </TipTapButton>

      <TipTapButton
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
      >
        horizontal rule
      </TipTapButton>
      <TipTapButton
        onClick={() =>
          editor
            .chain()
            .focus()
            .insertContent(`<span style="">&deg;</span>`)
            .run()
        }
      >
        temp
      </TipTapButton>
    </>
  );
};

interface TipTapButtonProps {
  onClick: () => any;
  children: ReactNode;
  active?: boolean;
  className?: string;
  disabled?: boolean;
}

const TipTapButton = ({
  onClick,
  children,
  active,
  className,
  disabled,
}: TipTapButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "p-1 border-2 rounded-lg m-1",
        className,
        active ? "border-black text-black" : "border-black/60 text-black/60"
      )}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default TipTap;
