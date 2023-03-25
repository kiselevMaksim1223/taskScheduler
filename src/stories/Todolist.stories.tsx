import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator/ReduxStoreProviderDecorator";
import {useSelector} from "react-redux";
import {AppRootState} from "../Store/Store";
import {TodoList} from "../Components/Todolists/ToDoList/TodoList";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../api/task-api";
import {taskDomainType} from "../State/tasks-reducer";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'TODOLIST/TodoList',
    component: TodoList,
    decorators: [ReduxStoreProviderDecorator]
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    // argTypes: {
    //   backgroundColor: { control: 'color' },
    // },
} as ComponentMeta<typeof TodoList>;


const Tasks = () => {
    return useSelector<AppRootState, taskDomainType[]>(state => state.tasks["todolistId1"])
}


// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TodoList> = (args) => <TodoList {...args}/>;


export const TodoListExample = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

TodoListExample.args = {
    title: "123",
    filter: "all",
    tasks: [
        {
            id: v1(),
            title: 'HTML&CSS',
            status: TaskStatuses.New,
            todoListId: "todolistId1",
            description: "",
            addedDate: "",
            deadline: "",
            order: 0,
            startDate: "",
            priority: TaskPriorities.Low,
            taskEntityStatus: "idle"
        },
        {
            id: v1(),
            title: 'JS',
            status: TaskStatuses.New,
            todoListId: "todolistId1",
            description: "",
            addedDate: "",
            deadline: "",
            order: 0,
            startDate: "",
            priority: TaskPriorities.Low,
            taskEntityStatus: "idle"
        },
        {
            id: v1(),
            title: 'TS',
            status: TaskStatuses.Completed,
            todoListId: "todolistId1",
            description: "",
            addedDate: "",
            deadline: "",
            order: 0,
            startDate: "",
            priority: TaskPriorities.Low,
            taskEntityStatus: "idle"
        },
        {
            id: v1(),
            title: 'CSS',
            status: TaskStatuses.New,
            todoListId: "todolistId1",
            description: "",
            addedDate: "",
            deadline: "",
            order: 0,
            startDate: "",
            priority: TaskPriorities.Low,
            taskEntityStatus: "idle"
        },
    ],
    changeTodoListStatus: action("todolist status changed"),
    changeTodoListFilter: action("filter changed"),
    deleteTodolist: action("todolist deleted")
}




