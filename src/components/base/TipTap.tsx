"use client";

import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { Dispatch, SetStateAction } from "react";
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
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setValue(html);
    },
  });

  return (
    <div className="border-2 border-black rounded-xl p-5">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} className="pt-2" />
    </div>
  );
};

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null;
  }

  return (
    <>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={clsx(
          "tiptap-button",
          editor.isActive("bold") ? "is-active" : "not-active"
        )}
      >
        bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={clsx(
          "tiptap-button",
          editor.isActive("italic") ? "is-active" : "not-active"
        )}
      >
        italic
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={clsx(
          "tiptap-button",
          editor.isActive("strike") ? "is-active" : "not-active"
        )}
      >
        strike
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={clsx(
          "tiptap-button",
          editor.isActive("code") ? "is-active" : "not-active"
        )}
      >
        code
      </button>
      <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
        clear marks
      </button>
      <button onClick={() => editor.chain().focus().clearNodes().run()}>
        clear nodes
      </button>
      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={clsx(
          "tiptap-button",
          editor.isActive("paragraph") ? "is-active" : "not-active"
        )}
      >
        paragraph
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={clsx(
          "tiptap-button",
          editor.isActive("heading", { level: 1 }) ? "is-active" : "not-active"
        )}
      >
        h1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={clsx(
          "tiptap-button",
          editor.isActive("heading", { level: 2 }) ? "is-active" : "not-active"
        )}
      >
        h2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={clsx(
          "tiptap-button",
          editor.isActive("heading", { level: 3 }) ? "is-active" : "not-active"
        )}
      >
        h3
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={clsx(
          "tiptap-button",
          editor.isActive("heading", { level: 4 }) ? "is-active" : "not-active"
        )}
      >
        h4
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={clsx(
          "tiptap-button",
          editor.isActive("heading", { level: 5 }) ? "is-active" : "not-active"
        )}
      >
        h5
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={clsx(
          "tiptap-button",
          editor.isActive("heading", { level: 6 }) ? "is-active" : "not-active"
        )}
      >
        h6
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={clsx(
          "tiptap-button",
          editor.isActive("bulletList") ? "is-active" : "not-active"
        )}
      >
        bullet list
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={clsx(
          "tiptap-button",
          editor.isActive("orderedList") ? "is-active" : "not-active"
        )}
      >
        ordered list
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={clsx(
          "tiptap-button",
          editor.isActive("codeBlock") ? "is-active" : "not-active"
        )}
      >
        code block
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={clsx(
          "tiptap-button",
          editor.isActive("blockquote") ? "is-active" : "not-active"
        )}
      >
        blockquote
      </button>
      <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        horizontal rule
      </button>
      <button onClick={() => editor.chain().focus().setHardBreak().run()}>
        hard break
      </button>
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
      >
        undo
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
      >
        redo
      </button>
      <button
        onClick={() => editor.chain().focus().setColor("#958DF1").run()}
        className={
          editor.isActive("textStyle", { color: "#958DF1" })
            ? "is-active"
            : "not-active"
        }
      >
        purple
      </button>
    </>
  );
};

export default TipTap;
