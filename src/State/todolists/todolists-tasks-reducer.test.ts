import {todolistActions, todolistDomainType, todolistsReducer} from "./todolists-reducer";
import {tasksReducer, tasksType} from "../tasks/tasks-reducer";

test('ids should be equals', () => {
    const startTasksState: tasksType = {}
    const startTodolistsState: todolistDomainType[] = []

    const todoListState: todolistDomainType = {
        id: "1",
        title: 'new todolists',
        filter: "all",
        addedDate:"",
        order:1,
        todolistEntityStatus:"idle"
    }

    const action = todolistActions.addTodolist({todoList:todoListState})

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.payload.todoList.id)
    expect(idFromTodolists).toBe(action.payload.todoList.id)
})
