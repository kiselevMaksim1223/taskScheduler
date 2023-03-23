import React, {useCallback, useEffect} from 'react';
import './App.css';
import {TodoList} from "./Components/ToDoList/TodoList";
import {AddItem} from "./Components/AddTodolist/AddItem";
import {useAppDispatch, useAppSelector} from "./Store/Store";
import {
    addTodoListTC,
    changeTodolistFilterAC,
    changeTodoListTitleTC,
    deleteTodoListTC,
    filterValueType,
    getTodoListTC,
    todolistDomainType
} from "./State/todolists-reducer";
import {taskType} from "./api/task-api";
import {Container, Grid, LinearProgress, Paper} from "@mui/material";
import {HeaderMui} from "./Components/Header/HeaderMUI";
import {ErrorSnackbar} from "./Components/ErrorSnackBar/ErrorSnackBar";
import {appStatusType} from "./State/app-reducer";
import {taskDomainType} from "./State/tasks-reducer";


export type tasksType = {
    [key: string]: taskDomainType[]
}

const AppWithRedux = React.memo(() => {

    console.log("app")

    const todoLists = useAppSelector<todolistDomainType[]>(state => state.todoLists)
    const tasks = useAppSelector<tasksType>(state => state.tasks) // кастомный хук
    const requestStatus = useAppSelector<appStatusType>(state => state.app.status)

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

    const changeTodoListTitle = useCallback((todoListId: string, title: string) => {
        // dispatch(changeTodolistTitleAC(todoListId, title))
        dispatch(changeTodoListTitleTC(todoListId, title))
    }, [dispatch])

    useEffect(() => {
        dispatch(getTodoListTC())
    }, [])


    return (
        <div className="App">
            <HeaderMui/>

                {requestStatus === "loading" && <LinearProgress/>}

            <Container fixed>
                <Grid container sx={{padding: "10px 0"}}>
                    <AddItem callBack={addTodolist}/>
                </Grid>
                <Grid container gap={2}>
                    {todoLists.map(t => {
                        return (
                            <Grid item>
                                <Paper sx={{padding: "15px"}}>
                                    <TodoList
                                        key={t.id}
                                        id={t.id}
                                        title={t.title}
                                        tasks={tasks[t.id]}
                                        filter={t.filter}
                                        entityStatus={t.entityStatus}

                                        changeTodoListFilter={changeTodoListFilter}
                                        deleteTodolist={deleteTodolist}
                                        changeTodoListStatus={changeTodoListTitle}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
            <ErrorSnackbar/> {/*всплывающая ошибка */}
        </div>
    );
})

export default AppWithRedux;
