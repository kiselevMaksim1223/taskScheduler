import {Dispatch} from "redux";
import {ResponseType} from "../api/instans-api";
import {appActions} from "../State/app-reducer";

export const handleServerNetworkError = (err:{message:string}, dispatch:Dispatch) => {
    dispatch(appActions.setError({error:err.message ? err.message : "some error occurred"}))
    dispatch(appActions.setStatus({status:"failed"}))
}

export const handleServerAppError = <D>(data: ResponseType<D>,dispatch:Dispatch) => {
    if (data.messages.length) {
        dispatch(appActions.setError({error:data.messages[0]}))
    } else {
        dispatch(appActions.setError({error:"some error occupied"}))
    }
    dispatch(appActions.setStatus({status:"failed"}))
}