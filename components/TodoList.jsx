"use client";
import React, { useEffect } from "react";
import Task from "./Task";
import useTodosStore from "../states/todos";

const TodoList = () => {
  const { data, fetchData } = useTodosStore();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead className="bg-neutral-300">
            <tr className="flex justify-between">
              <th>Tasks</th>
              <th>Actions</th>
            </tr>
          </thead>

          {data?.map((dt) => (
            <Task key={dt?.id} dt={dt} />
          ))}
        </table>
      </div>
    </div>
  );
};

export default TodoList;
