import { NextResponse } from "next/server";
import {
  getAllData,
  createNewData,
  deleteDataAll,
  deleteDataByAny,
  updateDataByAny,
} from "../../../../services/serviceOperations/index";

const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      const data = await getAllData("dataUpdateChecker");
      if (!data || data.error || data === undefined || data.length === 0) {
        return res.status(500).json({
          status: "error",
          error: data?.error || "No data found",
          data: null,
        });
      }
      return res.status(200).json({ status: "success", data });
    } catch (error) {
      return res
        .status(500)
        .json({ status: "error", error: error.message, data: null });
    }
  }

  // DELETE - Belirli bir ID'ye göre silme
  if (req.method === "DELETE" && req.query.id) {
    const { id } = req.query; // ID'yi query parametrelerinden alın
    try {
      const deleteDataFromDb = await deleteDataByAny("dataUpdateChecker", {
        id,
      });
      if (!deleteDataFromDb || deleteDataFromDb.error) {
        return res.status(500).json({
          status: "error",
          error: deleteDataFromDb?.error || "Deletion failed",
          data: null,
        });
      }
      return res
        .status(200)
        .json({ status: "success", data: deleteDataFromDb });
    } catch (error) {
      return res
        .status(500)
        .json({ status: "error", error: error.message, data: null });
    }
  }
  // DELETE - Tüm verileri silme
  if (req.method === "DELETE" && !req.query.id) {
    try {
      const deleteDataFromDb = await deleteDataAll("dataUpdateChecker");
      if (!deleteDataFromDb || deleteDataFromDb.error) {
        return res.status(500).json({
          status: "error",
          error: deleteDataFromDb?.error || "Deletion failed",
          data: null,
        });
      }
      return res
        .status(200)
        .json({ status: "success", data: deleteDataFromDb });
    } catch (error) {
      return res
        .status(500)
        .json({ status: "error", error: error.message, data: null });
    }
  }

  // POST - Yeni veri ekleme
  if (req.method === "POST") {
    try {
      const { data } = req.body;
      if (!data) {
        return res
          .status(400)
          .json({ status: "error", message: "Data is required." });
      }

      const newData = await createNewData("dataUpdateChecker", {
        Configdata: data,
      });
      if (!newData || newData.error) {
        return res.status(500).json({
          status: "error",
          error: newData?.error || "Creation failed",
          data: null,
        });
      }
      return res.status(200).json({ status: "success", data: newData });
    } catch (error) {
      return res
        .status(500)
        .json({ status: "error", error: error.message, data: null });
    }
  }

  // PUT - Veri güncelleme
  if (req.method === "PUT") {
    const { where, newData } = req.body;
    if (!where || !newData) {
      return res
        .status(400)
        .json({ status: "error", message: "where and newData are required." });
    }

    try {
      const updatedData = await updateDataByAny(
        "dataUpdateChecker",
        where,
        newData
      );
      if (!updatedData || updatedData.error) {
        return res.status(404).json({
          status: "error",
          message: updatedData?.error || "Update failed",
        });
      }
      return res.status(200).json({ status: "success", data: updatedData });
    } catch (error) {
      return res
        .status(500)
        .json({ status: "error", error: error.message, data: null });
    }
  }
};

export default handler;
