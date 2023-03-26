import React, {useCallback, useEffect} from "react";
import {EditableSpan} from "../../EditableSpan/EditableSpan";
import {AddItem} from "../../AddTodolist/AddItem";
import {Task} from "../../Task/Task";
import {createTaskTC, getTasksTC, taskDomainType} from "../../../State/tasks-reducer";
import {TaskStatuses} from "../../../api/task-api";
import {filterValueType} from "../../../State/todolists-reducer";
import {useAppDispatch} from "../../../Store/Store";
import {Delete} from "@mui/icons-material";
import {ButtonGroup, CircularProgress, IconButton, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {appStatusType} from "../../../State/app-reducer";

type propsType = {
    id: string
    title: string
    tasks: Array<taskDomainType>
    filter: filterValueType
    todolistEntityStatus: appStatusType
    isLoginIn:boolean

    // removeTask: (taskId: string, todoListId: string) => void
    changeTodoListFilter: (value: filterValueType, todoListId: string) => void
    // addTask: (title: string, todoListId: string) => void
    // changeCheckBox: (id: string, isDone: boolean, todoListId: string) => void
    deleteTodolist: (todoListId: string) => void
    changeTodoListStatus: (todoListId: string, title: string) => void
    // changeTaskTitle: (todoListId: string, taskId: string, title: string) => void
}

export const TodoList = React.memo((props: propsType) => {

    const dispatch = useAppDispatch()

    console.log("todolist")


    // const addTaskHandler = useCallback((title: string) => {
    //     props.addTask(title, props.id)
    // }, [props.addTask, props.id])

    // const onClickRemoveTaskHandler = (id: string) => {
    //     props.removeTask(id, props.id)
    // }

    const onClickChangeFilterHandler = useCallback((filter: filterValueType) => {
        props.changeTodoListFilter(filter, props.id)
    }, [props.changeTodoListFilter, props.id])

    // const onChangeCheckBoxInputHandler = (taskID: string, e: ChangeEvent<HTMLInputElement>) => {
    //     props.changeCheckBox(taskID, e.currentTarget.checked, props.id)
    // }

    const onClickDeleteTodolistHandler = useCallback(() => {
        props.deleteTodolist(props.id)
    }, [props.deleteTodolist, props.id])

    // const onChangeTaskTitleHandler = (title: string, taskId: string) => {
    //     props.changeTaskTitle(props.id, taskId, title)
    // }

    const onChangeTodolistTitleHandler = useCallback((title: string) => {
        props.changeTodoListStatus(props.id, title)
    }, [props.changeTodoListStatus, props.id])

    useEffect(() => {
        if(props.isLoginIn) {
            dispatch(getTasksTC(props.id))
        }
    }, [])

    const changeFilter = () => {
        if (props.filter === "active") {
            return props.tasks.filter(t => t.status === TaskStatuses.New)
        } else if (props.filter === "complete") {
            return props.tasks.filter(t => t.status === TaskStatuses.Completed)
        } else return props.tasks
    }
    const filteredTasks: Array<taskDomainType> = changeFilter()

    const addTask = useCallback((title: string) => {
        dispatch(createTaskTC(props.id, title))
    }, [dispatch, props.id])


    return (
        <div className={"Todolist"}>
            <h3 style={{display:"flex", justifyContent:"space-between", alignItems:"center", height:"40px"}}>
                <EditableSpan title={props.title} callBack={onChangeTodolistTitleHandler} disabled={props.todolistEntityStatus === "loading"}/>
                {props.todolistEntityStatus === "loading"
                ? <CircularProgress size={20}/>
                : <IconButton sx={{":hover":{color: "#11cb5f"}}} onClick={onClickDeleteTodolistHandler}><Delete/></IconButton>}
            </h3>

            <AddItem callBack={addTask} disabled={props.todolistEntityStatus === "loading"}/>

            <ul style={{padding:"0"}}>
                {filteredTasks.map(t => {
                    return (
                        <Task key={t.id} task={t} todoListId={props.id} disabled ={props.todolistEntityStatus === "loading"}/>
                    )
                })}
            </ul>

            <ButtonGroup size="small" aria-label="small button group">
                <Button variant={props.filter === "all" ? "contained" : "outlined"}
                        onClick={() => onClickChangeFilterHandler("all")}>All</Button>
                <Button variant={props.filter === "active" ? "contained" : "outlined"}
                        onClick={() => onClickChangeFilterHandler("active")}>Active</Button>
                <Button variant={props.filter === "complete" ? "contained" : "outlined"}
                        onClick={() => onClickChangeFilterHandler("complete")}>Completed</Button>
            </ButtonGroup>
        </div>
    )
})