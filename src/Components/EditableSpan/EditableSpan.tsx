import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import {TextField, Typography} from "@mui/material";

type EditableSpanType = {
    title:string
    callBack:(title:string) => void
    disabled:boolean
    variant?: 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'subtitle1'
    | 'subtitle2'
    | 'body1'
    | 'body2'
    | 'caption'
    | 'button'
    | 'overline'
}

export const EditableSpan:FC<EditableSpanType> = React.memo(({title, callBack, variant, disabled}) => {

    console.log("edit span")

    const [editMode, setEditMode] = useState<boolean>(false)
    const [titleValue, setTitleValue] = useState<string>(title)

    const onDoubleClickHandler = () => {
        setEditMode(true)
        console.log(disabled)
    }

    const onBlurHandler = () => {
        callBack(titleValue)
        setEditMode(false)
    }

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setTitleValue(e.currentTarget.value)
    }

    const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            callBack(titleValue)
            setEditMode(false)
        }
    }

    return (
        <>
            {editMode && !disabled
                ? <TextField size={"small"} variant={"standard"} autoFocus
                             value={titleValue} onChange={onChangeHandler} onBlur={onBlurHandler}
                             onKeyUp={onKeyUpHandler}
                />
                : <Typography variant={variant} onDoubleClick={onDoubleClickHandler} sx={{alignSelf:"center", padding:"5px", maxWidth:"120px", wordBreak:"break-all"}}>{title}</Typography>
            }
        </>
    );
})

