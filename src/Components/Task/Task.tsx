import React, {ChangeEvent, memo, useCallback} from 'react';
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Button} from "../Button/Button";
import {deleteTaskTC, updateTaskTC} from "../../State/tasks-reducer";
import {TaskStatuses, taskType} from "../../api/task-api";
import {useAppDispatch} from "../../Store/Store";

type taskPropsType = {
    task:taskType
    todoListId:string
}

export const Task:React.FC<taskPropsType> = memo(({task, todoListId}) => {

    const dispatch = useAppDispatch()

    const removeTask = useCallback(() => {
        dispatch(deleteTaskTC(todoListId, task.id))
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
        <li>
            <input
                type="checkbox"
                checked={task.status === TaskStatuses.Completed}
                onChange={changeCheckBox}
            />
            <EditableSpan title={task.title} callBack={(title) => changeTaskTitle(title)}/>
            <Button title={"x"} callback={removeTask}/>
        </li>
    );
})

