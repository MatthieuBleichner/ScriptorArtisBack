import { Task, State, User } from "../types";
import { PrismaClient } from '@prisma/client'



export class PrismaAPI extends PrismaClient {

    async getFeaturedTasks(filters: {stateId?: number, priority?: string, date?: string, ownerId?: number}): Promise<Task[]> {
        const response = await this.task.findMany({
          where: { stateId: filters.stateId, priority: filters.priority, date: filters.date, ownerId: filters.ownerId}
        });
        return response;
    }
    
    async getTask(taskId: number): Promise<Task> {
      return this.task.findUnique({
        where: { id: taskId || undefined },
      })
    }


    async createTask(input : {title: string, description?: string, stateId?: number, ownerId?: number, priority?: string, date?: string}): Promise<Task> {
      return this.task.create({
        data: {
          title: input.title,
          description: input.description,
          stateId: input.stateId,
          ownerId: input.ownerId,
          priority: input.priority,
          date: input.date,
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

    async updateTask(input: {id: number, title?: string, description?: string, stateId?: number, ownerId?: number, priority?: string, date?: string}): Promise<Task> {
      return this.task.update({
        where: {
          id: input.id,
        },
        data: {
          title: input.title /*|| input.task.title*/, // if given title is empty keep old one
          description: input.description /*?? input.task.description*/,
          stateId: input.stateId /*?? input.task.state*/,
          ownerId: input.ownerId /*?? input.task.owner?.id*/,
          priority: input.priority,
          date: input.date,
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

  async getSate(stateId: number): Promise<State> {
    return this.state.findUnique({
      where: { id: stateId || undefined },
    })
  }

  async getTasksByState(filters: {stateId: number, priority?: string, date?: string, ownerId?: number, description?: string, title?: string}): Promise<Task[]> {
    const response = await this.task.findMany({
      where: {
        stateId: filters.stateId,
        priority: filters.priority, 
        date: filters.date, 
        ownerId: filters.ownerId,
        title: { contains: filters.title},
        description: { contains: filters.description}
      }
    });
    return response;
  }

  async getUser(userId: number): Promise<User> {
    return this.user.findUnique({
      where: { id: userId || undefined },
    })
  }
}
