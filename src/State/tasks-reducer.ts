import {tasksType} from "../App";
import {v1} from "uuid";
import {addTodolistAT, deleteTodolistAT, GetTodolistAT} from "./todolists-reducer";
import {Dispatch} from "redux";
import {taskApi, TaskPriorities, TaskStatuses, taskType, UpdateTaskModelType} from "../api/task-api";
import {AppRootState} from "../Store/Store";

export type addTaskAT = ReturnType<typeof addTaskAC>
export type deleteTaskAT = ReturnType<typeof deleteTaskAC>
// export type changeTaskTitleAT = ReturnType<typeof changeTaskTitleAC>
// export type changeTaskStatusAT = ReturnType<typeof changeTaskStatusAC>
type GetTasksAT = ReturnType<typeof getTasksAC>
export type updateTaskAT = ReturnType<typeof updateTaskAC>

export type ActionType = addTaskAT
    | deleteTaskAT
    // | changeTaskTitleAT
    // | changeTaskStatusAT
    | addTodolistAT
    | deleteTodolistAT
    | GetTodolistAT
    | GetTasksAT
    | updateTaskAT

const initialState: tasksType = {}

export const tasksReducer = (state = initialState, action: ActionType) => {
    switch (action.type) {
        case "ADD-TASK":
            // let newTask = {
            //     id: v1(),
            //     title: action.taskTitle,
            //     status: TaskStatuses.New,
            //     todoListId: "todolistId1",
            //     description: "",
            //     addedDate: "",
            //     deadline: "",
            //     order: 0,
            //     startDate: "",
            //     priority: TaskPriorities.Low
            // }
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}

        case "DELETE-TASK":
            return {...state, [action.todoListId]: [...state[action.todoListId].filter(t => t.id !== action.taskId)]}


        // case "CHANGE-TASK-TITLE":
        //     return {
        //         ...state,
        //         [action.todoListId]: state[action.todoListId].map(t => t.id === action.taskId ? {
        //             ...t,
        //             title: action.taskTitle
        //         } : t)
        //     }

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
            return {...state,
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
            return {...state, [action.todoListId]: action.tasks}
        default:
            return state
    }
}

export const addTaskAC = (task:taskType) => {
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

// export const changeTaskTitleAC = (todoListId: string, taskId: string, title: string) => {
//     return {
//         type: "CHANGE-TASK-TITLE",
//         todoListId: todoListId,
//         taskId: taskId,
//         taskTitle: title
//     } as const
// }

// export const changeTaskStatusAC = (todoListId: string, taskId: string, status: TaskStatuses) => {
//     return {
//         type: "CHANGE-TASK-STATUS",
//         todoListId: todoListId,
//         taskId: taskId,
//         status
//     } as const
// }

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

//================================THUNKS==========================================
export const getTasksTC = (todoListId: string) => (dispatch: Dispatch) => {
    taskApi.getTasks(todoListId)
        .then(res => {
            dispatch(getTasksAC(todoListId, res.data.items))
        })
}

export const createTaskTC = (todoListId: string, title: string) => (dispatch: Dispatch) => {
    taskApi.createTask(todoListId, title)
        .then(res => {
            dispatch(addTaskAC(res.data.data.item))
        })
}

export const deleteTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    taskApi.deleteTask(todolistId, taskId)
        .then(res => {
            dispatch(deleteTaskAC(todolistId, taskId))
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

export const updateTaskTC = (todolistId: string, taskId: string, model: UpdateTaskModelType, domainModel: UpdateDomainTaskModelType) => (dispatch: Dispatch, getState: () => AppRootState) => {
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
    taskApi.updateTask(todolistId, taskId, taskModel)
        .then((res) => {
            dispatch(updateTaskAC(todolistId, taskId, res.data.data.item))
        })
}
