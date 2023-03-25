import {Dispatch} from "redux";
import {authApi, dataLoginType} from "../api/auth-api";
import {setStatusAC} from "./app-reducer";
import {handleServerAppError} from "../Utils/error-utils";

export type authInitialStateType = {
    isLoginIn: boolean
}

export type isLoginInAT = ReturnType<typeof isLoginInAC>
type AuthActionType = isLoginInAT


const initialState: authInitialStateType = {
    isLoginIn: false
}

export const authReducer = (state = initialState, action: AuthActionType): authInitialStateType => {

    switch (action.type) {
        case "SET-LOGIN-IN":
            return {...state, isLoginIn: action.isLoginIn}
        default:
            return state
    }
}

export const isLoginInAC = (isLoginIn: boolean) => {
    return {type: "SET-LOGIN-IN", isLoginIn} as const
}

export const isLoginInTC = (data:dataLoginType) => (dispatch:Dispatch) => {
    dispatch(setStatusAC("loading"))
    authApi.login(data)
        .then(res => {
            if(res.data.resultCode === 0) {
                dispatch(isLoginInAC(true))
                dispatch(setStatusAC("success"))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((err) => {
            handleServerAppError(err, dispatch)
        })
}


