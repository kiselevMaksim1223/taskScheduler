import {todolistAPI, todolistType} from "../api/todoist-api";
import {Dispatch} from "redux";

export type addTodolistAT = ReturnType<typeof addTodolistAC>
export type deleteTodolistAT = ReturnType<typeof deleteTodolistAC>
export type changeTodolistTitleAT = ReturnType<typeof changeTodolistTitleAC>
export type changeTodolistFilterAT = ReturnType<typeof changeTodolistFilterAC>
export type GetTodolistAT = ReturnType<typeof getTodoListAC>

export type filterValueType = "all" | "active" | "complete"

export type TodoListActionType = addTodolistAT
    | deleteTodolistAT
    | changeTodolistTitleAT
    | changeTodolistFilterAT
    | GetTodolistAT

export type todolistDomainType = todolistType & {
    filter: filterValueType
}


const initialState: todolistDomainType[] = []

export const todolistsReducer = (state = initialState, action: TodoListActionType):todolistDomainType[] => {
    switch (action.type) {
        case "ADD-TODOLIST":
            // let todoListId = v1()
            // const newTodolist: todolistDomainType = {
            //     id: action.todoList.id,
            //     title: action.todoList.title,
            //     filter: "all",
            //     addedDate:"",
            //     order:1
            // }
            return [{...action.todoList, filter:"all"}, ...state]

        case "DELETE-TODOLIST":
            return state.filter(tl => tl.id !== action.todoListId)
        case "CHANGE-TODOLIST-TITLE":
            return state.map(tl => tl.id === action.todoListId ? {...tl, title: action.title} : tl)
        case "CHANGE-TODOLIST-FILTER":
            return state.map(tl => tl.id === action.todoListId ? {...tl, filter: action.filter} : tl)
        case "GET-TODOLISTS":
            return action.todoLists.map((t) => ({...t, filter: "all"}))

        default:
            return state
    }
}

export const addTodolistAC = (todoList: todolistType) => {
    return {
        type: "ADD-TODOLIST",
        todoList
    } as const
}

export const deleteTodolistAC = (todoListId: string) => {
    return {
        type: "DELETE-TODOLIST",
        todoListId: todoListId
    } as const
}

export const changeTodolistTitleAC = (todoListId: string, title: string) => {
    return {
        type: "CHANGE-TODOLIST-TITLE",
        todoListId: todoListId,
        title
    } as const
}

export const changeTodolistFilterAC = (todoListId: string, filter: filterValueType) => {
    return {
        type: "CHANGE-TODOLIST-FILTER",
        todoListId: todoListId,
        filter: filter
    } as const
}

export const getTodoListAC = (todoLists: todolistType[]) => {
    return {
        type: "GET-TODOLISTS",
        todoLists
    } as const
}



//===========================THUNK=========================================================
export const getTodoListTC = () => (dispatch:Dispatch)  => {
    todolistAPI.getTodolists()
        .then(res => {
            dispatch(getTodoListAC(res.data))
        })
}

export const addTodoListTC = (todoListTitle:string) => (dispatch:Dispatch) => {
    todolistAPI.createTodolist(todoListTitle)
        .then((res) => {
            dispatch(addTodolistAC(res.data.data.item))
        })
}

export const deleteTodoListTC = (todoListId:string) => (dispatch:Dispatch) => {
    todolistAPI.deleteTodolist(todoListId)
        .then(() => {
            dispatch(deleteTodolistAC(todoListId))
        })
}

export const changeTodoListTitleTC = (todoListId:string, title:string) => (dispatch:Dispatch) => {
    todolistAPI.updateTodolist(todoListId, title)
        .then(() => {
            dispatch(changeTodolistTitleAC(todoListId, title))
        })
}