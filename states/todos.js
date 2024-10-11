import { create } from "zustand";
import { getAPI, postAPI } from "../services/fetchAPI";
import { toast } from "react-toastify";

const useTodosStore = create((set) => ({
  data: [],
  openModalDelete: false,
  setOpenModalDelete: (value) => set({ openModalDelete: value }),

  fetchData: async () => {
    try {
      const allData = await getAPI("/other/dataUpdateChecker");
      if (allData.error) {
        throw new Error(allData.error);
      }
      set({ data: allData.data });
      toast.success("Tasks have been loaded successfully.");
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load tasks.");
    }
  },

  deleteAllData: async () => {
    try {
      await postAPI("/other/dataUpdateChecker", null, "DELETE");
      toast.success("All tasks have been deleted successfully");
      const allData = await getAPI("/other/dataUpdateChecker");
      set({ data: allData.data });
    } catch (error) {
      console.error("Error deleting data:", error);
      toast.error("An error occurred while deleting the tasks");
    }
  },

  handleDeleteTask: async (id) => {
    try {
      const response = await postAPI(
        `/other/dataUpdateChecker?id=${id}`,
        {},
        "DELETE"
      );
      if (!response || response.error) {
        throw new Error("An error occurred during the deletion.");
      }
      toast.success("Task deleted successfully!");
      console.log("Delete operation successful:", response);

      set({ openModalDelete: false });

      const allData = await getAPI("/other/dataUpdateChecker");
      set({ data: allData.data });
    } catch (error) {
      console.error("Delete error:", error);
      toast.error(`Error: ${error.message}`);
    }
  },

  setData: (newData) => set({ data: newData }),
}));

export default useTodosStore;
