import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { loginSchema } from "../validation";
import { LOGIN_FORM } from "../data";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useState } from "react";
import axiosInstance from "../config/axios.config";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { IErrorResponse } from "../interfaces";

interface IFormInput {
  identifier: string;
  password: string;
}

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({ resolver: yupResolver(loginSchema) });
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setIsLoading(true);
    try {
      const { status, data: resData } = await axiosInstance.post(
        "/auth/local/",
        data
      );
      if (status == 200) {
        localStorage.setItem("loggedInUser", JSON.stringify(resData));
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
          location.replace("/");
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
  return (
    <div className="flex flex-col gap-5 mt-16">
      <h1 className="text-center text-3xl font-medium">
        Login to get access !
      </h1>
      <form
        className="flex flex-col gap-10 max-md:w-full"
        onSubmit={handleSubmit(onSubmit)}>
        {LOGIN_FORM.map(({ placeholder, type, name }, i) => {
          return (
            <div
              key={i}
              className="flex relative max-md:w-full md:w-[450px] mx-auto">
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

export default Login;
