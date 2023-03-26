import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from 'react';
import {TextareaAutosize, TextField} from "@mui/material";

type EditableSpanType = {
    title:string
    callBack:(title:string) => void
    disabled:boolean
}

export const EditableSpan = React.memo((props:EditableSpanType) => {

    console.log("edit span")

    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title)

    const onDoubleClickHandler = () => {
        setEditMode(true)
        console.log(props.disabled)
    }

    const onBlurHandler = () => {
        props.callBack(title)
        setEditMode(false)
    }

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            props.callBack(title)
            setEditMode(false)
        }
    }

    return (
        <>
            {/*<TextField size={"small"}/>*/}
            {editMode && !props.disabled
                ? <TextField size={"small"} variant={"standard"} autoFocus value={title} onChange={onChangeHandler} onBlur={onBlurHandler} onKeyUp={onKeyUpHandler}/>
                : <div onDoubleClick={onDoubleClickHandler} style={{padding:"0 0 5px"}}>{props.title}</div>
            }
        </>
    );
})

