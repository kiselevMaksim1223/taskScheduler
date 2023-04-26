import React, {FC, useEffect} from 'react';
import {Grid, Paper} from "@mui/material";
import {AddItem} from "../AddTodolist/AddItem";
import {TodoList} from "./Todolist/TodoList";
import {todolistsThunks} from "../../State/todolists/todolists-reducer";
import {appStatusType} from "../../State/app/app-reducer";
import {Navigate} from "react-router-dom";
import {selectIsLoginIn} from "../../State/auth/auth-selectors";
import {selectTodolists} from "../../State/todolists/todolist-selector";
import {selectTasks} from "../../State/tasks/tasks-selector";
import {useAppSelector} from "../../Utils/hooks/useAppSelector";
import {useActions} from "../../Utils/hooks/useActions";

type todolistsType = {
    requestStatus: appStatusType
}

export const Todolists: FC<todolistsType> = ({requestStatus}) => {
    console.log("todolists")

    const isLoginIn = useAppSelector(selectIsLoginIn)
    const todoLists = useAppSelector(selectTodolists)
    const tasks = useAppSelector(selectTasks) // кастомный хук из store

    const {addTodoList,getTodoLists} = useActions(todolistsThunks)

    const addTodolist = (todoListTitle: string) => {
        addTodoList({todoListTitle})
    }

    useEffect(() => {
        if (!isLoginIn) {                //если залогинены успешно, то сделать запрос за тудулистами
            return
        }
        getTodoLists()
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
                            <Paper sx={{padding: "15px", background: "#ebebeb", width: "215px"}}>
                                <TodoList
                                    tasks={tasks[t.id]}
                                    todolist={t}
                                />
                            </Paper>
                        </Grid>
                    )
                })}
            </Grid>
        </>
    );
};
