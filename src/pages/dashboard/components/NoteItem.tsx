import { useForm } from "react-hook-form";
import { TNOte } from "../../../types/types";
import Form from "../../../common/utils/Form/Index";
import Input from "../../../common/utils/Input/Index";
import Textarea from "../../../common/utils/textarea";
import { useCallback, useState } from "react";
import { updateNote } from "../../../db/db";
import { useDebouncedCallback } from "use-debounce";
import useNoteStore from "../../../store/store";

type TDefaultValues = {
  title: string;
  content: string;
};

const NoteItem = ({ title, content, createdAt, id, setting }: TNOte) => {
  const defaultValues: TDefaultValues = {
    title: title,
    content: content,
  };
  const methods = useForm({ defaultValues });
  const [isTyping, setIsTyping] = useState(false);

  const autoSave = useDebouncedCallback(() => {
    const title = methods.getValues("title");
    const content = methods.getValues("content");
    if (isTyping && id) {
      updateNote(id, { title, content });
      setIsTyping(false);
    }
  }, 2000);

  const onChangeHandler = () => {
    if (!isTyping) {
      setIsTyping(true);
    }
    autoSave();
  };

  return (
    <Form methods={methods}>
      <div
        className="flex flex-col rounded-md p-4 relative shadow-md"
        style={{ backgroundColor: setting?.theme.background }}
      >
        <span className="flex gap-4 font-bold text-xs w-full">
          <Input name="title" onChange={onChangeHandler} />
          <span className="centering text-xs text-black/25 w-10">
            {!isTyping && "Saved"}
          </span>
        </span>
        <Textarea
          name="content"
          rows={10}
          variant="note"
          placeholder="test"
          onChange={onChangeHandler}
        />
        <Footer createdAt={createdAt} id={id} />
      </div>
    </Form>
  );
};

export default NoteItem;

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
        className="centering cursor-pointer border border-gray-400 hover:bg-red-500 hover:text-white transition-all rounded-full w-5 h-5"
      >
        &#x2715;
      </button>
      {persianDate}
    </span>
  );
};
