import { Placeholder } from "@tiptap/extensions";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";

interface TiptapEditorProps {
  name: string;
  rows?: number;
  onChange?: (value: string) => void;
}

const TiptapEditor = ({ name, onChange, ...props }: TiptapEditorProps) => {
  const { control, watch, setValue } = useFormContext();
  const content = watch(name);
  const lastHtmlRef = useRef<string | null>(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "یه چیزی بنویس ...",
      }),
    ],
    content: "",
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();

      if (lastHtmlRef.current !== html) {
        setValue(name, html, { shouldDirty: true });
        onChange?.(html);
        lastHtmlRef.current = html;
      }
    },
  });

  // Sync with new content from react-hook-form
  useEffect(() => {
    if (editor && typeof content === "string") {
      const currentHtml = editor.getHTML();
      if (content !== currentHtml) {
        editor.commands.setContent(content ?? "");
        lastHtmlRef.current = content;
      }
    }
  }, [content, editor]);

  return (
    <>
      <style>{`.ProseMirror:focus, .ProseMirror:focus-visible { outline: none !important; box-shadow: none !important; }`}</style>
      <Controller
        name={name}
        control={control}
        render={() => (
          <EditorContent
            editor={editor}
            className="prose min-w-full p-3 h-full max-h-full overflow-y-auto focus:outline-none focus:ring-0 focus-visible:outline-none"
            {...props}
          />
        )}
      />
    </>
  );
};

export default TiptapEditor;
