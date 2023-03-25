import {instance, ResponseType} from "./instans-api";

export type todolistType = {
    addedDate:string
    id: string
    order:number
    title:string
}



export const todolistAPI = {
    getTodolists() {
        return instance.get<todolistType[]>(`todo-lists/`)
            //.then((res => res)) //можно писать можно не писать, если нужно достать какие то определенные данные
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