import {taskApi, TaskPriorities, TaskStatuses, taskType, UpdateTaskModelType} from "../api/task-api";
import {AppRootState, AppThunk} from "../Store/Store";
import {appActions, appStatusType} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../Utils/error-utils";
import {todolistActions} from "./todolists-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type taskDomainType = taskType & { taskEntityStatus: appStatusType }

export type tasksType = {
    [key: string]: taskDomainType[]
}

const initialState: tasksType = {}

const slice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<{ task: taskType }>) => {
            state[action.payload.task.todoListId].unshift({...action.payload.task, taskEntityStatus: "idle"})
        },
        deleteTask: (state, action: PayloadAction<{ todoListId: string, taskId: string }>) => {
            const index = state[action.payload.todoListId].findIndex(t => t.id === action.payload.taskId)
            if (index != -1) {
                state[action.payload.todoListId].splice(index, 1)
            }
        },
        updateTask: (state, action: PayloadAction<{ todoListId: string, taskId: string, model: UpdateDomainTaskModelType }>) => {
            const index = state[action.payload.todoListId].findIndex(t => t.id === action.payload.taskId)
            if (index !== -1) {
                state[action.payload.todoListId][index] = {...state[action.payload.todoListId][index], ...action.payload.model}
            }
        },
        getTasks: (state, action: PayloadAction<{ todoListId: string, tasks: taskType[] }>) => {
            state[action.payload.todoListId] = action.payload.tasks.map(t => ({...t, taskEntityStatus: "idle"}))
        },
        changeTaskEntityStatus: (state, action: PayloadAction<{ todoListId: string, taskId: string, taskEntityStatus: appStatusType }>) => {
            const index = state[action.payload.todoListId].findIndex(t => t.id === action.payload.taskId)
            if(index !== -1){
                state[action.payload.todoListId][index].taskEntityStatus = action.payload.taskEntityStatus
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(todolistActions.addTodolist, (state, action) => {
                state[action.payload.todoList.id] = []
            })
            .addCase(todolistActions.deleteTodolist, (state, action) => {
                delete state[action.payload.todoListId]
            })
            .addCase(todolistActions.getTodoList, (state, action) => {
                action.payload.todoLists.forEach(tl => state[tl.id] = [])
            })
    },
})

export const tasksReducer = slice.reducer
export const tasksActions = slice.actions


//================================THUNKS==========================================
export const getTasksTC = (todoListId: string): AppThunk => (dispatch) => {
    dispatch(appActions.setStatus({status: "loading"}))
    taskApi.getTasks(todoListId)
        .then(res => {
            dispatch(tasksActions.getTasks({todoListId, tasks:res.data.items}))
            dispatch(appActions.setStatus({status: "success"}))
        })
        .catch(err => {
            handleServerNetworkError(err, dispatch)
        })
}

export const createTaskTC = (todoListId: string, title: string): AppThunk => (dispatch) => {
    dispatch(appActions.setStatus({status: "loading"}))
    dispatch(todolistActions.changeTodolistEntityStatus({todoListId, todolistEntityStatus: "loading"}))
    taskApi.createTask(todoListId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(tasksActions.addTask({task:res.data.data.item}))
                dispatch(appActions.setStatus({status: "success"}))
                dispatch(todolistActions.changeTodolistEntityStatus({todoListId, todolistEntityStatus: "success"}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(err => {
            handleServerNetworkError(err, dispatch)
        })
}

export const deleteTaskTC = (todolistId: string, taskId: string): AppThunk => (dispatch) => {
    dispatch(appActions.setStatus({status: "loading"}))
    dispatch(tasksActions.changeTaskEntityStatus({todoListId:todolistId, taskId, taskEntityStatus:"loading"}))
    taskApi.deleteTask(todolistId, taskId)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(tasksActions.deleteTask({todoListId:todolistId, taskId}))
                dispatch(appActions.setStatus({status: "success"}))
                dispatch(tasksActions.changeTaskEntityStatus({todoListId:todolistId, taskId, taskEntityStatus:"success"}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(err => {
            handleServerNetworkError(err, dispatch)
        })
}

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

export const updateTaskTC = (todolistId: string, taskId: string, model: UpdateTaskModelType, domainModel: UpdateDomainTaskModelType): AppThunk => (dispatch, getState: () => AppRootState) => {
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

    dispatch(appActions.setStatus({status: "loading"}))
    dispatch(tasksActions.changeTaskEntityStatus({todoListId:todolistId, taskId, taskEntityStatus:"loading"}))
    taskApi.updateTask(todolistId, taskId, taskModel)

        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(tasksActions.updateTask({todoListId:todolistId, taskId, model:res.data.data.item}))
                dispatch(appActions.setStatus({status: "success"}))
                dispatch(tasksActions.changeTaskEntityStatus({todoListId:todolistId, taskId, taskEntityStatus:"success"}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(err => {
            handleServerNetworkError(err, dispatch)
        })
}
