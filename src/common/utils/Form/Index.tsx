import { FieldValues, FormProvider } from "react-hook-form";
import TForm from "./types";

const Form = <T extends FieldValues>({
  methods,
  children,
  submitHandler,
}: TForm<T>) => {
  return (
    <FormProvider {...methods}>
      <form
        className="flex flex-col gap-4"
        onSubmit={methods.handleSubmit(
          submitHandler ? submitHandler : (data) => console.log(data)
        )}
      >
        {children}
      </form>
    </FormProvider>
  );
};

export default Form;
