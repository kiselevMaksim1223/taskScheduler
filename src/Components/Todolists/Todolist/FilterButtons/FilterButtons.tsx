import React, {FC} from 'react';
import Button from "@mui/material/Button";
import {ButtonGroup} from "@mui/material";
import {filterValueType, todolistActions, todolistDomainType} from "../../../../State/todolists/todolists-reducer";
import {useActions} from "../../../../Utils/hooks/useActions";

export const FilterButtons:FC<{todolist:todolistDomainType}> = ({todolist}) => {

    const {changeTodolistFilter} = useActions(todolistActions)

    const onClickChangeFilterHandler = (filter: filterValueType) => {
        changeTodolistFilter({filter, todoListId:todolist.id})
    }

    return (
        <ButtonGroup size="small" aria-label="small button group">
            <Button variant={todolist.filter === "all" ? "contained" : "outlined"}
                    onClick={() => onClickChangeFilterHandler("all")}>All</Button>
            <Button variant={todolist.filter === "active" ? "contained" : "outlined"}
                    onClick={() => onClickChangeFilterHandler("active")}>Active</Button>
            <Button variant={todolist.filter === "complete" ? "contained" : "outlined"}
                    onClick={() => onClickChangeFilterHandler("complete")}>Completed</Button>
        </ButtonGroup>
    );
};
