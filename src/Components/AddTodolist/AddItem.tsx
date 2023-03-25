import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {AddBox} from "@mui/icons-material";
import {FormControl, IconButton, InputAdornment, TextField,} from "@mui/material";

export type addItemPropsType = {
    callBack: (item: string) => void
    disabled?:boolean
}

export const AddItem = React.memo((props: addItemPropsType) => {

    console.log("add item form")

    const [value, setValue] = useState<string>("")
    const [error, setError] = useState<boolean>(false)
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
            : props.callBack(value)
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
                disabled={props.disabled}
                InputProps={
                    {
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={onClickAddTodolistHandler}
                                    edge="end"
                                    disabled={props.disabled}
                                >
                                    <AddBox color={error ? "error" : onFocus ? "primary" : "inherit"}/>
                                </IconButton>
                            </InputAdornment>)
                    }
                }
            />
        </FormControl>
    );
})
