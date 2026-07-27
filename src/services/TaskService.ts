import type { Task } from "../types/Task.js";

type UpdateTaskData = {
    title?: string;
    completed?: boolean;
}


class TaskService {
  private tasks: Task[] = [];

  list(completed?: boolean) {
    if(completed === undefined){
        return this.tasks
    }
    return this.tasks.filter((task) => task.completed === completed);
  }

  findById(id: number){
    return this.tasks.find((task) => task.id === id)
  }

  create(title: string) {
    const newTask: Task = {
      id: Math.random(),
      title,
      completed: false,
    };

    this.tasks.push(newTask);

    return newTask;
  }

  update(id:number, data: UpdateTaskData){
    const task = this.findById(id);
    if(!task){
        return undefined;
    }
    
    if(data.title !== undefined){
        task.title = data.title;
    }
    
    if(data.completed !== undefined){
        task.completed = data.completed;
    }

    return task;
  }

  delete(id:number){
    const task = this.findById(id);
    
    if(!task){
        return false;
    }

    this.tasks = this.tasks.filter( task => task.id !== id)
    return true;
  }

}

export const taskService = new TaskService();