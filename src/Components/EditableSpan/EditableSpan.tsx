import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from 'react';

type EditableSpanType = {
    title:string
    callBack:(title:string) => void
}

export const EditableSpan = React.memo((props:EditableSpanType) => {

    console.log("edit span")

    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title)

    const onDoubleClickHandler = () => {
        setEditMode(true)
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
            {editMode
                ? <input autoFocus value={title} onChange={onChangeHandler} onBlur={onBlurHandler} onKeyUp={onKeyUpHandler}/>
                : <span onDoubleClick={onDoubleClickHandler}>{props.title}</span>
            }
        </>
    );
})

