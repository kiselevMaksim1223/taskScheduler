import {v1} from "uuid";
import {tasksActions, tasksReducer, tasksThunks, tasksType,} from "./tasks-reducer";
import {TaskPriorities, TaskStatuses} from "../../api/task-api";
import {todolistsThunks} from "../todolists/todolists-reducer";

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

    const endState = tasksReducer(initialState, tasksThunks.createTask.fulfilled({
        task: {
            id: v1(), title: "Shoes123", status: TaskStatuses.Completed,
            todoListId: todoListId_2, description: "", addedDate: "",
            deadline: "", order: 0, startDate: "", priority: TaskPriorities.Low
        }
    }, "requestId", {todoListId: todoListId_2, title: "Shoes123"}))

    expect(endState[todoListId_2].length).toBe(4)
    expect(endState[todoListId_2][0].title).toBe("Shoes123")
})

test("task should be remove", () => {

    const endState = tasksReducer(initialState, tasksThunks.deleteTask.fulfilled
    ({todolistId: todoListId_2, taskId: "3"}, "requestId", {todolistId: todoListId_2, taskId: "3"}))

    expect(endState[todoListId_2].length).toBe(2)
    expect(endState[todoListId_2][1].title).toBe("red bull")
})

test("task title should be changed", () => {

    const newTitle = "new title"
    const model = {
        title: newTitle
    }

    const endState = tasksReducer(initialState, tasksThunks.updateTask.fulfilled({
            todolistId: todoListId_1,
            taskId: '1',
            model: model
        },
        'requestId',
        {
            todolistId: todoListId_1,
            taskId: '1',
            model: initialState[todoListId_1][0],
            domainModel: model
        }))

    expect(endState[todoListId_1].length).toBe(4)
    expect(endState[todoListId_1][0].title).toBe(newTitle)
})

test("task checkbox status should be changed", () => {

    // const model = {
    //     ...initialState,
    //     [todoListId_1]: [...initialState[todoListId_1].map(t => t.id === "3" ? {...t, status: TaskStatuses.New} : t)]
    // }

    // const domainModel:UpdateDomainTaskModelType = {}
    // const taskModel: UpdateTaskModelType = { //а можно так получить таску
    //     title: model.title,
    //     status: model.status,
    //     startDate: model.startDate,
    //     priority: model.priority,
    //     deadline: model.deadline,
    //     description: model.description,
    //     ...domainModel    //domainModel это объект с типом как у обычной model,
    //                       // но с необязательными полями чтобы мы могли передать только то что хотим заменить
    // }

    const endState: tasksType = tasksReducer(initialState, tasksThunks.updateTask.fulfilled({
        todolistId: todoListId_1,
        taskId: "1",
        model: {status: TaskStatuses.New}
    }, "requestId", {
        todolistId: todoListId_1,
        taskId: "1",
        model: initialState[todoListId_1][0],
        domainModel: {status: TaskStatuses.New}
    }))

    expect(endState[todoListId_1][0].status).toBe(TaskStatuses.New)
})

test('property with todolistId should be deleted', () => {

    const endState = tasksReducer(initialState, todolistsThunks.deleteTodoList.fulfilled
    ({todolistId: todoListId_2}, 'requestId', {todolistId: todoListId_2}))

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
