// react hook form
import { useForm } from "react-hook-form";
// utils
import Input from "../../../common/utils/Input/Index";
import Form from "../../../common/utils/Form/Index";
// service
import { login } from "../../../services/auth.service";
// router
import { useNavigate } from "react-router-dom";

type TDefaultValues = {
  email: string;
  password: string;
};

const defaultValues: TDefaultValues = {
  email: "",
  password: "",
};

const Login = () => {
  const methods = useForm({ defaultValues });
  const navigate = useNavigate();

  const handleSubmit = (data: TDefaultValues) => {
    const { email, ...rest } = data;
    const finalData = { identity: email, ...rest };
    login(finalData)
      .then((data) => {
        localStorage.setItem("token", data.data.token);
        navigate("/dashboard/");
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="centering h-full">
      <div className="w-[90%] md:w-[20%] mx-auto bg-white shadow-2xl rounded-xl py-16 px-8">
        <Form methods={methods} submitHandler={handleSubmit}>
          <div>
            <Input
              name="email"
              label="ایمیل"
              rules={{ required: { value: true, message: "فیلد اجباری" } }}
            />
            <Input
              name="password"
              label="رمز عبور"
              rules={{ required: { value: true, message: "فیلد اجباری" } }}
            />
            <button
              type="submit"
              className="w-full p-2 cursor-pointer text-white bg-blue-500 rounded-md"
            >
              ثبت نام
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
