import React, {ChangeEvent, KeyboardEvent,useState} from 'react';
import {Button} from "../Button/Button";

export type addItemPropsType = {
    callBack: (item: string) => void
}

export const AddItem = React.memo((props: addItemPropsType) => {

    console.log("add item form")

    const [value, setValue] = useState<string>("")
    const [error, setError] = useState<boolean>(false)

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

    return (
        <div>
            <input value={value} onChange={onChangeInputHandler} onKeyUp={onKeyUpHandler}/>
            <Button title={"+"} callback={onClickAddTodolistHandler}/>
            {error && <div>Error!!!</div>}
        </div>
    );
})
