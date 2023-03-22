
import {v1} from "uuid";
import {
    TodoListActionType,
    addTodolistAT,
    changeTodolistFilterAT,
    changeTodolistTitleAT,
    deleteTodolistAT, todolistDomainType,
    todolistsReducer, filterValueType
} from "./todolists-reducer";
import {todolistType} from "../api/todoist-api";


test("new todolist should be added", () => {

    let todoListId_1 = v1()
    let todoListId_2 = v1()

    const initialState:todolistDomainType[] = [
        {id: todoListId_1, title: "what to learn", filter: "all",addedDate: "1234", order: 1},
        {id: todoListId_2, title: "what to buy", filter: "all",addedDate: "122", order: 1},
    ]
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

    let todoListId_1 = v1()
    let todoListId_2 = v1()

    const initialState:todolistDomainType[] = [
        {id: todoListId_1, title: "what to learn", filter: "all",addedDate: "1234", order: 1},
        {id: todoListId_2, title: "what to buy", filter: "all",addedDate: "122", order: 1},
    ]

    let action:deleteTodolistAT = {type:"DELETE-TODOLIST", todoListId: todoListId_2}

    const endState = todolistsReducer(initialState, action)

    expect(endState.length).toBe(1)
    expect(endState[0].title).toBe("what to learn")
})

test("todolist title should be changed", () => {

    let todoListId_1 = v1()
    let todoListId_2 = v1()

    const initialState:todolistDomainType[] = [
        {id: todoListId_1, title: "what to learn", filter: "all",addedDate: "1234", order: 1},
        {id: todoListId_2, title: "what to buy", filter: "all",addedDate: "122", order: 1},
    ]

    const newTitle = "new title"

    let action:changeTodolistTitleAT = {type:"CHANGE-TODOLIST-TITLE",todoListId:todoListId_2, title: newTitle}

    const endState = todolistsReducer(initialState, action)

    expect(endState.length).toBe(2)
    expect(endState[0].title).toBe("what to learn")
    expect(endState[1].title).toBe(newTitle)
})

test("todolist filter should be changed", () => {

    let todoListId_1 = v1()
    let todoListId_2 = v1()

    const initialState:todolistDomainType[] = [
        {id: todoListId_1, title: "what to learn", filter: "all",addedDate: "1234", order: 1},
        {id: todoListId_2, title: "what to buy", filter: "all",addedDate: "122", order: 1},
    ]

    const newFilter:filterValueType = "active"

    let action:changeTodolistFilterAT = {type:"CHANGE-TODOLIST-FILTER",todoListId:todoListId_2, filter: newFilter}

    const endState = todolistsReducer(initialState, action)

    expect(endState.length).toBe(2)
    expect(endState[0].filter).toBe("all")
    expect(endState[1].filter).toBe(newFilter)
})