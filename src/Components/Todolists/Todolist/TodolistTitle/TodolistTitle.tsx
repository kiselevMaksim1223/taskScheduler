import React, {FC} from 'react';
import {EditableSpan} from "../../../EditableSpan/EditableSpan";
import {Box, CircularProgress, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {useActions} from "../../../../Utils/hooks/useActions";
import {todolistDomainType, todolistsThunks} from "../../../../State/todolists/todolists-reducer";

export const TodolistTitle:FC<{todolist:todolistDomainType}> = ({todolist}) => {
    const {
        deleteTodoList,
        changeTodoListTitle,
    } = useActions(todolistsThunks)

    const onClickDeleteTodolistHandler = () => {
        deleteTodoList({todolistId:todolist.id})
    }

    const onChangeTodolistTitleHandler = (title: string) => {
        changeTodoListTitle({todolistId:todolist.id, title})
    }

    return (
        <Box sx={{display:"flex", justifyContent:"space-between", alignItems:"center", textAlign:"center", margin:"5px 0"}}>
            <EditableSpan variant={"h5"} title={todolist.title} callBack={onChangeTodolistTitleHandler} disabled={todolist.todolistEntityStatus === "loading"}/>
            {todolist.todolistEntityStatus === "loading"
                ? <CircularProgress size={20}/>
                : <IconButton sx={{":hover":{color: "#11cb5f"}}} onClick={onClickDeleteTodolistHandler}><Delete/></IconButton>}
        </Box>
    );
};

