
import {addTodolistAC, todolistDomainType, todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";
import {tasksType} from "../AppWithRedux";

test('ids should be equals', () => {
    const startTasksState: tasksType = {}
    const startTodolistsState: todolistDomainType[] = []

    const todoListState: todolistDomainType = {
        id: "1",
        title: 'new todolist',
        filter: "all",
        addedDate:"",
        order:1,
        todolistEntityStatus:"idle"
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
