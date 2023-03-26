import React, {useEffect} from 'react';
import './App.css';
import {useAppDispatch, useAppSelector} from "./Store/Store";
import {Box, CircularProgress, Container, LinearProgress} from "@mui/material";
import {HeaderMui} from "./Components/Header/HeaderMUI";
import {ErrorSnackbar} from "./Components/ErrorSnackBar/ErrorSnackBar";
import {appStatusType} from "./State/app-reducer";
import {Todolists} from "./Components/Todolists/Todolists";
import {Navigate, Route, Routes} from "react-router-dom";
import {Login} from "./Components/Login/Login";
import {isInitializedTC} from "./State/auth-reducer";


const AppWithRedux = React.memo(() => {
    console.log("app")
    const requestStatus = useAppSelector<appStatusType>(state => state.app.status)
    const isInitialized = useAppSelector<boolean>(state => state.auth.isInitialized)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(isInitializedTC())
        console.log("me auth")
    }, [])

    if (!isInitialized) {
        return (
            <div style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
                <CircularProgress/>
            </div>
        )

    }
    return (
        <div className="App">
            <HeaderMui/>
            <Box sx={{width: '100%', height: "4px"}}>
                {requestStatus === "loading" && <LinearProgress sx={{position: "relative"}}/>} {/*полоса загрузки*/}
            </Box>
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
