import useNoteStore from "../../store/store";
import NoteInfo from "./components/note-info/NoteInfo";

const Dashboard = () => {
  const { noteSelected } = useNoteStore();

  return (
    <div className="w-full">
      {noteSelected ? (
        <NoteInfo />
      ) : (
        <div className="p-5 bg-blue-300 rounded-md w-fit mx-auto">
          <p>از لیست سمت راست نوت انتخاب کن یا یک نوت جدید ایجاد کن :)</p>
        </div>
      )}
    </div>
  );
};
export default Dashboard;
