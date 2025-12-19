import { useForm } from "react-hook-form";
import { TNOte } from "../../../types/types";
import Form from "../../../common/utils/Form/Index";
import Input from "../../../common/utils/Input/Index";
import { useCallback, useEffect, useState } from "react";
import { updateNote } from "../../../db/db";
import { useDebouncedCallback } from "use-debounce";
import useNoteStore from "../../../store/store";
import TiptapEditor from "../../../common/general/TipTap";

type TDefaultValues = {
  title: string;
  content: string;
};

const NoteInfo = () => {
  const { noteSelected, setNoteSelected, fetchNotes } = useNoteStore();

  const closeHandler = useCallback(() => {
    setNoteSelected(null);
    fetchNotes();
  }, [setNoteSelected, fetchNotes]);

  const defaultValues: TDefaultValues = {
    title: noteSelected?.title || "",
    content: noteSelected?.content || "",
  };
  const methods = useForm({ defaultValues });
  const [isTyping, setIsTyping] = useState(false);

  const autoSave = useDebouncedCallback(() => {
    const title = methods.getValues("title");
    const content = methods.getValues("content");
    if (isTyping && noteSelected?.id) {
      updateNote(noteSelected.id, { title, content });
      setIsTyping(false);
    }
  }, 2000);

  const onChangeHandler = () => {
    if (!isTyping) {
      setIsTyping(true);
    }
    autoSave();
  };

  useEffect(() => {
    methods.reset({
      title: noteSelected?.title || "",
      content: noteSelected?.content || "",
    });
  }, [noteSelected, methods]);

  return (
    <Form methods={methods}>
      <div
        className={`flex flex-col rounded-md p-4 relative shadow-md w-full 2xl:w-[70vw] mx-auto h-[60vh] ${noteSelected?.setting?.theme.background}`}
      >
        <div className="flex gap-2 border-b border-b-secondary ">
          <button
            className="text-lg bg-primary hover:scale-105 text-text  rounded-md transition-all  px-2 h-fit cursor-pointer"
            onClick={closeHandler}
          >
            &#x2715;
          </button>
          <Input
            name="title"
            placeholder="عنوان نداره !"
            onChange={onChangeHandler}
          />
          <span
            className={`centering text-xs text-text w-10 h-fit shadow-sm rounded-md px-1.5 py-1 ${
              isTyping ? "bg-yellow-600 animate-bounce" : "bg-green-500"
            }`}
          >
            Saved
          </span>
        </div>

        <TiptapEditor name="content" rows={9} onChange={onChangeHandler} />
        <Footer
          createdAt={noteSelected?.createdAt || ""}
          id={noteSelected?.id}
        />
      </div>
    </Form>
  );
};

export default NoteInfo;

type TFooter = Pick<TNOte, "createdAt" | "id">;

const Footer = ({ id, createdAt }: TFooter) => {
  const { removeNote } = useNoteStore();
  const createdAtOriginal = new Date(createdAt);

  const formatter = new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  const persianDate = formatter.format(createdAtOriginal);

  const removeHandler = useCallback(() => {
    if (confirm("حذف شود؟") && id) {
      removeNote(id);
    }
  }, [removeNote, id]);

  return (
    <span className="flex-between-center w-full text-xs text-gray-700 text-end border-t border-secondary pt-2">
      <button
        onClick={removeHandler}
        className="centering cursor-pointer border border-secondary hover:bg-red-500 hover:text-white transition-all p-1 rounded-md "
      >
        حذف نوت !
      </button>
      {persianDate}
    </span>
  );
};
