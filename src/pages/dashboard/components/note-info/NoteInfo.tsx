import { useCallback, useEffect, useState } from "react";
// react-hook-form
import { useForm } from "react-hook-form";
// common
import Form from "../../../../common/utils/Form/Index";
import Input from "../../../../common/utils/Input/Index";
import TiptapEditor from "../../../../common/general/TipTap";
// db
import { updateNote } from "../../../../db/db";
// use-debounce
import { useDebouncedCallback } from "use-debounce";
// store
import useNoteStore from "../../../../store/store";
// components
import NoteColor from "./NoteColor";
import NoteSaved from "./NoteSaved";
import Footer from "./Footer";

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
        <div className="flex-start-center gap-2 pb-2 border-b border-b-secondary ">
          <button
            className="text-lg bg-primary hover:scale-105 text-text  rounded-md transition-all px-2 h-fit cursor-pointer"
            onClick={closeHandler}
          >
            &#x2715;
          </button>
          <Input
            name="title"
            placeholder="عنوان نداره !"
            onChange={onChangeHandler}
          />
          <NoteSaved isTyping={isTyping} />
          <NoteColor />
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
