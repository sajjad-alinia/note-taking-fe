import { TNOte } from "../../../types/types";

const NoteItem = ({ title, content, createdAt }: TNOte) => {
  return (
    <div className="flex flex-col bg-amber-400 rounded-md p-4">
      <span className="font-bold text-xs border-b pb-2 border-gray-400 w-full">
        {title}
      </span>
      <span className="text-sm py-2 h-52 overflow-y-auto ">{content}</span>
      <span className="text-xs text-gray-700 text-end border-t border-gray-400 pt-2">
        {String(createdAt)}
      </span>
    </div>
  );
};

export default NoteItem;
