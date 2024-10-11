"use client";

import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Modal from "./Modal";
import { toast } from "react-toastify";
import { postAPI, getAPI } from "../services/fetchAPI/index";
import useTodosStore from "../states/todos";

const AddTask = () => {
  const { setData, deleteAllData } = useTodosStore();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!!value) {
        const response = await postAPI("/other/dataUpdateChecker", {
          data: value,
          method: "POST",
        });

        if (response.error) {
          throw new Error(response.error);
        }

        setValue("");
        setOpen(false);
        toast.success("New todo added successfully!");

        const fetchData = async () => {
          const allData = await getAPI("/other/dataUpdateChecker");
          setData(allData.data);
        };

        fetchData();
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      toast.error("Görev eklenirken bir hata oluştu.");
    }
  };
  const deleteAll = () => {
    deleteAllData();
  };
  return (
    <div className="md:flex md:justify-center md:items-center">
      <div className="flex flex-col md:flex-row items-center md:space-y-0 space-y-1 md:gap-4">
        <div className="w-full flex items-center justify-center flex-row md:w-1/2">
          <button
            onClick={() => setOpen(true)}
            className="text-xs md:text-base md:w-auto w-full btn btn-active btn-neutral"
          >
            Add Task
            <AiOutlinePlus className="ml-1 size-4 md:size-6" />
          </button>
        </div>
        <div className="w-full text-center md:w-1/2">
          <button
            onClick={deleteAll}
            className="md:w-auto w-full btn text-xs md:text-base bg-red-600 text-white"
          >
            Delete All
          </button>
        </div>
      </div>
      <Modal open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit}>
          <h3 className="font-bold text-xl md:text-lg">Add New Task</h3>
          <div className="modal-action">
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
            />
            <button type="submit" className="btn">
              Submit
            </button>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="text-red-400 btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default AddTask;
