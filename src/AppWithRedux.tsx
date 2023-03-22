import React, {useCallback, useEffect} from 'react';
import './App.css';
import {TodoList} from "./Components/ToDoList/TodoList";
import {AddItem} from "./Components/AddTodolist/AddItem";
import {useSelector} from "react-redux";
import {AppRootState, useAppDispatch, useAppSelector} from "./Store/Store";
import {
    addTodoListTC,
    changeTodolistFilterAC,
    changeTodoListTitleTC,
    deleteTodoListTC, filterValueType, getTodoListTC, todolistDomainType
} from "./State/todolists-reducer";
import {taskType} from "./api/task-api";
import {AppBar, Button, Container, Grid, IconButton, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';


export type tasksType = {
    [key: string]: taskType[]
}

const AppWithRedux = React.memo(() => {

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

    const changeTodoListTitle = useCallback((todoListId: string, title: string) => {
        // dispatch(changeTodolistTitleAC(todoListId, title))
        dispatch(changeTodoListTitleTC(todoListId, title))
    }, [dispatch])

    useEffect(() => {
        dispatch(getTodoListTC())
    }, [])


    return (
        <div className="App">
            <AppBar position="static" color="primary">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Task Scheduler
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container sx={{padding: "20px 0"}}>
                    <AddItem callBack={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {todoLists.map(t => {
                        return (
                            <Grid item>
                                <TodoList
                                    key={t.id}
                                    id={t.id}
                                    title={t.title}
                                    tasks={tasks[t.id]}
                                    filter={t.filter}

                                    changeTodoListFilter={changeTodoListFilter}
                                    deleteTodolist={deleteTodolist}
                                    changeTodoListStatus={changeTodoListTitle}
                                />
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    );
})

export default AppWithRedux;
