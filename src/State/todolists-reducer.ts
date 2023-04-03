import {todolistAPI, todolistType} from "../api/todoist-api";
import {appActions, appStatusType} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../Utils/error-utils";
import {changeTaskEntityStatusAT} from "./tasks-reducer";
import {AppThunk} from "../Store/Store";

export type addTodolistAT = ReturnType<typeof addTodolistAC>
export type deleteTodolistAT = ReturnType<typeof deleteTodolistAC>
export type changeTodolistTitleAT = ReturnType<typeof changeTodolistTitleAC>
export type changeTodolistFilterAT = ReturnType<typeof changeTodolistFilterAC>
export type GetTodolistAT = ReturnType<typeof getTodoListAC>
export type changeTodolistEntityStatusAT = ReturnType<typeof changeTodolistEntityStatusAC>

export type filterValueType = "all" | "active" | "complete"

export type TodoListActionType = addTodolistAT
    | deleteTodolistAT
    | changeTodolistTitleAT
    | changeTodolistFilterAT
    | GetTodolistAT
    | changeTodolistEntityStatusAT
    | changeTaskEntityStatusAT

export type todolistDomainType = todolistType & {
    filter: filterValueType
    todolistEntityStatus:appStatusType
}

const initialState: todolistDomainType[] = []

export const todolistsReducer = (state = initialState, action: TodoListActionType):todolistDomainType[] => {
    switch (action.type) {
        case "ADD-TODOLIST":
            return [{...action.todoList, filter:"all", todolistEntityStatus:"idle"}, ...state]
        case "DELETE-TODOLIST":
            return state.filter(tl => tl.id !== action.todoListId)
        case "CHANGE-TODOLIST-TITLE":
            return state.map(tl => tl.id === action.todoListId ? {...tl, title: action.title} : tl)
        case "CHANGE-TODOLIST-FILTER":
            return state.map(tl => tl.id === action.todoListId ? {...tl, filter: action.filter} : tl)
        case "GET-TODOLISTS":
            return action.todoLists.map((t) => ({...t, filter: "all", todolistEntityStatus:"idle"}))
        case "CHANGE-ENTITY-STATUS":
            return state.map(tl => tl.id === action.todoListId ? {...tl, todolistEntityStatus:action.todolistEntityStatus} :tl)

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

export const changeTodolistEntityStatusAC = (todoListId: string, todolistEntityStatus:appStatusType) => {
    return{
        type: "CHANGE-ENTITY-STATUS",
        todoListId,
        todolistEntityStatus
    } as const
}

//===========================THUNK=========================================================
export const getTodoListTC = ():AppThunk => (dispatch)  => {
    dispatch(appActions.setStatus({status:"loading"}))
    todolistAPI.getTodolists()
        .then(res => {
            dispatch(getTodoListAC(res.data))
            dispatch(appActions.setStatus({status:"success"}))
        })
        .catch(err => {
            handleServerNetworkError(err, dispatch)
        })
}

export const addTodoListTC = (todoListTitle:string):AppThunk => (dispatch) => {
    dispatch(appActions.setStatus({status:"loading"}))
    todolistAPI.createTodolist(todoListTitle)
        .then((res) => {
            if(res.data.resultCode === 0) {
                dispatch(addTodolistAC(res.data.data.item))
                dispatch(appActions.setStatus({status:"success"}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(err => {
            handleServerNetworkError(err, dispatch)
        })
}

export const deleteTodoListTC = (todoListId:string):AppThunk => (dispatch) => {
    dispatch(appActions.setStatus({status:"loading"}))
    dispatch(changeTodolistEntityStatusAC(todoListId, "loading"))
    todolistAPI.deleteTodolist(todoListId)
        .then((res) => {
            if(res.data.resultCode === 0) {
                dispatch(deleteTodolistAC(todoListId))
                dispatch(appActions.setStatus({status:"success"}))
                dispatch(changeTodolistEntityStatusAC(todoListId, "success"))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(err => {
            handleServerNetworkError(err, dispatch)
        })
}

export const changeTodoListTitleTC = (todoListId:string, title:string):AppThunk => (dispatch) => {
    dispatch(changeTodolistEntityStatusAC(todoListId, "loading"))
    dispatch(appActions.setStatus({status:"loading"}))
    todolistAPI.updateTodolist(todoListId, title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(changeTodolistTitleAC(todoListId, title))
                dispatch(changeTodolistEntityStatusAC(todoListId, "success"))
                dispatch(appActions.setStatus({status:"success"}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(err => {
            handleServerNetworkError(err, dispatch)
        })
}