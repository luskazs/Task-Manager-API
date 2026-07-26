import type { Request, Response } from "express";
import { taskService } from "../services/TaskService.js";

class TaskController {
  list(req: Request, res: Response) {
    const {completed} = req.query; // a variavel completed recebe o valor boolean de acordo com oq o usuario acessar, no caso /tasks?completed=true e /taks?completed=false

    let completedFilter: boolean | undefined

    if(completed === "true"){
        completedFilter = true;
    }
    if(completed === "false"){
        completedFilter = false;
    }
    if(completed !== "true" && completed !== "false" && completed !== undefined){
        return res.status(400).json({
            message: "O parametro 'completed' está inválido, ele só pode ser 'true' ou 'false' "
        })
    }

    const tasks = taskService.list(completedFilter);
    return res.status(200).json(tasks);
  }

  create(req: Request, res: Response) {
    const { title } = req.body;

    const newTask = taskService.create(title);

    return res.status(201).json(newTask);
  }

  findById(req: Request, res: Response){
    const id = Number(req.params.id);

    const task = taskService.findById(id);

    //caso não exista a tarefa
    if(!task){
        return res.status(404).json({
            message: "Tarefa não encontrada."
        })
    }
    return res.status(200).json(task)
  }

  updateTask(req: Request, res: Response){
    const id = Number(req.params.id);
    const {title, completed} = req.body;

    const updatedTask = taskService.update(id, {title,completed});
    
    if(!updatedTask){
        return res.status(404).json({
            message: "Tarefa não encontrada"
        })
    }
    return res.status(200).json(updatedTask)
  }

  deleteTask(req: Request, res: Response){
    const id = Number(req.params.id);

    const deleted = taskService.delete(id);

    if(!deleted){
        return res.status(404).json({
            message: "Tarefa não encopntrada"
        })
    }
    return res.sendStatus(204); // uma vez q n precisa devolver nada
  }
}

export const taskController = new TaskController();