import React, {FC, useCallback, useEffect} from 'react';
import {Grid, Paper} from "@mui/material";
import {AddItem} from "../AddTodolist/AddItem";
import {TodoList} from "./ToDoList/TodoList";
import {useAppDispatch, useAppSelector} from "../../Store/Store";
import {
    addTodoListTC,
    changeTodoListTitleTC,
    deleteTodoListTC,
    filterValueType,
    getTodoListTC, todolistActions,
} from "../../State/todolists/todolists-reducer";
import {appStatusType} from "../../State/app/app-reducer";
import {Navigate} from "react-router-dom";
import {selectIsLoginIn} from "../../State/auth/auth-selectors";
import {selectTodolists} from "../../State/todolists/todolist-selector";
import {selectTasks} from "../../State/tasks/tasks-selector";

type todolistsType = {
    requestStatus: appStatusType
}

export const Todolists: FC<todolistsType> = ({requestStatus}) => {
    console.log("todolists")

    const todoLists = useAppSelector(selectTodolists)
    const tasks = useAppSelector(selectTasks) // кастомный хук из store
    const isLoginIn = useAppSelector(selectIsLoginIn)

    const dispatch = useAppDispatch(); // вставили кастомный хук из store

    const changeTodoListFilter = useCallback((filter: filterValueType, todoListId: string) => {
        dispatch(todolistActions.changeTodolistFilter({todoListId:todoListId, filter:filter}))
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
