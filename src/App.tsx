import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./Components/ToDoList/TodoList";
import {v1} from "uuid";
import {AddItem} from "./Components/AddTodolist/AddItem";
import {TaskPriorities, TaskStatuses} from "./api/task-api";
import {filterValueType, todolistDomainType} from "./State/todolists-reducer";
import {tasksType} from "./AppWithRedux";
import {taskDomainType} from "./State/tasks-reducer";


export type taskItemType = {
    id: string
    title: string
    isDone: boolean
}




function App() {

    let todoListId_1 = v1()
    let todoListId_2 = v1()

    const [todoLists, setTodoLists] = useState<todolistDomainType[]>([
        {id: todoListId_1, title: "what to learn", filter: "all", order:1, addedDate:"", todolistEntityStatus:"idle"},
        {id: todoListId_2, title: "what to buy", filter: "all", order:1, addedDate:"", todolistEntityStatus:"idle"},
    ])

    const [tasks, setTasks] = useState<tasksType>({

        [todoListId_1]: [
            {id: v1(), title: "Shoes", status:TaskStatuses.InProgress, todoListId:todoListId_1, description:"",addedDate: "", deadline: "", order:0, startDate:"", priority:TaskPriorities.Low, taskEntityStatus:"idle"},
            {id: v1(), title: "T-shirt", status:TaskStatuses.InProgress, todoListId:todoListId_1, description:"",addedDate: "", deadline: "", order:0, startDate:"", priority:TaskPriorities.Low, taskEntityStatus:"idle"},
            {id: v1(), title: "Skirt", status:TaskStatuses.InProgress, todoListId:todoListId_1, description:"",addedDate: "", deadline: "", order:0, startDate:"", priority:TaskPriorities.Low, taskEntityStatus:"idle"},
            {id: v1(), title: "Panties",status:TaskStatuses.InProgress, todoListId:todoListId_1, description:"",addedDate: "", deadline: "", order:0, startDate:"", priority:TaskPriorities.Low, taskEntityStatus:"idle"}
        ],
        [todoListId_2]: [
            {id: v1(), title: "Shoes", status:TaskStatuses.InProgress, todoListId:todoListId_2, description:"",addedDate: "", deadline: "", order:0, startDate:"", priority:TaskPriorities.Low, taskEntityStatus:"idle"},
            {id: v1(), title: "red bull", status:TaskStatuses.InProgress, todoListId:todoListId_2, description:"",addedDate: "", deadline: "", order:0, startDate:"", priority:TaskPriorities.Low, taskEntityStatus:"idle"},
            {id: v1(), title: "some shit", status:TaskStatuses.InProgress, todoListId:todoListId_2, description:"",addedDate: "", deadline: "", order:0, startDate:"", priority:TaskPriorities.Low, taskEntityStatus:"idle"},
        ],
    })

    const changeTodoListFilter = (filter: filterValueType, todoListId: string) => {
        setTodoLists(todoLists.map(t => t.id === todoListId ? {...t, filter: filter} : t))
    }

    const removeTask = (taskId: string, todoListId: string) => {
        setTasks({...tasks, [todoListId]: [...tasks[todoListId].filter(t => t.id !== taskId)]})
    }

    const addTask = (title: string, todoListId: string) => {

        let newTask:taskDomainType = {id: v1(), title: title, status: TaskStatuses.New,todoListId:todoListId_2, description:"",addedDate: "", deadline: "", order:0, startDate:"", priority:TaskPriorities.Low, taskEntityStatus:"idle"}
        setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]})
    }

    const changeCheckBox = (id: string, isDone: boolean, todoListId: string) => {
        setTasks({...tasks, [todoListId]: [...tasks[todoListId].map(t => t.id === id ? {...t, isDone: isDone} : t)]})
    }

    const addTodolist = (todoListTitle: string) => {
        let todoListId = v1()
        const newTodolist:todolistDomainType = {id: todoListId_1, title: todoListTitle, filter: "all", order:1, addedDate:"", todolistEntityStatus:"idle"}
        setTodoLists([...todoLists, newTodolist])

        setTasks({...tasks, [todoListId]: []})
    }

    const deleteTodolist = (todoListId: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListId))
        delete tasks[todoListId]
    }

    const changeTodoListTitle = (todoListId:string, title:string) => {
        setTodoLists(todoLists.map(t => t.id === todoListId ? {...t, todoListTitle:title} : t))
    }

    const changeTaskTitle = (todoListId:string, taskId:string, title:string) => {
        setTasks({...tasks, [todoListId]:tasks[todoListId].map(t => t.id === taskId ? {...t, title} : t)})
    }



    return (
        <div className="App">
            <AddItem callBack={addTodolist}/>
            {todoLists.map(t => {
                const changeFilter = () => {
                    if (t.filter === "active") {
                        return tasks[t.id].filter(t => !t.status)
                    } else if (t.filter === "complete") {
                        return tasks[t.id].filter(t => t.status)
                    } else return tasks[t.id]
                }
                const changeFilterVariable: Array<taskDomainType> = changeFilter()

                return (
                    <TodoList
                        key={t.id}
                        id={t.id}
                        title={t.title}
                        tasks={changeFilterVariable}
                        filter = {t.filter}
                        todolistEntityStatus={t.todolistEntityStatus}
                        // removeTask={removeTask}
                        changeTodoListFilter={changeTodoListFilter}
                        // addTask={addTask}
                        // changeCheckBox={changeCheckBox}
                        deleteTodolist={deleteTodolist}
                        changeTodoListStatus = {changeTodoListTitle}
                        // changeTaskTitle= {changeTaskTitle}
                    />
                )
            })}
        </div>
    );
}

export default App;
