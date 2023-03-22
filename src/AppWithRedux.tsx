import React, {useCallback, useEffect, useState} from 'react';
import './App.css';
import {TodoList} from "./Components/ToDoList/TodoList";
import {AddItem} from "./Components/AddTodolist/AddItem";
import {useSelector} from "react-redux";
import {AppRootState, useAppDispatch, useAppSelector} from "./Store/Store";
import {
    addTodolistAC, addTodoListTC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, changeTodoListTitleTC,
    deleteTodolistAC, deleteTodoListTC, filterValueType, getTodoListTC, todolistDomainType
} from "./State/todolists-reducer";
import {taskType} from "./api/task-api";


export type tasksType = {
    [key:string]:taskType[]
}

const AppWithRedux = React.memo(() =>  {

    console.log("app")

    const todoLists = useSelector<AppRootState, todolistDomainType[]>(state => state.todoLists)
    const tasks = useAppSelector<tasksType>(state => state.tasks) // кастомный хук
    const dispatch = useAppDispatch(); // вставили кастомный хук из store

    const changeTodoListFilter = useCallback((filter: filterValueType, todoListId: string) => {
        dispatch(changeTodolistFilterAC(todoListId, filter))
    }, [dispatch])

    const addTodolist = useCallback((todoListTitle: string) => {
        // dispatch(addTodolistAC(todoListTitle))
        dispatch(addTodoListTC(todoListTitle))
    }, [dispatch])

    const deleteTodolist = useCallback((todoListId: string) => {
        // dispatch(deleteTodolistAC(todoListId))
        dispatch(deleteTodoListTC(todoListId))
    }, [dispatch])

    const changeTodoListTitle = useCallback((todoListId:string, title:string) => {
        // dispatch(changeTodolistTitleAC(todoListId, title))
        dispatch(changeTodoListTitleTC(todoListId, title))
    }, [dispatch])

    useEffect(() => {
        dispatch(getTodoListTC())
    }, [])



    return (
        <div className="App">
            <AddItem callBack={addTodolist}/>
            {todoLists.map(t => {

                return (
                    <TodoList
                        key={t.id}
                        id={t.id}
                        title={t.title}
                        tasks={tasks[t.id]}
                        filter = {t.filter}

                        changeTodoListFilter={changeTodoListFilter}
                        deleteTodolist={deleteTodolist}
                        changeTodoListStatus = {changeTodoListTitle}
                    />
                )
            })}
        </div>
    );
})

export default AppWithRedux;
