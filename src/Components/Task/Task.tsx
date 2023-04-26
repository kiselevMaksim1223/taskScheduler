import React, {ChangeEvent, memo} from 'react';
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {taskDomainType, tasksThunks} from "../../State/tasks/tasks-reducer";
import {TaskStatuses} from "../../api/task-api";
import {Delete} from "@mui/icons-material";
import {Box, Checkbox, CircularProgress, IconButton} from "@mui/material";
import {useActions} from "../../Utils/hooks/useActions";

type taskPropsType = {
    task: taskDomainType
    todolistId: string
    disabled: boolean
}

export const Task: React.FC<taskPropsType> = memo(({task, todolistId, disabled}) => {

    const {deleteTask, updateTask} = useActions(tasksThunks)

    const removeTask = () => {
        deleteTask({todolistId, taskId: task.id})
        console.log(task.taskEntityStatus)
    }

    const changeTaskTitle = (title: string) => {
        updateTask({
            todolistId, taskId: task.id, model: task,
            domainModel: {title: title}
        })
    }
    const changeCheckBox = (e: ChangeEvent<HTMLInputElement>) => {
        updateTask({
            todolistId,
            taskId: task.id,
            model: task,
            domainModel: {status: e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New}
        })
    }

    return (
        <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
            <Box sx={{display: "flex", gap: "5px", alignItems: "center"}}>
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

            <Box sx={{width: "40px", height: "40px", display: "flex", justifyContent: "center", alignItems: "center"}}>
                {task.taskEntityStatus === "loading"
                    ? <CircularProgress size={20}/>
                    : <IconButton sx={{":hover": {color: "#11cb5f"}}}
                                  onClick={removeTask}
                                  disabled={disabled}
                    >
                        <Delete/>
                    </IconButton>}
            </Box>
        </Box>
    );
})

