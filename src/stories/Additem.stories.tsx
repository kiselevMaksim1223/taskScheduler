import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {AddItem} from "../Components/AddTodolist/AddItem";
import {action} from "@storybook/addon-actions";
import {FormControl, IconButton, InputAdornment, TextField} from "@mui/material";
import {AddBox} from "@mui/icons-material";

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
  const [onFocus, setOnFocus] = useState<boolean>(false)

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
  const onBlurHandle = () => {
    error && setError(false)
    setOnFocus(false)
  }

  const onFocusHandler = () => {
    setOnFocus(true)
  }

  return (
      <FormControl sx={{width: '25ch',}} variant="outlined" color={error ? "error" : "primary"}>

        <TextField
            size={"small"}
            value={value}
            label={error ? "Error" : "Add title"}
            helperText={error && "Title is required"}
            onChange={onChangeInputHandler}
            onKeyUp={onKeyUpHandler}
            onBlur={onBlurHandle}
            error={error}
            onFocus={onFocusHandler}
            InputProps={
              {
                endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                          onClick={onClickAddTodolistHandler}
                          edge="end"
                      >
                        <AddBox color={error ? "error" : onFocus ? "primary" : "inherit"}/>
                      </IconButton>
                    </InputAdornment>)
              }
            }
        />
      </FormControl>
  );
}

export const AddItemExampleWithError = Template1.bind({})

AddItemExampleWithError.args = {
  callBack:action("item successfully added")
}