import * as yup from "yup";

export const registerSchema = yup
  .object({
    username: yup
      .string()
      .required("Username is required")
      .min(4, "Username should be at least 4 characters"),
    email: yup
      .string()
      .required("Email is required")
      .email("Invalid email Format"),
    password: yup
      .string()
      .required("Password is required")
      .min(4, "Password should be at least 4 characters"),
  })
  .required();

export const loginSchema = yup
  .object({
    identifier: yup
      .string()
      .required("Username is required")
      .min(4, "Username should be at least 4 characters"),
    password: yup.string().required("Password is required"),
  })
  .required();
