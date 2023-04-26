import React, {FC, useEffect} from "react";
import {AddItem} from "../../AddTodolist/AddItem";
import {taskDomainType, tasksThunks} from "../../../State/tasks/tasks-reducer";
import {todolistActions, todolistDomainType} from "../../../State/todolists/todolists-reducer";
import {useActions} from "../../../Utils/hooks/useActions";
import {useAppSelector} from "../../../Utils/hooks/useAppSelector";
import {selectIsLoginIn} from "../../../State/auth/auth-selectors";
import {TodolistTitle} from "./TodolistTitle/TodolistTitle";
import {FilterButtons} from "./FilterButtons/FilterButtons";
import {Tasks} from "./Tasks/Tasks";

type propsType = {
    tasks: Array<taskDomainType>
    todolist: todolistDomainType
}

export const TodoList:FC<propsType> = React.memo(({tasks, todolist}) => {

    const isLoginIn = useAppSelector(selectIsLoginIn)
    const {getTasks, createTask} = useActions(tasksThunks)
    const {deleteTodolist} = useActions(todolistActions)

    console.log("todolist")

    useEffect(() => {
        if(isLoginIn) {
          getTasks({todoListId:todolist.id})
        }

        return ()=>{
            deleteTodolist({todoListId:todolist.id})  //cleanup function for deleting all then logout
        }
    }, [])

    const addTask = (title: string) => {
       createTask({todoListId:todolist.id, title})
    }

    return (
        <div className={"Todolist"}>
            <TodolistTitle todolist={todolist}/>
            <AddItem callBack={addTask} disabled={todolist.todolistEntityStatus === "loading"}/>
            <Tasks todolist={todolist} tasks={tasks}/>
            <FilterButtons todolist={todolist}/>
        </div>
    )
})