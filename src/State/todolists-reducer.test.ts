import {v1} from "uuid";
import {
    addTodolistAT,
    changeTodolistFilterAT,
    changeTodolistTitleAT,
    deleteTodolistAT, todolistDomainType,
    todolistsReducer, filterValueType, changeEntityStatusAT
} from "./todolists-reducer";
import {todolistType} from "../api/todoist-api";
import {appStatusType} from "./app-reducer";

let todoListId_1 = v1()
let todoListId_2 = v1()
let initialState:todolistDomainType[]

beforeEach(() => {
    initialState=[
        {id: todoListId_1, title: "what to learn", filter: "all",addedDate: "1234", order: 1, entityStatus:"idle"},
        {id: todoListId_2, title: "what to buy", filter: "all",addedDate: "122", order: 1, entityStatus:"idle"},
    ]
})

test("new todolist should be added", () => {

    const newTitle = "qwerty"
    const todoListState: todolistType = {
        id: v1(),
        title: newTitle,
        addedDate:"",
        order:1
    }

    let action:addTodolistAT = {type:"ADD-TODOLIST",todoList: todoListState}

    const endState = todolistsReducer(initialState, action)

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTitle)
})

test("todolist should be remove", () => {
    let action:deleteTodolistAT = {type:"DELETE-TODOLIST", todoListId: todoListId_2}

    const endState = todolistsReducer(initialState, action)

    expect(endState.length).toBe(1)
    expect(endState[0].title).toBe("what to learn")
})

test("todolist title should be changed", () => {
    const newTitle = "new title"

    let action:changeTodolistTitleAT = {type:"CHANGE-TODOLIST-TITLE",todoListId:todoListId_2, title: newTitle}

    const endState = todolistsReducer(initialState, action)

    expect(endState.length).toBe(2)
    expect(endState[0].title).toBe("what to learn")
    expect(endState[1].title).toBe(newTitle)
})

test("todolist filter should be changed", () => {

    const newFilter:filterValueType = "active"

    let action:changeTodolistFilterAT = {type:"CHANGE-TODOLIST-FILTER",todoListId:todoListId_2, filter: newFilter}

    const endState = todolistsReducer(initialState, action)

    expect(endState.length).toBe(2)
    expect(endState[0].filter).toBe("all")
    expect(endState[1].filter).toBe(newFilter)
})

test("todolist entity status should be changed", () => {

    const newEntityStatus:appStatusType = "loading"

    let action:changeEntityStatusAT = {type:"CHANGE-ENTITY-STATUS",todoListId:todoListId_2, entityStatus: newEntityStatus}

    const endState = todolistsReducer(initialState, action)

    expect(endState.length).toBe(2)
    expect(endState[0].entityStatus).toBe(newEntityStatus)
})