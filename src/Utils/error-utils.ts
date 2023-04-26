import axios, {AxiosError} from "axios";
import {Dispatch} from "redux";
import {ResponseType} from "../api/instans-api";
import {appActions} from "../State/app/app-reducer";

// export const _handleServerNetworkError = (err:{message:string}, dispatch:Dispatch) => {
//     dispatch(appActions.setError({error:err.message ? err.message : "some error occurred"}))
//     dispatch(appActions.setStatus({status:"failed"}))
// }
export const handleServerNetworkError = (e: unknown, dispatch: Dispatch) => {
    const err = e as Error | AxiosError<{ error: string }> //type for error
    if (axios.isAxiosError(err)) {
        const error = err.message ? err.message : 'Some error occurred'
        dispatch(appActions.setError({error}))
    } else {
        dispatch(appActions.setError({error: `Native error ${err.message}`}))
    }
    dispatch(appActions.setStatus({status: 'failed'}))
}


export const handleServerAppError = <D>(data: ResponseType<D>,dispatch:Dispatch) => {
    if (data.messages.length) {
        dispatch(appActions.setError({error:data.messages[0]}))
    } else {
        dispatch(appActions.setError({error:"some error occupied"}))
    }
    dispatch(appActions.setStatus({status:"failed"}))
}