import express from "express";
import {
  createResource,
  getAllResources,
  getResourceById,
  updateResource,
  deleteResource
} from "../controller/resourceController.js";
import { authMiddleware } from "../middleware/authentication.js";

const resourceRouter = express.Router();

resourceRouter.post("/", authMiddleware, createResource);
resourceRouter.get("/", authMiddleware, getAllResources);
resourceRouter.get("/:id", authMiddleware, getResourceById);
resourceRouter.put("/:id", authMiddleware, updateResource);
resourceRouter.delete("/:id", authMiddleware, deleteResource);

export default resourceRouter;
