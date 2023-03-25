import React, {ChangeEvent, memo, useCallback} from 'react';
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {deleteTaskTC, taskDomainType, updateTaskTC} from "../../State/tasks-reducer";
import {TaskStatuses} from "../../api/task-api";
import {useAppDispatch} from "../../Store/Store";
import {Delete} from "@mui/icons-material";
import {Checkbox, CircularProgress, IconButton} from "@mui/material";

type taskPropsType = {
    task:taskDomainType
    todoListId:string
    disabled:boolean
}

export const Task:React.FC<taskPropsType> = memo(({task, todoListId, disabled}) => {

    const dispatch = useAppDispatch()

    const removeTask = useCallback(() => {
        dispatch(deleteTaskTC(todoListId, task.id))
        console.log(task.taskEntityStatus)
    }, [dispatch])

    const changeTaskTitle = useCallback((title:string) => {
        // dispatch(changeTaskTitleAC(todoListId, task.id, title))
        dispatch(updateTaskTC(todoListId, task.id, task, {title:title}))
    }, [dispatch])

    const changeCheckBox = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        // dispatch(changeTaskStatusAC(todoListId, task.id, e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New))
        dispatch(updateTaskTC(todoListId, task.id, task, {
            status:e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New
        }))
        console.log(task.status)
    },[dispatch])


    return (
        <div style={{display:"flex", alignItems:"center", gap:"10px"}}>
            <Checkbox checked={task.status === TaskStatuses.Completed}
                      onChange={changeCheckBox}
                      size={"small"}
                      disabled={disabled || task.taskEntityStatus === "loading"}
            />
            <EditableSpan title={task.title}
                          callBack={(title) => changeTaskTitle(title)}
                          disabled = {disabled || task.taskEntityStatus === "loading"}

            />

            {disabled || task.taskEntityStatus === "loading"
                ? <div><CircularProgress size={15}/></div>
                : <IconButton sx={{":hover": {color: "#11cb5f"}}}
                              onClick={removeTask}
                              // disabled={disabled || task.taskEntityStatus === "loading"}
                >
                    <Delete/>
                </IconButton>}
        </div>
    );
})

