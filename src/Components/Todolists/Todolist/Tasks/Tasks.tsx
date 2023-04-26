import React, {FC} from 'react';
import {Task} from "../../../Task/Task";
import {TaskStatuses} from "../../../../api/task-api";
import {taskDomainType} from "../../../../State/tasks/tasks-reducer";
import {todolistDomainType} from "../../../../State/todolists/todolists-reducer";

export const Tasks:FC<{todolist:todolistDomainType, tasks:taskDomainType[]}> = ({todolist, tasks}) => {

    const changeFilter = () => {
        if (todolist.filter === "active") {
            return tasks.filter(t => t.status === TaskStatuses.New)
        } else if (todolist.filter === "complete") {
            return tasks.filter(t => t.status === TaskStatuses.Completed)
        } else return tasks
    }
    const filteredTasks: Array<taskDomainType> = changeFilter()

    return (
        <div>
            {filteredTasks.map(t => {
                return (
                    <Task key={t.id} task={t} todolistId={todolist.id} disabled ={todolist.todolistEntityStatus === "loading"}/>
                )
            })}
        </div>
    );
};
