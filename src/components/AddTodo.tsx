import { useState } from "react";
import Modal from "./ui/Modal";
import { SubmitHandler, useForm } from "react-hook-form";
import Input from "./ui/Input";
import Textarea from "./ui/Textarea";
import Button from "./ui/Button";
import axiosInstance from "../config/axios.config";
import { userData } from "../userData";

interface IPostForm {
  title: string;
  content: string;
}

interface IProps {
  setQueryVersion: React.Dispatch<React.SetStateAction<number>>;
}

const AddTodo: React.FC<IProps> = ({ setQueryVersion }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IPostForm>();
  const [isOpenPost, setIsOpenPost] = useState(false);
  const closeOpenPost = () => {
    setIsOpenPost(false);
    setTodo({ title: "", content: "" });
  };
  const [isCreating, setIsCreating] = useState(false);
  const [todo, setTodo] = useState<IPostForm>({ title: "", content: "" });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTodo({ ...todo, [name]: value });
  };

  const onSubmit: SubmitHandler<IPostForm> = async () => {
    setIsCreating(true);
    try {
      const { title, content } = todo;
      const { status } = await axiosInstance.post(
        "/todos/",
        {
          data: { title, content, user: [userData.user.id] },
        },
        {
          headers: {
            Authorization: `Bearer ${userData?.jwt}`,
          },
        }
      );
      if (status === 200) {
        closeOpenPost();
        setQueryVersion((prev: number) => prev + 1);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsCreating(false);
    }
  };
  return (
    <>
      <button
        onClick={() => setIsOpenPost(true)}
        className="text-white bg-blue-700 py-2 px-3 rounded-md shadow-lg duration-300 transition-all hover:bg-blue-600">
        Post New Todo
      </button>
      <Modal
        isOpen={isOpenPost}
        closeModal={closeOpenPost}
        title={"Post new todo"}>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-7">
            <div className="flex relative w-full mx-auto">
              <Input
                {...register("title", {
                  required: "Title is required",
                })}
                value={todo.title}
                onChange={handleChange}
              />
              {errors["title"] && (
                <div className="text-red-500 text-[13px] font-semibold absolute -bottom-[22px] right-0">
                  {errors["title"]?.message}
                </div>
              )}
            </div>
            <div className="flex relative w-full mx-auto">
              <Textarea
                {...register("content", {
                  required: "Description is required",
                })}
                value={todo.content}
                onChange={handleChange}
              />
              {errors["content"] && (
                <div className="text-red-500 text-[13px] font-semibold absolute -bottom-[22px] right-0">
                  {errors["content"]?.message}
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              className="px-4 py-2"
              isLoading={isCreating}>
              Post
            </Button>
            <button
              type="button"
              onClick={closeOpenPost}
              className="text-black font-medium bg-gray-200 px-4 py-2 rounded-lg transition-all duration-300 hover:bg-gray-300">
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default AddTodo;
