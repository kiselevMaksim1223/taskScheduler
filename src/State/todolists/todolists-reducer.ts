import {todolistAPI, todolistType} from "../../api/todoist-api";
import {appActions, appStatusType} from "../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../Utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {createAppAsyncThunk} from "../../Utils/create-app-asynk-thunk";


export type filterValueType = "all" | "active" | "complete"


export type todolistDomainType = todolistType & {
    filter: filterValueType
    todolistEntityStatus: appStatusType
}

const initialState: todolistDomainType[] = []

const getTodoLists = createAppAsyncThunk<{ todolists: todolistType[] }, void>
('todolists/getTodo', async (_, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    try {
        dispatch(appActions.setStatus({status: "loading"}))
        const res = await todolistAPI.getTodolists()
        dispatch(appActions.setStatus({status: "success"}))

        return {todolists: res.data}
    } catch (e) {
        handleServerNetworkError(e, dispatch)
        return rejectWithValue(null)
    }
})

const addTodoList = createAppAsyncThunk<{ todolist: todolistType }, { todoListTitle: string }>
('todolists/addTodolist', async ({todoListTitle}, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    try {
        dispatch(appActions.setStatus({status: "loading"}))
        const res = await todolistAPI.createTodolist(todoListTitle)
        if (res.data.resultCode === 0) {
            dispatch(appActions.setStatus({status: "success"}))

            return {todolist: res.data.data.item}
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    } catch (e) {
        handleServerNetworkError(e, dispatch)
        return rejectWithValue(null)
    }
})

const deleteTodoList = createAppAsyncThunk<{ todolistId: string }, { todolistId: string }>
('todolists/deleteTodolist', async ({todolistId}, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    try {
        dispatch(appActions.setStatus({status: "loading"}))
        const res = await todolistAPI.deleteTodolist(todolistId)
        if (res.data.resultCode === 0) {
            dispatch(appActions.setStatus({status: "success"}))

            return {todolistId}
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    } catch (e) {
        handleServerNetworkError(e, dispatch)
        return rejectWithValue(null)
    }
})

const changeTodoListTitle = createAppAsyncThunk<{ todolistId: string, title: string }, { todolistId: string, title: string }>
('todolists/cahngeTodoTitle', async ({todolistId, title}, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    try {
        dispatch(appActions.setStatus({status: "loading"}))
        const res = await todolistAPI.updateTodolist(todolistId, title)
        if (res.data.resultCode === 0) {
            dispatch(appActions.setStatus({status: "success"}))

            return {todolistId, title}
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    } catch (e) {
        handleServerNetworkError(e, dispatch)
        return rejectWithValue(null)
    }
})

const slice = createSlice({
    name: "todolist",
    initialState,
    reducers: {
        // addTodolist: (state, action: PayloadAction<{ todoList: todolistType }>) => {
        //     // return [{...action.todoList, filter:"all", todolistEntityStatus:"idle"}, ...state]
        //     state.unshift({...action.payload.todoList, filter: "all", todolistEntityStatus: "idle"})
        // },
        deleteTodolist: (state, action: PayloadAction<{ todoListId: string }>) => {
            const indexTl = state.findIndex(tl => tl.id === action.payload.todoListId)
            if (indexTl !== -1) {
                state.splice(indexTl, 1)
            } //for deleting todolists after logout
        },
        // changeTodolistTitle: (state, action: PayloadAction<{ todoListId: string, title: string }>) => {
        //     let tl = state.find(tl => tl.id === action.payload.todoListId)
        //     if (tl) {
        //         tl.title = action.payload.title
        //     }
        // },
        changeTodolistFilter: (state, action: PayloadAction<{ todoListId: string, filter: filterValueType }>) => {
            let tl = state.find(tl => tl.id === action.payload.todoListId)
            if (tl) {
                tl.filter = action.payload.filter
            }
        },
        // getTodoList: (state, action: PayloadAction<{ todoLists: todolistType[] }>) => {
        //     return action.payload.todoLists.map((t) => ({...t, filter: "all", todolistEntityStatus: "idle"}))
        // },
        changeTodolistEntityStatus: (state, action: PayloadAction<{ todoListId: string, todolistEntityStatus: appStatusType }>) => {
            let tl = state.find(tl => tl.id === action.payload.todoListId)
            if (tl) {
                tl.todolistEntityStatus = action.payload.todolistEntityStatus
            }
        },
    },
    extraReducers: builder => {
        builder
            .addCase(getTodoLists.fulfilled, (state, action) => {
                return action.payload.todolists.map((t) => ({...t, filter: "all", todolistEntityStatus: "idle"}))
            })
            .addCase(addTodoList.fulfilled, (state, action) => {
                state.unshift({...action.payload.todolist, filter: "all", todolistEntityStatus: "idle"})
            })
            .addCase(deleteTodoList.fulfilled, (state, action) => {
                const indexTl = state.findIndex(tl => tl.id === action.payload.todolistId)
                if (indexTl !== -1) {
                    state.splice(indexTl, 1)
                }
            })
            .addCase(changeTodoListTitle.fulfilled, (state, action) => {
                const tl = state.find(tl => tl.id === action.payload.todolistId)
                if (tl) {
                    tl.title = action.payload.title
                }
            })
    }
})

export const todolistsReducer = slice.reducer
export const todolistActions = slice.actions
export const todolistsThunks = {getTodoLists, addTodoList, deleteTodoList, changeTodoListTitle}

//===========================THUNK=========================================================
// export const getTodoListTC = (): AppThunk => (dispatch) => {
//     dispatch(appActions.setStatus({status: "loading"}))
//     todolistAPI.getTodolists()
//         .then(res => {
//             dispatch(todolistActions.getTodoList({todoLists: res.data}))
//             dispatch(appActions.setStatus({status: "success"}))
//         })
//         .catch(err => {
//             handleServerNetworkError(err, dispatch)
//         })
// }

// export const addTodoListTC = (todoListTitle: string): AppThunk => (dispatch) => {
//     dispatch(appActions.setStatus({status: "loading"}))
//     todolistAPI.createTodolist(todoListTitle)
//         .then((res) => {
//             if (res.data.resultCode === 0) {
//                 dispatch(todolistActions.addTodolist({todoList: res.data.data.item}))
//                 dispatch(appActions.setStatus({status: "success"}))
//             } else {
//                 handleServerAppError(res.data, dispatch)
//             }
//         })
//         .catch(err => {
//             handleServerNetworkError(err, dispatch)
//         })
// }

// export const deleteTodoListTC = (todoListId: string): AppThunk => (dispatch) => {
//     dispatch(appActions.setStatus({status: "loading"}))
//     dispatch(todolistActions.changeTodolistEntityStatus({todoListId: todoListId, todolistEntityStatus: "loading"}))
//     todolistAPI.deleteTodolist(todoListId)
//         .then((res) => {
//             if (res.data.resultCode === 0) {
//                 dispatch(todolistActions.deleteTodolist({todoListId: todoListId}))
//                 dispatch(appActions.setStatus({status: "success"}))
//                 dispatch(todolistActions.changeTodolistEntityStatus({
//                     todoListId: todoListId,
//                     todolistEntityStatus: "success"
//                 }))
//             } else {
//                 handleServerAppError(res.data, dispatch)
//             }
//         })
//         .catch(err => {
//             handleServerNetworkError(err, dispatch)
//         })
// }

// export const changeTodoListTitleTC = (todoListId: string, title: string): AppThunk => (dispatch) => {
//     dispatch(todolistActions.changeTodolistEntityStatus({todoListId: todoListId, todolistEntityStatus: "loading"}))
//     dispatch(appActions.setStatus({status: "loading"}))
//     todolistAPI.updateTodolist(todoListId, title)
//         .then((res) => {
//             if (res.data.resultCode === 0) {
//                 dispatch(todolistActions.changeTodolistTitle({todoListId, title}))
//                 dispatch(todolistActions.changeTodolistEntityStatus({todoListId, todolistEntityStatus: "success"}))
//                 dispatch(appActions.setStatus({status: "success"}))
//             } else {
//                 handleServerAppError(res.data, dispatch)
//             }
//         })
//         .catch(err => {
//             handleServerNetworkError(err, dispatch)
//         })
// }