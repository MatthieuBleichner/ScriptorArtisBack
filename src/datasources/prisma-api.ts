import { RESTDataSource } from "@apollo/datasource-rest";
import { Task, User } from "../types";


const ME: User = {
    id: 'me',
    firstName: 'Matthieu',
    lastName: 'Bleichner',
    email: '',
    tasks: ['firstTask']
}


const FIRST_TASK: Task = {
    id: 'firstTask',
    title: 'First task',
    description: 'My first task',
    state: 'To  do',
    owner: ME
} 
export class PrismaAPI extends RESTDataSource {
    baseURL = "https://spotify-demo-api-fe224840a08c.herokuapp.com/v1/";

    async getFeaturedTasks(): Promise<Task[]> {
        //const response = await this.get<{ playlists: { items: any[] }}>("browse/featured-playlists");
        //return response?.playlists?.items ?? [];
        return [FIRST_TASK];
      }
        
}
