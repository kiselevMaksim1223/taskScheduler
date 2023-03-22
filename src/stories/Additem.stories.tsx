import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {AddItem} from "../Components/AddTodolist/AddItem";
import {action} from "@storybook/addon-actions";
import {Button} from "../Components/Button/Button";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'TODOLIST/AddItem',
  component: AddItem,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // argTypes: {
  //   backgroundColor: { control: 'color' },
  // },
} as ComponentMeta<typeof AddItem>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AddItem> = (args) => <AddItem {...args} />;

export const AddItemExample1 = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
AddItemExample1.args = {
  callBack:action("item successfully added")
};


const Template1: ComponentStory<typeof AddItem> = (args) => {

  const [value, setValue] = useState<string>("")
  const [error, setError] = useState<boolean>(true)

  const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value)
    error && setError(false)
  }

  const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onClickAddTodolistHandler()
    }
  }

  const onClickAddTodolistHandler = () => {
    value.trim() === ""
        ? setError(true)
        : args.callBack(value)
    setValue("")
  }

  return (
      <div>
        <input value={value} onChange={onChangeInputHandler} onKeyUp={onKeyUpHandler}/>
        <Button title={"+"} callback={onClickAddTodolistHandler}/>
        {error && <div>Error!!!</div>}
      </div>
  );
}

export const AddItemExampleWithError = Template1.bind({})

AddItemExampleWithError.args = {
  callBack:action("item successfully added")
}