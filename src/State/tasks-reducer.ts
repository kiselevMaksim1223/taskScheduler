import {
    addTodolistAT,
    changeTodolistEntityStatusAC,
    changeTodolistEntityStatusAT,
    deleteTodolistAT,
    GetTodolistAT
} from "./todolists-reducer";
import {Dispatch} from "redux";
import {taskApi, TaskPriorities, TaskStatuses, taskType, UpdateTaskModelType} from "../api/task-api";
import {AppRootState} from "../Store/Store";
import {appStatusType, setErrorAT, setStatusAC, setStatusAT} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../Utils/error-utils";

export type addTaskAT = ReturnType<typeof addTaskAC>
export type deleteTaskAT = ReturnType<typeof deleteTaskAC>
type GetTasksAT = ReturnType<typeof getTasksAC>
export type updateTaskAT = ReturnType<typeof updateTaskAC>
export type changeTaskEntityStatusAT = ReturnType<typeof changeTaskEntityStatusAC>

export type TasksActionType = addTaskAT
    | deleteTaskAT
    | addTodolistAT
    | deleteTodolistAT
    | GetTodolistAT
    | GetTasksAT
    | updateTaskAT
    | setErrorAT
    | setStatusAT
    | changeTaskEntityStatusAT
    | changeTodolistEntityStatusAT

export type taskDomainType = taskType & {taskEntityStatus: appStatusType}

export type tasksType = {
    [key: string]: taskDomainType[]
}

const initialState: tasksType = {}

export const tasksReducer = (state = initialState, action: TasksActionType):tasksType => {
    switch (action.type) {
        case "ADD-TASK":
            return {...state, [action.task.todoListId]:
                    [{...action.task, taskEntityStatus:"idle"}, ...state[action.task.todoListId]]
            }

        case "DELETE-TASK":
            return {...state, [action.todoListId]: [...state[action.todoListId].filter(t => t.id !== action.taskId)]}

        case "UPDATE-TASK":
            return {
                ...state,
                [action.todoListId]: [...state[action.todoListId].map(t => t.id === action.taskId ? {
                    ...t,
                    ...action.model
                } : t)]
            }

        //для добавления пустого массива тасок
        case "ADD-TODOLIST":
            return {
                ...state,
                [action.todoList.id]: []
            } // понять что с тасками

        case "DELETE-TODOLIST":
            let copyState = {...state}
            delete copyState[action.todoListId]
            return copyState

        case 'GET-TODOLISTS': {
            const stateCopy = {...state}
            action.todoLists.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy;
        }
        case "GET-TASKS":
            return {...state, [action.todoListId]: action.tasks.map(t => ({...t, taskEntityStatus:"idle"}))}

        case "CHANGE-TASK-ENTITY-STATUS":
            return {...state,
                [action.todoListId]:
                    state[action.todoListId].map(t => t.id === action.taskId ? {...t, taskEntityStatus:action.taskEntityStatus} :t)}

        default:
            return state
    }
}

export const addTaskAC = (task: taskType) => {
    return {
        type: "ADD-TASK",
        task
    } as const
}

export const deleteTaskAC = (todoListId: string, taskId: string) => {
    return {
        type: "DELETE-TASK",
        todoListId: todoListId,
        taskId: taskId
    } as const
}

export const updateTaskAC = (todoListId: string, taskId: string, model: UpdateDomainTaskModelType) => {
    return {
        type: "UPDATE-TASK",
        todoListId: todoListId,
        taskId: taskId,
        model
    } as const
}

export const getTasksAC = (todoListId: string, tasks: taskType[]) => {
    return {
        type: "GET-TASKS",
        tasks,
        todoListId
    } as const
}

export const changeTaskEntityStatusAC = (todoListId: string, taskId: string, taskEntityStatus:appStatusType) => {
    return{
        type:"CHANGE-TASK-ENTITY-STATUS",
        todoListId,
        taskId,
        taskEntityStatus
    } as const
}

//================================THUNKS==========================================
export const getTasksTC = (todoListId: string) => (dispatch: Dispatch<TasksActionType>) => {
    dispatch(setStatusAC("loading"))
    taskApi.getTasks(todoListId)
        .then(res => {
            dispatch(getTasksAC(todoListId, res.data.items))
            dispatch(setStatusAC("success"))
        })
        .catch(err => {
            handleServerNetworkError(err, dispatch)
        })
}

export const createTaskTC = (todoListId: string, title: string) => (dispatch: Dispatch<TasksActionType>) => {
    dispatch(setStatusAC("loading"))
    dispatch(changeTodolistEntityStatusAC(todoListId, "loading"))
    taskApi.createTask(todoListId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTaskAC(res.data.data.item))
                dispatch(setStatusAC("success"))
                dispatch(changeTodolistEntityStatusAC(todoListId, "success"))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(err => {
            handleServerNetworkError(err, dispatch)
        })
}

export const deleteTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch<TasksActionType>) => {
    dispatch(setStatusAC("loading"))
    dispatch(changeTaskEntityStatusAC(todolistId, taskId, "loading"))
    taskApi.deleteTask(todolistId, taskId)
        .then((res) => {
            if(res.data.resultCode === 0) {
                dispatch(deleteTaskAC(todolistId, taskId))
                dispatch(setStatusAC("success"))
                dispatch(changeTaskEntityStatusAC(todolistId, taskId, "success"))
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

export const updateTaskTC = (todolistId: string, taskId: string, model: UpdateTaskModelType, domainModel: UpdateDomainTaskModelType) => (dispatch: Dispatch<TasksActionType>, getState: () => AppRootState) => {
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

    dispatch(setStatusAC("loading"))
    dispatch(changeTaskEntityStatusAC(todolistId, taskId, "loading"))
    taskApi.updateTask(todolistId, taskId, taskModel)

        .then((res) => {
            if(res.data.resultCode === 0) {
                dispatch(updateTaskAC(todolistId, taskId, res.data.data.item))
                dispatch(setStatusAC("success"))
                dispatch(changeTaskEntityStatusAC(todolistId, taskId, "success"))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(err => {
            handleServerNetworkError(err, dispatch)
        })
}
