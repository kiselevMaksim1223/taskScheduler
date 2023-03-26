import React, {ChangeEvent, memo, useCallback} from 'react';
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {deleteTaskTC, taskDomainType, updateTaskTC} from "../../State/tasks-reducer";
import {TaskStatuses} from "../../api/task-api";
import {useAppDispatch} from "../../Store/Store";
import {Delete} from "@mui/icons-material";
import {Box, Checkbox, CircularProgress, IconButton} from "@mui/material";

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
        <div style={{display:"flex", justifyContent:"space-between",alignItems:"center"}}>
            <Box sx={{display:"flex", gap:"5px", alignItems:"center"}}>
                <Checkbox checked={task.status === TaskStatuses.Completed}
                         onChange={changeCheckBox}
                         size={"small"}
                         disabled={disabled || task.taskEntityStatus === "loading"}
            />
                <EditableSpan title={task.title}
                              callBack={(title) => changeTaskTitle(title)}
                              disabled={disabled || task.taskEntityStatus === "loading"}

                />
            </Box>

            <Box sx={{width:"40px", height:"40px",display:"flex", justifyContent:"center",alignItems:"center"}}>
                {task.taskEntityStatus === "loading"
                ? <CircularProgress size={20}/>
                : <IconButton sx={{":hover": {color: "#11cb5f"}}}
                              onClick={removeTask}
                    disabled={disabled}
                >
                    <Delete/>
                </IconButton>}
            </Box>
        </div>
    );
})

