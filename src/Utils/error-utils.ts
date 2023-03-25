import {Dispatch} from "redux";
import {setErrorAC, setErrorAT, setStatusAC, setStatusAT} from "../State/app-reducer";
import {ResponseType} from "../api/instans-api";

export const handleServerNetworkError = (err:{message:string}, dispatch:Dispatch<setErrorAT | setStatusAT>) => {
    dispatch(setErrorAC(err.message ? err.message : "some error occurred"))
    dispatch(setStatusAC("failed"))
}

export const handleServerAppError = <D>(data: ResponseType<D>,dispatch:Dispatch<setErrorAT | setStatusAT>) => {
    if (data.messages.length) {
        dispatch(setErrorAC(data.messages[0]))
    } else {
        dispatch(setErrorAC("some error occupied"))
    }
    dispatch(setStatusAC("failed"))
}