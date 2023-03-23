import React, {ChangeEvent, memo, useCallback} from 'react';
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {deleteTaskTC, taskDomainType, updateTaskTC} from "../../State/tasks-reducer";
import {TaskStatuses} from "../../api/task-api";
import {useAppDispatch} from "../../Store/Store";
import {Delete} from "@mui/icons-material";
import {Checkbox, IconButton} from "@mui/material";

type taskPropsType = {
    task:taskDomainType
    todoListId:string
}

export const Task:React.FC<taskPropsType> = memo(({task, todoListId}) => {

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
        <div>
            <Checkbox checked={task.status === TaskStatuses.Completed} onChange={changeCheckBox} size={"small"}/>
            <EditableSpan title={task.title} callBack={(title) => changeTaskTitle(title)}/>
            <IconButton sx={{":hover":{color: "#11cb5f"}}} onClick={removeTask} disabled={task.taskEntityStatus === "loading"}><Delete/></IconButton>
        </div>
    );
})

