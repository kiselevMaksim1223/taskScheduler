import {todolistAPI, todolistType} from "../api/todoist-api";
import {Dispatch} from "redux";
import {appStatusType, setErrorAC, setErrorAT, setStatusAC, setStatusAT} from "./app-reducer";

export type addTodolistAT = ReturnType<typeof addTodolistAC>
export type deleteTodolistAT = ReturnType<typeof deleteTodolistAC>
export type changeTodolistTitleAT = ReturnType<typeof changeTodolistTitleAC>
export type changeTodolistFilterAT = ReturnType<typeof changeTodolistFilterAC>
export type GetTodolistAT = ReturnType<typeof getTodoListAC>
export type changeEntityStatusAT = ReturnType<typeof changeEntityStatusAC>

export type filterValueType = "all" | "active" | "complete"

export type TodoListActionType = addTodolistAT
    | deleteTodolistAT
    | changeTodolistTitleAT
    | changeTodolistFilterAT
    | GetTodolistAT
    | setStatusAT
    | setErrorAT
    | changeEntityStatusAT

export type todolistDomainType = todolistType & {
    filter: filterValueType
    entityStatus:appStatusType
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
            return [{...action.todoList, filter:"all", entityStatus:"idle"}, ...state]

        case "DELETE-TODOLIST":
            return state.filter(tl => tl.id !== action.todoListId)
        case "CHANGE-TODOLIST-TITLE":
            return state.map(tl => tl.id === action.todoListId ? {...tl, title: action.title} : tl)
        case "CHANGE-TODOLIST-FILTER":
            return state.map(tl => tl.id === action.todoListId ? {...tl, filter: action.filter} : tl)
        case "GET-TODOLISTS":
            return action.todoLists.map((t) => ({...t, filter: "all", entityStatus:"idle"}))
        case "CHANGE-ENTITY-STATUS":
            return state.map(tl => tl.id === action.todoListId ? {...tl, entityStatus:action.entityStatus} :tl)

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

export const changeEntityStatusAC = (todoListId: string, entityStatus:appStatusType) => {
    return{
        type: "CHANGE-ENTITY-STATUS",
        todoListId,
        entityStatus
    } as const
}

//===========================THUNK=========================================================
export const getTodoListTC = () => (dispatch:Dispatch)  => {
    dispatch(setStatusAC("loading"))
    todolistAPI.getTodolists()
        .then(res => {
            dispatch(getTodoListAC(res.data))
            dispatch(setStatusAC("success"))
        })
}

export const addTodoListTC = (todoListTitle:string) => (dispatch:Dispatch<TodoListActionType>) => {
    dispatch(setStatusAC("loading"))
    todolistAPI.createTodolist(todoListTitle)
        .then((res) => {
            if(res.data.resultCode === 0) {
                dispatch(addTodolistAC(res.data.data.item))
                dispatch(setStatusAC("success"))
            } else {
                if (res.data.messages.length) {
                    dispatch(setErrorAC(res.data.messages[0]))
                } else {
                    dispatch(setErrorAC("some error occupied"))
                }
                dispatch(setStatusAC("idle"))
            }
        })
}

export const deleteTodoListTC = (todoListId:string) => (dispatch:Dispatch<TodoListActionType>) => {
    dispatch(setStatusAC("loading"))
    dispatch(changeEntityStatusAC(todoListId, "loading"))
    todolistAPI.deleteTodolist(todoListId)
        .then(() => {
            dispatch(deleteTodolistAC(todoListId))
            dispatch(setStatusAC("success"))
            dispatch(changeEntityStatusAC(todoListId, "success"))
        })
}

export const changeTodoListTitleTC = (todoListId:string, title:string) => (dispatch:Dispatch<TodoListActionType>) => {
    todolistAPI.updateTodolist(todoListId, title)
        .then(() => {
            dispatch(changeTodolistTitleAC(todoListId, title))
        })
}