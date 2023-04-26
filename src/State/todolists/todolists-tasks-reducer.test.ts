import {todolistDomainType, todolistsReducer, todolistsThunks} from "./todolists-reducer";
import {tasksReducer, tasksType} from "../tasks/tasks-reducer";

test('ids should be equals', () => {
    const startTasksState: tasksType = {}
    const startTodolistsState: todolistDomainType[] = []

    const todoListState = {
        id: "1",
        title: 'new todolists',

        addedDate:"",
        order:1,

    }

    const action = todolistsThunks.addTodoList.fulfilled({todolist:todoListState}, 'requestId', {todoListTitle:'newTitle'})
    // const action = todolistsThunks.getTodoLists.fulfilled({todolists:startTodolistsState}, 'requestId', )

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.payload.todolist.id)
    expect(idFromTodolists).toBe(action.payload.todolist.id)
})
