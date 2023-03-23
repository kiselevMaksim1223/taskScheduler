import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': process.env.REACT_APP_API_KEY
    }
})

export type todolistType = {
    addedDate:string
    id: string
    order:number
    title:string
}

type ResponseType<T = {}> = {
    fieldsErrors:string[]
    messages:string[]
    resultCode:number
    data: T
}

export const todolistAPI = {
    getTodolists() {
        return instance.get<todolistType[]>(`todo-lists/`)
            .then((res => res)) //можно писать можно не писать, если нужно достать какие то определенные давнные
    },

    createTodolist(title:string) {
        return instance.post<ResponseType<{ item:todolistType }>>("todo-lists",{title})
    },

    deleteTodolist(todolistId:string){
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },

    updateTodolist(todolistId:string, title:string){
        return instance.put<ResponseType>(`todo-lists/${todolistId}`,{title})
    }

}