import { useState } from "react";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useForm, SubmitHandler } from "react-hook-form";
import { REGISTER_FORM } from "../data";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../validation";
import axiosInstance from "../config/axios.config";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { IErrorResponse } from "../interfaces";

interface IFormInput {
  username: string;
  email: string;
  password: string;
}

const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({ resolver: yupResolver(registerSchema) });

  // * FORM SUBMISSION HANDLER
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setIsLoading(true);
    try {
      const { status } = await axiosInstance.post("/auth/local/register", data);
      if (status == 200) {
        toast.success("Registration successfully", {
          position: "bottom-center",
          duration: 1500,
          style: {
            backgroundColor: "white",
            color: "black",
            width: "fit-content",
          },
        });
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    } catch (error) {
      const errorObj = error as AxiosError<IErrorResponse>;
      toast.error(`${errorObj.response?.data.error.message}`, {
        position: "bottom-center",
        duration: 4000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // * RENDERING
  return (
    <div className="flex flex-col gap-5 mt-16">
      <h1 className="text-center text-3xl font-medium mb-2">
        Register to get access !
      </h1>
      <form
        className="flex flex-col gap-10 max-md:w-full"
        onSubmit={handleSubmit(onSubmit)}>
        {REGISTER_FORM.map(({ name, placeholder, type }) => {
          return (
            <div
              className="flex relative max-md:w-full md:w-[450px] mx-auto"
              key={name}>
              <Input
                placeholder={placeholder}
                type={type}
                {...register(name)}
              />
              {errors[name] && (
                <div className="text-red-500 font-semibold absolute -bottom-[25px] right-0">
                  {errors[name]?.message}
                </div>
              )}
            </div>
          );
        })}
        <Button
          className="md:w-[450px] flex items-center mx-auto"
          isLoading={isLoading}>
          {isLoading ? "Loading... " : "Register"}
        </Button>
      </form>
    </div>
  );
};

export default Register;
