import {v1} from "uuid";
import {
    todolistDomainType,
    todolistsReducer, filterValueType, todolistActions, todolistsThunks
} from "./todolists-reducer";
import {todolistType} from "../../api/todoist-api";
import {appStatusType} from "../app/app-reducer";

let todoListId_1 = v1()
let todoListId_2 = v1()
let initialState: todolistDomainType[]

beforeEach(() => {
    initialState = [
        {
            id: todoListId_1,
            title: "what to learn",
            filter: "all",
            addedDate: "1234",
            order: 1,
            todolistEntityStatus: "idle"
        },
        {
            id: todoListId_2,
            title: "what to buy",
            filter: "all",
            addedDate: "122",
            order: 1,
            todolistEntityStatus: "idle"
        },
    ]
})

test("new todolists should be added", () => {

    const newTitle = "qwerty"
    const todoListState: todolistType = {
        id: v1(),
        title: newTitle,
        addedDate: "",
        order: 1
    }

    const endState = todolistsReducer(initialState, todolistsThunks.addTodoList.fulfilled
    ({todolist: todoListState}, 'requestId', {todoListTitle: newTitle}))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTitle)
})

test("todolists should be remove", () => {

    const endState = todolistsReducer(initialState, todolistsThunks.deleteTodoList.fulfilled
    ({todolistId: todoListId_2}, 'requestId', {todolistId: todoListId_2}))

    expect(endState.length).toBe(1)
    expect(endState[0].title).toBe("what to learn")
})

test("todolists title should be changed", () => {
    const newTitle = "new title"


    const endState = todolistsReducer(initialState, todolistsThunks.changeTodoListTitle.fulfilled({
            todolistId: todoListId_2,
            title: newTitle
        },
        'requestId',
        {
            todolistId: todoListId_2,
            title: newTitle
        },
    ))

    expect(endState.length).toBe(2)
    expect(endState[0].title).toBe("what to learn")
    expect(endState[1].title).toBe(newTitle)
})

test("todolists filter should be changed", () => {

    const newFilter: filterValueType = "active"

    const endState = todolistsReducer(initialState, todolistActions.changeTodolistFilter({
        todoListId: todoListId_2,
        filter: newFilter
    }))

    expect(endState.length).toBe(2)
    expect(endState[0].filter).toBe("all")
    expect(endState[1].filter).toBe(newFilter)
})

test("todolists entity status should be changed", () => {

    const newEntityStatus: appStatusType = "loading"

    const endState = todolistsReducer(initialState, todolistActions.changeTodolistEntityStatus({
        todoListId: todoListId_2,
        todolistEntityStatus: newEntityStatus
    }))

    expect(endState.length).toBe(2)
    expect(endState[1].todolistEntityStatus).toBe(newEntityStatus)
})