import { ILoginInput, IRegisterInput } from "../interfaces";

export const REGISTER_FORM: IRegisterInput[] = [
  {
    placeholder: "Username",
    type: "text",
    name: "username",
  },
  {
    placeholder: "Email",
    type: "text",
    name: "email",
  },
  {
    placeholder: "Password",
    type: "password",
    name: "password",
  },
];

export const LOGIN_FORM: ILoginInput[] = [
  {
    placeholder: "Username",
    type: "text",
    name: "identifier",
  },
  {
    placeholder: "Password",
    type: "password",
    name: "password",
  },
];
