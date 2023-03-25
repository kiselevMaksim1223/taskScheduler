import React from 'react';
import './App.css';
import {useAppSelector} from "./Store/Store";
import {Box, Container, LinearProgress} from "@mui/material";
import {HeaderMui} from "./Components/Header/HeaderMUI";
import {ErrorSnackbar} from "./Components/ErrorSnackBar/ErrorSnackBar";
import {appStatusType} from "./State/app-reducer";
import {Todolists} from "./Components/Todolists/Todolists";
import {Navigate, Route, Routes} from "react-router-dom";
import {Login} from "./Components/Login/Login";


const AppWithRedux = React.memo(() => {
    console.log("app")
    const requestStatus = useAppSelector<appStatusType>(state => state.app.status)


    return (
        <div className="App">
            <HeaderMui/>
            <Box sx={{width: '100%', height: "4px"}}>{requestStatus === "loading" &&
                <LinearProgress sx={{position: "relative"}}/>} {/*полоса загрузки*/}</Box>
            <Container fixed>
                <Routes>
                    <Route path={"/"} element={<Todolists requestStatus={requestStatus}/>}/>
                    <Route path={"/login"} element={<Login/>}/>
                    <Route path={"/404"} element={<div>Page not fount 404</div>}/>
                    <Route path={"*"} element={<Navigate to={"/404"}/>}/>
                </Routes>
            </Container>
            <ErrorSnackbar/> {/*всплывающая ошибка */}
        </div>
    );
})

export default AppWithRedux;
