import { useForm } from "react-hook-form";
import { TNOte } from "../../../types/types";
import Form from "../../../common/utils/Form/Index";
import Input from "../../../common/utils/Input/Index";
import Textarea from "../../../common/utils/textarea";
import { useCallback, useEffect, useState } from "react";
import { updateNote } from "../../../db/db";
import { useDebouncedCallback } from "use-debounce";
import useNoteStore from "../../../store/store";

type TDefaultValues = {
  title: string;
  content: string;
};

const NoteInfo = () => {
  const { noteSelected } = useNoteStore();

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
        className="flex flex-col rounded-md p-4 relative shadow-md w-full 2xl:w-[70vw] mx-auto"
        style={{ backgroundColor: noteSelected?.setting?.theme.background }}
      >
        <Header />
        <span className="flex gap-4 font-bold text-xs w-full">
          <Input name="title" onChange={onChangeHandler} />
          <span className="centering text-xs text-black/25 w-10">
            {!isTyping && "Saved"}
          </span>
        </span>
        <Textarea
          name="content"
          rows={30}
          variant="note"
          placeholder="test"
          onChange={onChangeHandler}
        />
        <Footer
          createdAt={noteSelected?.createdAt || ""}
          id={noteSelected?.id}
        />
      </div>
    </Form>
  );
};

export default NoteInfo;

const Header = () => {
  const { setNoteSelected, fetchNotes } = useNoteStore();
  const closeHandler = () => {
    setNoteSelected(null);
    fetchNotes();
  };
  return (
    <div className="border-b border-b-gray-200 pb-2 ">
      <button
        className="text-lg bg-white hover:bg-blue-400 hover:text-white rounded-md transition-all  px-2 h-fit cursor-pointer"
        onClick={closeHandler}
      >
        &#x2715;
      </button>
    </div>
  );
};

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
    <span className="flex-between-center text-xs text-gray-700 text-end border-t border-gray-400 pt-2">
      <button
        onClick={removeHandler}
        className="centering cursor-pointer border border-gray-400 hover:bg-red-500 hover:text-white transition-all p-1 rounded-md "
      >
        حذف نوت !
      </button>
      {persianDate}
    </span>
  );
};
