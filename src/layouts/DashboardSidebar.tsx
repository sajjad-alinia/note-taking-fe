import useNoteStore from "../store/store";
import { TNOte } from "../types/types";

const DashboardSidebar = () => {
  const { createNote } = useNoteStore();

  const createHandler = async () => {
    const date = new Date().toISOString();
    const data: TNOte = {
      title: "عنوان نوت",
      content:
        "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد وزمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.",
      createdAt: date,
      updatedAt: date,
    };
    await createNote(data);
  };

  return (
    <div className="min-w-2/12 h-full border-l border-slate-300 p-3">
      <button
        onClick={() => createHandler()}
        className="w-full p-3 bg-orange-600 text-white rounded-md "
      >
        یادداشت جدید
      </button>
    </div>
  );
};

export default DashboardSidebar;
