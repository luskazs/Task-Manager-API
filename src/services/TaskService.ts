import { prisma } from "../config/prismaClient.js";

type UpdateTaskData = {
    title?: string;
    completed?: boolean;
}


class TaskService {

  async getAll(completed?: boolean) {
  if (completed === undefined) {
    return await prisma.task.findMany();
  }

  //filtro
  return await prisma.task.findMany({
    where: {
      completed,
    },
  });
}

  async getById(id: number) {
  return await prisma.task.findUnique({
    where: {
      id,
    },
  });
}

//id, data de criação e completed já são automaticos
  async create(title: string) {
  return await prisma.task.create({
    data: {
      title,
    },
  });
}

  async update(id: number, data: UpdateTaskData) {
  return await prisma.task.update({
    where: {
      id,
    },
    data,
  });
}

  async delete(id: number) {
  return await prisma.task.delete({
    where: {
      id,
    },
  });
}
}
export const taskService = new TaskService();