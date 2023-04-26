import {taskApi, TaskPriorities, TaskStatuses, taskType, UpdateTaskModelType} from "../../api/task-api";
import {appActions, appStatusType} from "../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../Utils/error-utils";
import {todolistActions, todolistsThunks} from "../todolists/todolists-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {createAppAsyncThunk} from "../../Utils/create-app-asynk-thunk";

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

export type taskDomainType = taskType & { taskEntityStatus: appStatusType }

export type tasksType = {
    [key: string]: taskDomainType[]
}

const initialState: tasksType = {}

const getTasks = createAppAsyncThunk<{ todoListId: string, tasks: taskType[] }, { todoListId: string }>
("tasks/getTasks", async ({todoListId}, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI

    try {
        dispatch(appActions.setStatus({status: "loading"}))
        const res = await taskApi.getTasks(todoListId)
        dispatch(appActions.setStatus({status: "success"}))
        const tasks = res.data.items
        return {todoListId, tasks}
    } catch (e) {
        handleServerNetworkError(e, dispatch)
        return rejectWithValue(null)
    }
})

const createTask = createAppAsyncThunk<{ task: taskType }, { todoListId: string, title: string }>
("tasks/createTask", async ({todoListId, title}, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI

    try {
        dispatch(appActions.setStatus({status: "loading"}))
        dispatch(todolistActions.changeTodolistEntityStatus({todoListId, todolistEntityStatus: "loading"}))
        const res = await taskApi.createTask(todoListId, title)
        if (res.data.resultCode === 0) {
            dispatch(appActions.setStatus({status: "success"}))
            dispatch(todolistActions.changeTodolistEntityStatus({todoListId, todolistEntityStatus: "success"}))
            const task = res.data.data.item
            return {task}
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    } catch (e) {
        handleServerNetworkError(e, dispatch)
        return rejectWithValue(null)
    }
})

const deleteTask = createAppAsyncThunk<{ todolistId: string, taskId: string }, { todolistId: string, taskId: string }>
("tasks/deleteTask", async ({todolistId, taskId}, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    try {
        dispatch(appActions.setStatus({status: "loading"}))
        dispatch(tasksActions.changeTaskEntityStatus({todoListId: todolistId, taskId, taskEntityStatus: "loading"}))
        const res = await taskApi.deleteTask(todolistId, taskId)
        if (res.data.resultCode === 0) {
            dispatch(appActions.setStatus({status: "success"}))
            dispatch(tasksActions.changeTaskEntityStatus({todoListId: todolistId, taskId, taskEntityStatus: "success"}))
            return {todolistId, taskId}
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    } catch (e) {
        handleServerNetworkError(e, dispatch)
        return rejectWithValue(null)
    }
})

const updateTask = createAppAsyncThunk<
    { todolistId: string, taskId: string, model: UpdateDomainTaskModelType },
    { todolistId: string, taskId: string, model: UpdateTaskModelType, domainModel: UpdateDomainTaskModelType }
>
("tasks/updateTask", async ({todolistId, taskId, model, domainModel}, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    // const taskModel = getState().tasks[todolistId].find(t => t.id === taskId) // можно так получить таску

    const taskModel: UpdateTaskModelType = { //а можно так получить таску
        title: model.title,
        status: model.status,
        startDate: model.startDate,
        priority: model.priority,
        deadline: model.deadline,
        description: model.description,
        ...domainModel    //domainModel это объект с типом как у обычной model,
                          // но с необязательными полями чтобы мы могли передать только то что хотим заменить
    }

    try {
        dispatch(appActions.setStatus({status: "loading"}))
        dispatch(tasksActions.changeTaskEntityStatus({todoListId: todolistId, taskId, taskEntityStatus: "loading"}))
        const res = await taskApi.updateTask(todolistId, taskId, taskModel)
        if (res.data.resultCode === 0) {
            dispatch(appActions.setStatus({status: "success"}))
            dispatch(tasksActions.changeTaskEntityStatus({todoListId: todolistId, taskId, taskEntityStatus: "success"}))

            return {todolistId, taskId, model:domainModel}
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
    name: "tasks",
    initialState,
    reducers: {
        changeTaskEntityStatus: (state, action: PayloadAction<{ todoListId: string, taskId: string, taskEntityStatus: appStatusType }>) => {
            const index = state[action.payload.todoListId].findIndex(t => t.id === action.payload.taskId)
            if (index !== -1) {
                state[action.payload.todoListId][index].taskEntityStatus = action.payload.taskEntityStatus
            }
        },
    },
    extraReducers: (builder) => {
        builder

            //==========FOR TASKS==============================================================
            .addCase(getTasks.fulfilled, (state, action) => {
                state[action.payload.todoListId] = action.payload.tasks.map(t => ({...t, taskEntityStatus: "idle"}))
            })
            .addCase(createTask.fulfilled, (state, action) => {
                state[action.payload.task.todoListId].unshift({...action.payload.task, taskEntityStatus: "idle"})
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                const index = state[action.payload.todolistId].findIndex(t => t.id === action.payload.taskId)
                if (index != -1) {
                    state[action.payload.todolistId].splice(index, 1)
                }
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                const index = state[action.payload.todolistId].findIndex(t => t.id === action.payload.taskId)
                if (index !== -1) {
                    state[action.payload.todolistId][index] = {...state[action.payload.todolistId][index], ...action.payload.model}
                }
            })

            //==========FOR TODOLISTS==========================================================
            .addCase(todolistsThunks.addTodoList.fulfilled, (state, action) => {
                state[action.payload.todolist.id] = []
            })
            .addCase(todolistsThunks.deleteTodoList.fulfilled, (state, action) => {
                delete state[action.payload.todolistId]
            })
            .addCase(todolistsThunks.getTodoLists.fulfilled, (state, action) => {
                action.payload.todolists.forEach((tl) => state[tl.id] = [])
            })
            .addCase(todolistActions.deleteTodolist, (state, action) => {
                delete state[action.payload.todoListId]
            }) //for deleting tasks after logout
    },
})

export const tasksReducer = slice.reducer
export const tasksActions = slice.actions
export const tasksThunks = {getTasks, createTask, deleteTask, updateTask}


//================================THUNKS==========================================
// export const getTasksTC = (todoListId: string): AppThunk => (dispatch) => {
//     dispatch(appActions.setStatus({status: "loading"}))
//     taskApi.getTasks(todoListId)
//         .then(res => {
//             dispatch(tasksActions.getTasks({todoListId, tasks: res.data.items}))
//             dispatch(appActions.setStatus({status: "success"}))
//         })
//         .catch(err => {
//             handleServerNetworkError(err, dispatch)
//         })
// }

// export const createTaskTC = (todoListId: string, title: string): AppThunk => (dispatch) => {
//     dispatch(appActions.setStatus({status: "loading"}))
//     dispatch(todolistActions.changeTodolistEntityStatus({todoListId, todolistEntityStatus: "loading"}))
//     taskApi.createTask(todoListId, title)
//         .then(res => {
//             if (res.data.resultCode === 0) {
//                 dispatch(tasksActions.addTask({task: res.data.data.item}))
//                 dispatch(appActions.setStatus({status: "success"}))
//                 dispatch(todolistActions.changeTodolistEntityStatus({todoListId, todolistEntityStatus: "success"}))
//             } else {
//                 handleServerAppError(res.data, dispatch)
//             }
//         })
//         .catch(err => {
//             handleServerNetworkError(err, dispatch)
//         })
// }

// export const deleteTaskTC = (todolistId: string, taskId: string): AppThunk => (dispatch) => {
//     dispatch(appActions.setStatus({status: "loading"}))
//     dispatch(tasksActions.changeTaskEntityStatus({todoListId: todolistId, taskId, taskEntityStatus: "loading"}))
//     taskApi.deleteTask(todolistId, taskId)
//         .then((res) => {
//             if (res.data.resultCode === 0) {
//                 dispatch(tasksActions.deleteTask({todoListId: todolistId, taskId}))
//                 dispatch(appActions.setStatus({status: "success"}))
//                 dispatch(tasksActions.changeTaskEntityStatus({
//                     todoListId: todolistId,
//                     taskId,
//                     taskEntityStatus: "success"
//                 }))
//             } else {
//                 handleServerAppError(res.data, dispatch)
//             }
//         })
//         .catch(err => {
//             handleServerNetworkError(err, dispatch)
//         })
// }



// export const updateTaskTC = (todolistId: string, taskId: string, model: UpdateTaskModelType, domainModel: UpdateDomainTaskModelType): AppThunk => async (dispatch, getState: () => AppRootState) => {
//     // const taskModel = getState().tasks[todolistId].find(t => t.id === taskId) // можно так получить таску
//
//     const taskModel: UpdateTaskModelType = { //а можно так получить таску
//         title: model.title,
//         status: model.status,
//         startDate: model.startDate,
//         priority: model.priority,
//         deadline: model.deadline,
//         description: model.description,
//         ...domainModel    //domainModel это объект с типом как у обычной model,
//                           // но с необязательными полями чтобы мы могли передать только то что хотим заменить
//     }
//
//     dispatch(appActions.setStatus({status: "loading"}))
//     dispatch(tasksActions.changeTaskEntityStatus({todoListId: todolistId, taskId, taskEntityStatus: "loading"}))
//
//     const res = await taskApi.updateTask(todolistId, taskId, taskModel)
//     try {
//         if (res.data.resultCode === 0) {
//             dispatch(tasksActions.updateTask({todoListId: todolistId, taskId, model: res.data.data.item}))
//             dispatch(appActions.setStatus({status: "success"}))
//             dispatch(tasksActions.changeTaskEntityStatus({todoListId: todolistId, taskId, taskEntityStatus: "success"}))
//         } else {
//             handleServerAppError(res.data, dispatch)
//         }
//     } catch (err: any) {
//         handleServerNetworkError(err, dispatch)
//     }
// }
