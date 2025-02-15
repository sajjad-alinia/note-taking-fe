// react hook form
import { useForm } from "react-hook-form";
// utils
import Form from "../../../common/utils/Form/Index";
import Input from "../../../common/utils/Input/Index";
import { register } from "../../../services/auth.service";
import { toast } from "react-toastify";

type TDefaultValues = {
  fullname: string;
  email: string;
  password: string;
};

const defaultValues: TDefaultValues = {
  email: "",
  fullname: "",
  password: "",
};

const Register = () => {
  const methods = useForm({ defaultValues });

  const handleSubmit = (data: TDefaultValues) => {
    const finalData = { ...data, passwordConfirm: data.password };
    register(finalData)
      .then(() => toast.success("ثبت نام انجام شد لطفا وارد شوید"))
      .catch((error) => console.error(error));
  };

  return (
    <div className="centering h-full">
      <div className="w-[90%] md:w-[20%] mx-auto bg-white shadow-2xl rounded-xl py-16 px-8">
        <Form methods={methods} submitHandler={handleSubmit}>
          <div>
            <Input
              name="fullname"
              label="نام و نام خانوادگی"
              rules={{ required: { value: true, message: "فیلد اجباری" } }}
            />
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

export default Register;
