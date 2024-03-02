import { Task, State } from "../types";
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


    async createTask(input : {title: string, description?: string, state?: number, ownerId?: number}): Promise<Task> {
      return this.task.create({
        data: {
          title: input.title,
          description: input.description,
          state: input.state,
          ownerId: input.ownerId,
        },
      });
    }

    async deleteTask(taskId: number): Promise<Task> {
      return this.task.delete({
        where: {
          id: taskId,
        },
      });
    }

    async updateTask(input: {id: number, title?: string, description?: string, state?: number, ownerId?: number}): Promise<Task> {
      return this.task.update({
        where: {
          id: input.id,
        },
        data: {
          title: input.title /*|| input.task.title*/, // if given title is empty keep old one
          description: input.description /*?? input.task.description*/,
          state: input.state /*?? input.task.state*/,
          ownerId: input.ownerId /*?? input.task.owner?.id*/,
        },
      });
    }


    async getStates(): Promise<State[]> {
      const response = await this.state.findMany({
        orderBy: {
          index: 'asc'
        }
      });
      return response;
  }

  async getTasksByState(stateId: number): Promise<Task[]> {
    const response = await this.task.findMany({
      where: {
        state: stateId
      }
    });
    return response;
  }
}
