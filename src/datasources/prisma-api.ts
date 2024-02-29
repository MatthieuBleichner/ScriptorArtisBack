import { Task, User } from "../types";
import { PrismaClient } from '@prisma/client'



export class PrismaAPI extends PrismaClient {

    async getFeaturedTasks(): Promise<Task[]> {
        const response = await this.task.findMany();
        return response;
    }
    
    async getTask(taskId: number): Promise<Task> {
      return this.task.findUnique({
        where: { id: taskId || undefined },
      })
    }
}
