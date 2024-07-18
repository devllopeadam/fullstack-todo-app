import { motion } from "framer-motion";
import { userData } from "../userData";
import useAuthenticatedQuery from "../hooks/useAuthenticatedQuery";
import Modal from "./ui/Modal";
import { useState } from "react";
import axiosInstance from "../config/axios.config";
import { ITodo } from "../interfaces";
import Input from "./ui/Input";
import Textarea from "./ui/Textarea";
import Button from "./ui/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import Skeleton from "./ui/Skeleton";
import AddTodo from "./AddTodo";
import ButtonSkeleton from "./ui/ButtonSkeleton";

interface IUpdateForm {
  title: string;
  content: string;
}

const TodoList = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUpdateForm>();
  const [queryVersion, setQueryVersion] = useState(1);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [todoToEdit, setTodoToEdit] = useState<ITodo>({
    id: 0,
    title: "",
    content: "",
  });
  const closeDeleteModal = () => {
    setIsOpenDelete(false);
    setTodoToEdit({ id: 0, title: "", content: "" });
  };
  const closeUpdateModal = () => {
    setTodoToEdit({
      id: 0,
      title: "",
      content: "",
    });
    setIsOpenUpdate(false);
  };
  const openUpdateModal = (todo: ITodo) => {
    setTodoToEdit(todo);
    console.log(todo);
    setIsOpenUpdate(true);
  };
  const openDeleteModal = (todo: ITodo) => {
    setTodoToEdit(todo);
    setIsOpenDelete(true);
  };

  const hanldeOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = e.target;
    setTodoToEdit({ ...todoToEdit, [name]: value });
  };

  const onSubmitUpdate: SubmitHandler<IUpdateForm> = async () => {
    setIsUpdating(true);
    try {
      const { status } = await axiosInstance.put(
        `/todos/${todoToEdit.id}`,
        { data: todoToEdit },
        {
          headers: {
            Authorization: `Bearer ${userData?.jwt}`,
          },
        }
      );
      if (status === 200) {
        closeUpdateModal();
        setQueryVersion((prev) => prev + 1);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsUpdating(false);
    }
  };

  const { data: todos, isLoading } = useAuthenticatedQuery({
    queryKey: ["todolist", `${queryVersion}`],
    url: "/users/me?populate=todos",
    config: {
      headers: {
        Authorization: `Bearer  ${userData?.jwt}`,
      },
    },
  });

  const deleteTodo = async () => {
    try {
      const { status } = await axiosInstance.delete(`/todos/${todoToEdit.id}`, {
        headers: {
          Authorization: `Bearer  ${userData?.jwt}`,
        },
      });
      if (status === 200) {
        setQueryVersion((prev) => prev + 1);
        closeDeleteModal();
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-center gap-3">
        {isLoading ? (
          <ButtonSkeleton />
        ) : (
          <AddTodo setQueryVersion={setQueryVersion} />
        )}
      </div>
      {isLoading ? (
        <Skeleton />
      ) : (
        <div className="flex flex-col gap-4">
          {todos.length > 0 ? (
            todos.map((todo: ITodo) => {
              return (
                <div
                  className="flex items-center justify-between odd:bg-gray-100 px-4 py-3 rounded-md transition-all duration-300 hover:bg-gray-100"
                  key={todo.title}>
                  <p>
                    {todo.id}- {todo.title}
                  </p>
                  <div className="flex items-center gap-3">
                    {/* Update Button */}
                    <button
                      onClick={() => openUpdateModal(todo)}
                      className="text-white bg-blue-700 px-2 py-2 rounded-lg">
                      Update
                    </button>
                    {/* Update Modale */}
                    <Modal
                      isOpen={isOpenUpdate}
                      closeModal={closeUpdateModal}
                      title={"Edit this todo"}>
                      <form
                        className="flex flex-col gap-4"
                        onSubmit={handleSubmit(onSubmitUpdate)}>
                        <div className="flex flex-col gap-7">
                          <div className="flex relative w-full mx-auto">
                            <Input
                              {...register("title", {
                                required: "Title is required",
                              })}
                              onChange={hanldeOnChange}
                              value={todoToEdit.title}
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
                                required: "Content is required",
                              })}
                              onChange={hanldeOnChange}
                              value={todoToEdit.content}
                            />
                            {errors["content"] && (
                              <div className="text-red-500 text-[13px] font-semibold absolute -bottom-[22px] right-0">
                                {errors["content"]?.message}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Button isLoading={isUpdating}>Update</Button>
                          <button
                            type="button"
                            onClick={closeUpdateModal}
                            className="text-black font-medium  bg-gray-200  px-3 py-3 rounded-lg transition-all duration-300 hover:bg-gray-300">
                            Cancel
                          </button>
                        </div>
                      </form>
                    </Modal>
                    {/* ** Delete Button */}
                    <button
                      onClick={() => openDeleteModal(todo)}
                      className="text-white bg-red-500 px-2 py-2 rounded-lg">
                      Delete
                    </button>
                    {/* Delete Modale */}
                    <Modal
                      isOpen={isOpenDelete}
                      closeModal={closeDeleteModal}
                      title="Are you sure you want to remove this todo from your store ?"
                      description="Deleting this todo will remove it permenantly from your inventory. Any associated data, sales history, and other related information will also be deleted. Please make sure this is the intended action.">
                      <div className="flex items-center gap-4 mt-5">
                        <button
                          onClick={deleteTodo}
                          className="text-white bg-red-500 px-2 py-2 rounded-lg font-medium">
                          Yes, delete
                        </button>
                        <button
                          onClick={closeDeleteModal}
                          className="text-black font-medium  bg-gray-200  px-2 py-2 rounded-lg">
                          Cancel
                        </button>
                      </div>
                    </Modal>
                  </div>
                </div>
              );
            })
          ) : (
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}>
              No Todos Yet
            </motion.h1>
          )}
        </div>
      )}
    </div>
  );
};

export default TodoList;
