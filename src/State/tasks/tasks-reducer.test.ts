import {v1} from "uuid";
import {
    tasksActions,
    tasksReducer, tasksType,
} from "./tasks-reducer";
import {TaskPriorities, TaskStatuses} from "../../api/task-api";
import {todolistActions} from "../todolists/todolists-reducer";

let initialState: tasksType
let todoListId_1 = v1()
let todoListId_2 = v1()
beforeEach(() => {
    initialState = {
        [todoListId_1]: [
            {
                id: "1",
                title: "Shoes",
                status: TaskStatuses.Completed,
                todoListId: todoListId_1,
                description: "",
                addedDate: "",
                deadline: "",
                order: 0,
                startDate: "",
                priority: TaskPriorities.Low,
                taskEntityStatus: "idle"
            },
            {
                id: v1(),
                title: "T-shirt",
                status: TaskStatuses.Completed,
                todoListId: todoListId_1,
                description: "",
                addedDate: "",
                deadline: "",
                order: 0,
                startDate: "",
                priority: TaskPriorities.Low,
                taskEntityStatus: "idle"
            },
            {
                id: v1(),
                title: "Skirt",
                status: TaskStatuses.New,
                todoListId: todoListId_1,
                description: "",
                addedDate: "",
                deadline: "",
                order: 0,
                startDate: "",
                priority: TaskPriorities.Low,
                taskEntityStatus: "idle"
            },
            {
                id: v1(),
                title: "Panties",
                status: TaskStatuses.Completed,
                todoListId: todoListId_1,
                description: "",
                addedDate: "",
                deadline: "",
                order: 0,
                startDate: "",
                priority: TaskPriorities.Low,
                taskEntityStatus: "idle"
            }
        ],
        [todoListId_2]: [
            {
                id: v1(),
                title: "Shoes",
                status: TaskStatuses.Completed,
                todoListId: todoListId_2,
                description: "",
                addedDate: "",
                deadline: "",
                order: 0,
                startDate: "",
                priority: TaskPriorities.Low,
                taskEntityStatus: "idle"
            },
            {
                id: v1(),
                title: "red bull",
                status: TaskStatuses.Completed,
                todoListId: todoListId_2,
                description: "",
                addedDate: "",
                deadline: "",
                order: 0,
                startDate: "",
                priority: TaskPriorities.Low,
                taskEntityStatus: "idle"
            },
            {
                id: "3",
                title: "some shit",
                status: TaskStatuses.New,
                todoListId: todoListId_2,
                description: "",
                addedDate: "",
                deadline: "",
                order: 0,
                startDate: "",
                priority: TaskPriorities.Low,
                taskEntityStatus: "idle"
            },
        ],
    }
})

test("new task should be added", () => {

    const endState = tasksReducer(initialState, tasksActions.addTask({
        task: {
            id: v1(), title: "Shoes123", status: TaskStatuses.Completed,
            todoListId: todoListId_2, description: "", addedDate: "",
            deadline: "", order: 0, startDate: "", priority: TaskPriorities.Low
        }
    }))

    expect(endState[todoListId_2].length).toBe(4)
    expect(endState[todoListId_2][0].title).toBe("Shoes123")
})

test("task should be remove", () => {

    const endState = tasksReducer(initialState, tasksActions.deleteTask({todoListId: todoListId_2, taskId: "3"}))

    expect(endState[todoListId_2].length).toBe(2)
    expect(endState[todoListId_2][1].title).toBe("red bull")
})

test("task title should be changed", () => {

    const newTitle = "new title"
    const model = {
        title: newTitle
    }

    const endState = tasksReducer(initialState, tasksActions.updateTask({
        todoListId: todoListId_1,
        taskId: "1",
        model: model
    }))

    expect(endState[todoListId_1].length).toBe(4)
    expect(endState[todoListId_1][0].title).toBe(newTitle)
})

test("task checkbox status should be changed", () => {

    const model = {
        ...initialState,
        [todoListId_1]: [...initialState[todoListId_1].map(t => t.id === "3" ? {...t, status: TaskStatuses.New} : t)]
    }

    const endState: tasksType = tasksReducer(initialState, tasksActions.updateTask({
        todoListId: todoListId_1,
        taskId: "1",
        model: model
    }))

    expect(endState[todoListId_2][2].status).toBe(TaskStatuses.New)
})

test('property with todolistId should be deleted', () => {

    const endState = tasksReducer(initialState, todolistActions.deleteTodolist({todoListId: todoListId_2}))

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState[todoListId_2]).not.toBeDefined()
})

test('task entity status should changed', () => {

    const endState = tasksReducer(initialState, tasksActions.changeTaskEntityStatus({
        todoListId: todoListId_2,
        taskId: "3",
        taskEntityStatus: "loading"
    }))

    expect(endState[todoListId_2][2].taskEntityStatus).toBe("loading")
})
