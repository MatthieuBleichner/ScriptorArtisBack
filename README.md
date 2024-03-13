# Scriptor Artis Front

Frontend part of scriptor artis

## Available Scripts

In the project directory, you can run:

### `yarn dev`

Runs the server in the development mode.\
Open [http://localhost:4000](http://localhost:4000) to view it in the browser.


## Secret Token

Ask your admin for scecret token to set in your env file


## API and usages

The main goal of this repo is to rovide a way to create, update and delete tasks. It has been fully coed using graphql

```
"Define a story to be done"
type Task {
    "The id of the task"
    id: Int!
    "The title of the task"
    title: String!
    "The description of the task"
    description: String
    "The state of the task - ToDo, OnGoing, Done"
    state: State
    "Who is the owner of this task"
    owner: User 
    "Priority of this task"
    priority: String
    "Due date of this task"
    date: String
}
```

Main mutations to be used are those ones:

```
  "Create a new task"
  createTask(input: createTaskInput): Task!
  "Update a task"
  updateTask(input: updateTaskInput): Task!
  "Delete a task"
  deleteTask(input: deleteTaskInput): Task!
```


To retrieve your tasks use following queries:

```
  "List of all Tasks of this project."
  featuredTasks(filter: TaskFilters ): [Task!]!
  "Retrieves a specific playlist."
  task(id: Int!): Task
  "List of all states of this project."
```