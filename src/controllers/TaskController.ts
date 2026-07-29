import type { Request, Response } from "express";
import { taskService } from "../services/TaskService.js";

class TaskController {
  async list(req: Request, res: Response) {
    try {
      const { completed } = req.query;

      let completedFilter: boolean | undefined;

      if (completed === "true") {
        completedFilter = true;
      }

      if (completed === "false") {
        completedFilter = false;
      }

      if (
        completed !== "true" &&
        completed !== "false" &&
        completed !== undefined
      ) {
        return res.status(400).json({
          message:
            "O parâmetro 'completed' é inválido. Ele deve ser 'true' ou 'false'.",
        });
      }

      const tasks = await taskService.getAll(completedFilter);

      return res.status(200).json(tasks);
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao buscar as tarefas.",
      });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { title } = req.body;

      const newTask = await taskService.create(title);

      return res.status(201).json(newTask);
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao criar a tarefa.",
      });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      const task = await taskService.getById(id);

      if (!task) {
        return res.status(404).json({
          message: "Tarefa não encontrada.",
        });
      }

      return res.status(200).json(task);
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao buscar a tarefa.",
      });
    }
  }

  async updateTask(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const { title, completed } = req.body;

      const existingTask = await taskService.getById(id);

      if (!existingTask) {
        return res.status(404).json({
          message: "Tarefa não encontrada.",
        });
      }

      const updatedTask = await taskService.update(id, {
        title,
        completed,
      });

      return res.status(200).json(updatedTask);
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao atualizar a tarefa.",
      });
    }
  }

  async deleteTask(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      const existingTask = await taskService.getById(id);

      if (!existingTask) {
        return res.status(404).json({
          message: "Tarefa não encontrada.",
        });
      }

      await taskService.delete(id);

      return res.sendStatus(204);
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao deletar a tarefa.",
      });
    }
  }
}

export const taskController = new TaskController();