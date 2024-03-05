import { GraphQLResolveInfo } from 'graphql';
import { DataSourceContext } from './context';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Create a new task */
  createTask: Task;
  /** Delete a task */
  deleteTask: Task;
  /** Update a task */
  updateTask: Task;
};


export type MutationCreateTaskArgs = {
  input?: InputMaybe<CreateTaskInput>;
};


export type MutationDeleteTaskArgs = {
  input?: InputMaybe<DeleteTaskInput>;
};


export type MutationUpdateTaskArgs = {
  input?: InputMaybe<UpdateTaskInput>;
};

export enum Priority {
  P0 = 'P0',
  P1 = 'P1',
  P2 = 'P2',
  P3 = 'P3',
  P4 = 'P4'
}

export type Query = {
  __typename?: 'Query';
  /** List of all Tasks of this project. */
  featuredTasks: Array<Task>;
  /** List of all states of this project. */
  states?: Maybe<Array<State>>;
  /** Retrieves a specific playlist. */
  task?: Maybe<Task>;
  /** List of tasks associated to a state */
  tasksByState?: Maybe<Array<Maybe<Task>>>;
};


export type QueryFeaturedTasksArgs = {
  filter?: InputMaybe<TaskFilters>;
};


export type QueryTaskArgs = {
  id: Scalars['Int']['input'];
};


export type QueryTasksByStateArgs = {
  filters?: InputMaybe<TaskFiltersByState>;
};

/** Define the status of a story to be done Todo, In Progress, Done */
export type State = {
  __typename?: 'State';
  /** The id of the status */
  id: Scalars['Int']['output'];
  /** The position of the status */
  index: Scalars['Int']['output'];
  /** The tasks associated to this status */
  tasks?: Maybe<Array<Maybe<Task>>>;
  /** The name of the status */
  title: Scalars['String']['output'];
};

/** Define a story to be done */
export type Task = {
  __typename?: 'Task';
  /** Due date of this task */
  date?: Maybe<Scalars['String']['output']>;
  /** The description of the task */
  description?: Maybe<Scalars['String']['output']>;
  /** The id of the task */
  id: Scalars['Int']['output'];
  /** Who is the owner of this task */
  owner?: Maybe<User>;
  /** Priority of this task */
  priority?: Maybe<Scalars['String']['output']>;
  /** The state of the task - ToDo, OnGoing, Done */
  state: Scalars['Int']['output'];
  /** The title of the task */
  title: Scalars['String']['output'];
};

export type TaskFilters = {
  date?: InputMaybe<Scalars['String']['input']>;
  ownerId?: InputMaybe<Scalars['Int']['input']>;
  priority?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['Int']['input']>;
};

export type TaskFiltersByState = {
  date?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  ownerId?: InputMaybe<Scalars['Int']['input']>;
  priority?: InputMaybe<Scalars['String']['input']>;
  stateId: Scalars['Int']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
};

export type TasksInput = {
  filter?: InputMaybe<TaskFilters>;
};

export type User = {
  __typename?: 'User';
  /** The email of the user */
  email: Scalars['String']['output'];
  /** The name of the user */
  firstName: Scalars['String']['output'];
  /** The id of the user */
  id: Scalars['Int']['output'];
  /** The last name of the user */
  lastName: Scalars['String']['output'];
  /** List of tasks ids' handled by this user */
  tasks?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

export type CreateTaskInput = {
  date?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  ownerId?: InputMaybe<Scalars['Int']['input']>;
  priority?: InputMaybe<Priority>;
  state?: InputMaybe<Scalars['Int']['input']>;
  title: Scalars['String']['input'];
};

export type DeleteTaskInput = {
  id: Scalars['Int']['input'];
};

export type UpdateTaskInput = {
  date?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  ownerId?: InputMaybe<Scalars['Int']['input']>;
  priority?: InputMaybe<Priority>;
  state?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Priority: Priority;
  Query: ResolverTypeWrapper<{}>;
  State: ResolverTypeWrapper<State>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Task: ResolverTypeWrapper<Task>;
  TaskFilters: TaskFilters;
  TaskFiltersByState: TaskFiltersByState;
  TasksInput: TasksInput;
  User: ResolverTypeWrapper<User>;
  createTaskInput: CreateTaskInput;
  deleteTaskInput: DeleteTaskInput;
  updateTaskInput: UpdateTaskInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  Int: Scalars['Int']['output'];
  Mutation: {};
  Query: {};
  State: State;
  String: Scalars['String']['output'];
  Task: Task;
  TaskFilters: TaskFilters;
  TaskFiltersByState: TaskFiltersByState;
  TasksInput: TasksInput;
  User: User;
  createTaskInput: CreateTaskInput;
  deleteTaskInput: DeleteTaskInput;
  updateTaskInput: UpdateTaskInput;
};

export type MutationResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createTask?: Resolver<ResolversTypes['Task'], ParentType, ContextType, Partial<MutationCreateTaskArgs>>;
  deleteTask?: Resolver<ResolversTypes['Task'], ParentType, ContextType, Partial<MutationDeleteTaskArgs>>;
  updateTask?: Resolver<ResolversTypes['Task'], ParentType, ContextType, Partial<MutationUpdateTaskArgs>>;
};

export type QueryResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  featuredTasks?: Resolver<Array<ResolversTypes['Task']>, ParentType, ContextType, Partial<QueryFeaturedTasksArgs>>;
  states?: Resolver<Maybe<Array<ResolversTypes['State']>>, ParentType, ContextType>;
  task?: Resolver<Maybe<ResolversTypes['Task']>, ParentType, ContextType, RequireFields<QueryTaskArgs, 'id'>>;
  tasksByState?: Resolver<Maybe<Array<Maybe<ResolversTypes['Task']>>>, ParentType, ContextType, Partial<QueryTasksByStateArgs>>;
};

export type StateResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['State'] = ResolversParentTypes['State']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  index?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  tasks?: Resolver<Maybe<Array<Maybe<ResolversTypes['Task']>>>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TaskResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['Task'] = ResolversParentTypes['Task']> = {
  date?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  owner?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  priority?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  state?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tasks?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = DataSourceContext> = {
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  State?: StateResolvers<ContextType>;
  Task?: TaskResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

