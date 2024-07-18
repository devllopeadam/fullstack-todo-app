export interface IRegisterInput {
  placeholder: string;
  type: string;
  name: "username" | "email" | "password";
}

export interface ILoginInput {
  placeholder: string;
  type: string;
  name: "identifier" | "password";
}

export interface IErrorResponse {
  error: {
    details?: {
      errors: {
        message: string;
      }[];
    };
    message?: string;
  };
}

export interface ITodo {
  id: number;
  title: string;
  content: string;
}
