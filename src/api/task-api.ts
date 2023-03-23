import axios from "axios";
import {appStatusType} from "../State/app-reducer";


const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.1/todo-lists/`,
    withCredentials:true,
    headers: {
        'API-KEY': process.env.REACT_APP_API_KEY
    }
})

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export type taskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string

}
export type UpdateTaskModelType = { //тип который ожидает получить бэк
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}


type ResponseType<T = {}> = {
    fieldsErrors:string[]
    messages:string[]
    resultCode:number
    data: T
}

type getTasksType = {
    error:string
    totalCount:number
    items:taskType[]
}

export const taskApi = {

    getTasks(todolistId:string) {
        return instance.get<getTasksType>(`${todolistId}/tasks`)
    },

    createTask(todolistId:string, title:string) {
        return instance.post<ResponseType<{item: taskType}>>(`${todolistId}/tasks`, {title})
    },

    updateTask(todolistId:string, taskId:string, model:UpdateTaskModelType) {
        return instance.put<ResponseType<{item: taskType}>>(`${todolistId}/tasks/${taskId}`, model)
    },

    deleteTask(todolistId:string, taskId:string) {
        return instance.delete<ResponseType>(`${todolistId}/tasks/${taskId}`)
    }
}