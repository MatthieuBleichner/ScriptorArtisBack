import { Task, State, User } from "../types";
import { PrismaClient } from '@prisma/client'
import bcrypt from "bcrypt"
import jwt  from "jsonwebtoken"


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
    if (!stateId) return null
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

  async addUser(input : {firstName: string, lastName: string, email: string, password: string }): Promise<User> {
    return bcrypt.hash(input.password, 10)
    .then(hash => {
      return this.user.create({
        data: {
          firstName: input.firstName,
          lastName: input.lastName,
          email: input.email,
          password: hash,
        },
      });
    })
    .catch(error => { 
      console.log("cannot add new user", error )
      return null
    }); 
  }


  async login(input: {email: string, password: string}) : Promise<string> {
    return this.user.findUnique({
      where: { email: input.email },
    }).then((user) => {
      return bcrypt.compare(input.password, user.password)
      .then(valid => {
          if (!valid) {
            console.log('pwd not valid')
              return "";
          }
          return jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        )
      })
      .catch(error => {
        console.log("error in bcrypt compare", error)
        return ""
      });
    }).catch(() => {
      return ""
    })
  }


  async getUser(userId: number): Promise<User> {
    if (!userId) return null
    return this.user.findUnique({
      where: { id: userId || undefined },
    })
  }

  async getUsers(): Promise<User[]> {
    return this.user.findMany();
  }
}
