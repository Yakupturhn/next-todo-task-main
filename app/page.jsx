"use client";
import AddTask from "../components/AddTask";
import TodoList from "../components/TodoList";

export default function Home() {
  return (
    <div className=" container px-4 md:px-0  md:max-w-4xl  mx-auto mt-6 ">
      <div className="text-center my-5 flex flex-col gap-4">
        <h1 className="text-2xl md:text-3xl font-bold ">Todo List</h1>
        <AddTask />
      </div>

      <TodoList />
    </div>
  );
}

/* */
/* */
