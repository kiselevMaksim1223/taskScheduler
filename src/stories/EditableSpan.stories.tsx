import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import {EditableSpan} from "../Components/EditableSpan/EditableSpan";
import {action} from "@storybook/addon-actions";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'TODOLIST/EditableSpan',
  component: EditableSpan,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes

} as ComponentMeta<typeof EditableSpan>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args} />;

export const EditSpanEx1 = Template.bind({})

EditSpanEx1.args = {
  title:"newTitle",
  callBack:action("title changed")
}


