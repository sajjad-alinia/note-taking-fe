import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 justify-center max-w-[1440px] mx-auto ">
      <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full -translate-y-1/2 translate-x-1/2 bg-blue-500/15"></div>
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full translate-y-1/2 -translate-x-1/2 bg-blue-500/15"></div>
      <div className="flex flex-col justify-end md:justify-center gap-10 p-7">
        <h1 className="font-bold text-5xl text-blue-600">یادداشت کن!</h1>
        <h2 className="font-semibold text-lg text-gray-600">
          دارم سعی میکنم یک دفترچه یادداشت امن ایجاد کنم.
        </h2>
        <div className="flex gap-2.5">
          <NavLink
            to={"/auth/login"}
            className={
              "outline-1 outline-blue-500 px-2.5 py-1.5 rounded-md hover:bg-blue-500 hover:text-white transition"
            }
          >
            ورود
          </NavLink>
          <NavLink
            to={"/auth/register"}
            className={
              "outline-1 outline-blue-500 px-2.5 py-1.5 rounded-md hover:bg-blue-500 hover:text-white transition "
            }
          >
            ثبت نام
          </NavLink>
        </div>
      </div>
      <div className="centering h-full ">
        <img
          src="/images/note-taking.webp"
          alt="note-taking"
          className="object-cover w-[60%] rounded-3xl hover:-rotate-12 transition-transform duration-700 shadow-md "
        />
      </div>
    </div>
  );
};

export default Home;
