import { Router } from "express";
import { taskController } from "../controllers/TaskController.js";

const taskRouter = Router();

taskRouter.get("/", taskController.list);
taskRouter.post("/", taskController.create);
taskRouter.get("/:id", taskController.findById);
taskRouter.put("/:id", taskController.updateTask);
taskRouter.delete("/:id", taskController.deleteTask);

export default taskRouter;