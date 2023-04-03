import {todolistAPI, todolistType} from "../api/todoist-api";
import {appActions, appStatusType} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../Utils/error-utils";
import {AppThunk} from "../Store/Store";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


export type filterValueType = "all" | "active" | "complete"


export type todolistDomainType = todolistType & {
    filter: filterValueType
    todolistEntityStatus: appStatusType
}

const initialState: todolistDomainType[] = []

const slice = createSlice({
    name: "todolist",
    initialState,
    reducers: {
        addTodolist: (state, action: PayloadAction<{ todoList: todolistType }>) => {
            // return [{...action.todoList, filter:"all", todolistEntityStatus:"idle"}, ...state]
            state.unshift({...action.payload.todoList, filter: "all", todolistEntityStatus: "idle"})
        },
        deleteTodolist: (state, action: PayloadAction<{ todoListId: string }>) => {
            const indexTl = state.findIndex(tl => tl.id === action.payload.todoListId)
            if (indexTl !== -1) {
                state.splice(indexTl, 1)
            }
        },
        changeTodolistTitle: (state, action: PayloadAction<{ todoListId: string, title: string }>) => {
            let tl = state.find(tl => tl.id === action.payload.todoListId)
            if (tl) {
                tl.title = action.payload.title
            }
        },
        changeTodolistFilter: (state, action: PayloadAction<{ todoListId: string, filter: filterValueType }>) => {
            let tl = state.find(tl => tl.id === action.payload.todoListId)
            if (tl) {
                tl.filter = action.payload.filter
            }
        },
        getTodoList: (state, action: PayloadAction<{ todoLists: todolistType[] }>) => {
            return action.payload.todoLists.map((t) => ({...t, filter: "all", todolistEntityStatus: "idle"}))
        },
        changeTodolistEntityStatus: (state, action: PayloadAction<{ todoListId: string, todolistEntityStatus: appStatusType }>) => {
            let tl = state.find(tl => tl.id === action.payload.todoListId)
            if (tl) {
                tl.todolistEntityStatus = action.payload.todolistEntityStatus
            }
        },
    }
})

export const todolistsReducer = slice.reducer
export const todolistActions = slice.actions

//===========================THUNK=========================================================
export const getTodoListTC = (): AppThunk => (dispatch) => {
    dispatch(appActions.setStatus({status: "loading"}))
    todolistAPI.getTodolists()
        .then(res => {
            dispatch(todolistActions.getTodoList({todoLists: res.data}))
            dispatch(appActions.setStatus({status: "success"}))
        })
        .catch(err => {
            handleServerNetworkError(err, dispatch)
        })
}

export const addTodoListTC = (todoListTitle: string): AppThunk => (dispatch) => {
    dispatch(appActions.setStatus({status: "loading"}))
    todolistAPI.createTodolist(todoListTitle)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(todolistActions.addTodolist({todoList: res.data.data.item}))
                dispatch(appActions.setStatus({status: "success"}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(err => {
            handleServerNetworkError(err, dispatch)
        })
}

export const deleteTodoListTC = (todoListId: string): AppThunk => (dispatch) => {
    dispatch(appActions.setStatus({status: "loading"}))
    dispatch(todolistActions.changeTodolistEntityStatus({todoListId: todoListId, todolistEntityStatus: "loading"}))
    todolistAPI.deleteTodolist(todoListId)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(todolistActions.deleteTodolist({todoListId: todoListId}))
                dispatch(appActions.setStatus({status: "success"}))
                dispatch(todolistActions.changeTodolistEntityStatus({
                    todoListId: todoListId,
                    todolistEntityStatus: "success"
                }))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(err => {
            handleServerNetworkError(err, dispatch)
        })
}

export const changeTodoListTitleTC = (todoListId: string, title: string): AppThunk => (dispatch) => {
    dispatch(todolistActions.changeTodolistEntityStatus({todoListId: todoListId, todolistEntityStatus: "loading"}))
    dispatch(appActions.setStatus({status: "loading"}))
    todolistAPI.updateTodolist(todoListId, title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(todolistActions.changeTodolistTitle({todoListId, title}))
                dispatch(todolistActions.changeTodolistEntityStatus({todoListId, todolistEntityStatus: "success"}))
                dispatch(appActions.setStatus({status: "success"}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(err => {
            handleServerNetworkError(err, dispatch)
        })
}