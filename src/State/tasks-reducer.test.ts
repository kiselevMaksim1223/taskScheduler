import {tasksType} from "../App";
import {v1} from "uuid";
import {addTaskAT, deleteTaskAT, tasksReducer, updateTaskAT} from "./tasks-reducer";
import {deleteTodolistAC} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses} from "../api/task-api";

let initialState:tasksType
let todoListId_1 = v1()
let todoListId_2 = v1()
beforeEach(() => {
    initialState = {
        [todoListId_1]: [

            {id: "1", title: "Shoes", status:TaskStatuses.Completed, todoListId:"todolistId1", description:"",addedDate: "", deadline: "", order:0, startDate:"", priority:TaskPriorities.Low },
            {id: v1(), title: "T-shirt", status:TaskStatuses.Completed, todoListId:"todolistId1", description:"",addedDate: "", deadline: "", order:0, startDate:"", priority:TaskPriorities.Low},
            {id: v1(), title: "Skirt", status:TaskStatuses.New, todoListId:"todolistId1", description:"",addedDate: "", deadline: "", order:0, startDate:"", priority:TaskPriorities.Low},
            {id: v1(), title: "Panties", status:TaskStatuses.Completed, todoListId:"todolistId1", description:"",addedDate: "", deadline: "", order:0, startDate:"", priority:TaskPriorities.Low}
        ],
        [todoListId_2]: [
            {id: v1(), title: "Shoes", status:TaskStatuses.Completed, todoListId:"todolistId1", description:"",addedDate: "", deadline: "", order:0, startDate:"", priority:TaskPriorities.Low},
            {id: v1(), title: "red bull", status:TaskStatuses.Completed, todoListId:"todolistId1", description:"",addedDate: "", deadline: "", order:0, startDate:"", priority:TaskPriorities.Low},
            {id: "3", title: "some shit", status:TaskStatuses.New, todoListId:"todolistId1", description:"",addedDate: "", deadline: "", order:0, startDate:"", priority:TaskPriorities.Low},
        ],
    }
})

test("new task should be added", () => {


    const newTitle = "fnakjnfj"

    let action:addTaskAT = {type:"ADD-TASK", task: initialState[todoListId_2][0]}

    const endState = tasksReducer(initialState, action)

    expect(endState[todoListId_2].length).toBe(4)
    expect(endState[todoListId_2][0].title).toBe(newTitle)
})

test("task should be remove", () => {


    let action:deleteTaskAT = {type:"DELETE-TASK", todoListId: todoListId_2, taskId:"2"}

    const endState = tasksReducer(initialState, action)

    expect(endState[todoListId_2].length).toBe(2)
    expect(endState[todoListId_2][1].title).toBe("some shit")
})

test("task title should be changed", () => {

    const newTitle = "new title"
    const model = {
        ...initialState,
        [todoListId_1]:[...initialState[todoListId_1].map(t => t.id === "1" ? {...t, title:newTitle} : t)]
    }

    let action:updateTaskAT = {type:"UPDATE-TASK",todoListId:todoListId_2,taskId:"1", model: model}

    const endState = tasksReducer(initialState, action)

    expect(endState[todoListId_2].length).toBe(3)
    expect(endState[todoListId_2][0].title).toBe(newTitle)
    expect(endState[todoListId_1][0].title).toBe("Shoes")
})

test("task checkbox status should be changed", () => {


    const model = {
        ...initialState,
        [todoListId_1]:[...initialState[todoListId_1].map(t => t.id === "3" ? {...t, status:TaskStatuses.New} : t)]
    }

    let action:updateTaskAT = {type:"UPDATE-TASK",todoListId:todoListId_2, taskId:"3", model}

    const endState:tasksType = tasksReducer(initialState, action)

    expect(endState[todoListId_2][2].status).toBe(TaskStatuses.New)
})

test('property with todolistId should be deleted', () => {


    const action = deleteTodolistAC('todolistId2')

    const endState = tasksReducer(initialState, action)


    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})
