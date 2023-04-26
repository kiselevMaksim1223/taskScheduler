import React, {useEffect} from 'react';
import './App.css';
import {Box, CircularProgress, Container, LinearProgress} from "@mui/material";
import {HeaderMui} from "./Components/Header/HeaderMUI";
import {ErrorSnackbar} from "./Components/ErrorSnackBar/ErrorSnackBar";
import {Todolists} from "./Components/Todolists/Todolists";
import {Navigate, Route, Routes} from "react-router-dom";
import {Login} from "./Components/Login/Login";
import {selectAppStatus, selectIsInitialized} from "./State/app/app-selectors";
import {authThunks} from "./State/auth/auth-reducer";
import {useAppSelector} from "./Utils/hooks/useAppSelector";
import {useActions} from "./Utils/hooks/useActions";

export const AppWithRedux = React.memo(() => {
    console.log("app")
    const requestStatus = useAppSelector(selectAppStatus)
    const isInitialized = useAppSelector(selectIsInitialized)
    const {isInitialized:isInitializedThunk} = useActions(authThunks) //hook for make dispatch(authThunks.isInitialized()) in isInitialized()

    useEffect(() => {
        isInitializedThunk()
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
