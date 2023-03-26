import React, {FC, useCallback, useEffect} from 'react';
import {Grid, Paper} from "@mui/material";
import {AddItem} from "../AddTodolist/AddItem";
import {TodoList} from "./ToDoList/TodoList";
import {useAppDispatch, useAppSelector} from "../../Store/Store";
import {
    addTodoListTC,
    changeTodolistFilterAC,
    changeTodoListTitleTC,
    deleteTodoListTC,
    filterValueType,
    getTodoListTC,
    todolistDomainType
} from "../../State/todolists-reducer";
import {appStatusType} from "../../State/app-reducer";
import {tasksType} from "../../State/tasks-reducer";
import {Navigate} from "react-router-dom";

type todolistsType = {
    requestStatus: appStatusType
}

export const Todolists: FC<todolistsType> = ({requestStatus}) => {
    console.log("todolists")
    const todoLists = useAppSelector<todolistDomainType[]>(state => state.todoLists)
    const tasks = useAppSelector<tasksType>(state => state.tasks) // кастомный хук из store
    const isLoginIn = useAppSelector<boolean>(state => state.auth.isLoginIn)


    const dispatch = useAppDispatch(); // вставили кастомный хук из store


    const changeTodoListFilter = useCallback((filter: filterValueType, todoListId: string) => {
        dispatch(changeTodolistFilterAC(todoListId, filter))
    }, [dispatch])

    const addTodolist = useCallback((todoListTitle: string) => {
        dispatch(addTodoListTC(todoListTitle))
    }, [dispatch])

    const deleteTodolist = useCallback((todoListId: string) => {
        dispatch(deleteTodoListTC(todoListId))
    }, [dispatch])

    const changeTodoListTitle = useCallback((todoListId: string, title: string) => {
        dispatch(changeTodoListTitleTC(todoListId, title))
    }, [dispatch])

    useEffect(() => {
        if (isLoginIn) {                //если залогинены успешно, то сделать запрос за тудулистами
            dispatch(getTodoListTC())
        }
    }, [])


    if (!isLoginIn) {
        return <Navigate to={"/login"}/>
    }

    return (<>
            <Grid container sx={{padding: "10px 0"}}>
                <AddItem callBack={addTodolist} disabled={requestStatus === "loading"}/>
            </Grid>
            <Grid container gap={2}>
                {todoLists.map(t => {
                    return (
                        <Grid item key={t.id}>
                            <Paper sx={{padding: "15px", background: "#ebebeb", width:"215px"}}>
                                <TodoList
                                    id={t.id}
                                    title={t.title}
                                    tasks={tasks[t.id]}
                                    filter={t.filter}
                                    todolistEntityStatus={t.todolistEntityStatus}
                                    isLoginIn={isLoginIn}

                                    changeTodoListFilter={changeTodoListFilter}
                                    deleteTodolist={deleteTodolist}
                                    changeTodoListStatus={changeTodoListTitle}
                                />
                            </Paper>
                        </Grid>
                    )
                })}
            </Grid>
        </>
    );
};
