import TodoList from "../components/TodoList";

const HomePage = () => {
  return (
    <main className="w-full md:max-w-[700px] max-md:px-10 max-sm:px-5 max-lg:px-3 mx-auto mt-20">
      <TodoList />
    </main>
  );
};

export default HomePage;
