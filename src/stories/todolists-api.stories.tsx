import React, {useEffect, useState} from 'react'
import {todolistAPI} from "../api/todoist-api";
import {taskApi, TaskStatuses, UpdateTaskModelType} from "../api/task-api";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolists()
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
const title = "123"
        todolistAPI.createTodolist(title)
            .then((res) => {
                setState(res.data.data)
            })

    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "a06f7c20-015c-43da-b0d8-e30dc384b530"
        todolistAPI.deleteTodolist(todolistId)
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div>{JSON.stringify(state)}</div>
}


export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "052ad105-6c22-42a1-8481-f7e8579a4ddc"
        const title = "123"
        todolistAPI.updateTodolist(todolistId, title)
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div>{JSON.stringify(state)}</div>
}
//=================================================================================tasks

// const todolistId = "052ad105-6c22-42a1-8481-f7e8579a4ddc" //3 таски
// const todolistId = "b2757a60-73f5-4479-9fd4-70336630540d" //5 таски
const todolistId = "14d17b99-cf9f-4fdd-b5b1-f0e50c04b8eb" //3 таски
// const todolistId = "69d6718c-6032-4a79-bd25-6efc24cef205" //3 таски
// const todolistId = "63632aae-9901-4d86-9a54-e142fb439357" //5 таски

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
            taskApi.getTasks(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify((state))}</div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)

    const title = "new12314"
    useEffect(() => {

            taskApi.createTask(todolistId, title)
            .then((res) => {
                setState(res)
            })
    }, [])

    return <div>{JSON.stringify((state))}</div>
}



export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)

    const taskId = "87ef34a9-e26b-481e-a865-46ffe658c990"
    const modelTask:UpdateTaskModelType = {
        status:TaskStatuses.Completed,
        description:"",
        title:"123qwe123",
        deadline:"",
        priority:1,
        startDate:""

    }
    useEffect(() => {

        taskApi.updateTask(todolistId, taskId, modelTask)
            .then((res) => {
                setState(res)
            })
    }, [])

    return <div>{JSON.stringify((state))}</div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)

    const taskId = "87ef34a9-e26b-481e-a865-46ffe658c990"
    useEffect(() => {

        taskApi.deleteTask(todolistId, taskId)
            .then((res) => {
                setState(res)
            })
    }, [])

    return <div>{JSON.stringify((state))}</div>
}