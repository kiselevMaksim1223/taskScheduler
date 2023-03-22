import {tasksType} from "../App";
import {addTodolistAC, todolistDomainType, todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";

test('ids should be equals', () => {
    const startTasksState: tasksType = {}
    const startTodolistsState: todolistDomainType[] = []

    const todoListState: todolistDomainType = {
        id: "1",
        title: 'new todolist',
        filter: "all",
        addedDate:"",
        order:1
    }

    const action = addTodolistAC(todoListState)

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.todoList.id)
    expect(idFromTodolists).toBe(action.todoList.id)
})
