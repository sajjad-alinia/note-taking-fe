import { useCallback } from "react";
import useNoteStore from "../../../../store/store";
import { TNOte } from "../../../../types/types";
import DateTranslator from "../../../../common/utils/DateTranslator";

type TFooter = Pick<TNOte, "createdAt" | "id">;

const Footer = ({ createdAt, id }: TFooter) => {
  const { removeNote, setNoteSelected } = useNoteStore();

  const removeHandler = useCallback(() => {
    if (confirm("حذف شود؟") && id) {
      removeNote(id);
      setNoteSelected(null);
    }
  }, [removeNote, setNoteSelected, id]);

  return (
    <span className="flex-between-center w-full text-xs text-gray-700 text-end border-t border-secondary pt-2">
      <button
        onClick={removeHandler}
        className="centering cursor-pointer border border-secondary hover:bg-red-500 hover:text-white transition-all p-1 rounded-md "
      >
        حذف نوت !
      </button>
      <DateTranslator date={createdAt} />
    </span>
  );
};

export default Footer;
