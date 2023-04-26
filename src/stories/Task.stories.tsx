import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {Task} from "../Components/Task/Task";
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator/ReduxStoreProviderDecorator";
import {useSelector} from "react-redux";
import {AppRootState} from "../Store/Store";
import {taskDomainType} from "../State/tasks/tasks-reducer";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'TODOLIST/Task',
  component: Task,
  decorators:[ReduxStoreProviderDecorator]
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // argTypes: {
  //   backgroundColor: { control: 'color' },
  // },
} as ComponentMeta<typeof Task>;




const TaskCopy = () => {
  const task = useSelector<AppRootState, taskDomainType>(state => state.tasks["todolistId1"][0])
  return <Task task={task} todolistId={"todolistId1"} disabled={false}/>
}


// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TaskCopy> = (args) => <TaskCopy />;



export const TaskExample = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args






