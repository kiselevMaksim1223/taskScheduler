import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator/ReduxStoreProviderDecorator";
import AppWithRedux from "../AppWithRedux";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'TODOLIST/AppWithRedux',
  component: AppWithRedux,
  decorators:[ReduxStoreProviderDecorator],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // argTypes: {
  //   backgroundColor: { control: 'color' },
  // },
} as ComponentMeta<typeof AppWithRedux>;



// export const TaskCopy = () => {
//   const task = useSelector<AppRootState, taskItemType>(state => state.tasks["todolistId1"][0])
//   return <Task task={task} todoListId={"todolistId1"}/>
// }


// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AppWithRedux> = (args) => <AppWithRedux />;


export const AppWithReduxStories = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args






