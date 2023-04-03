import {Dispatch} from "redux";
import {authApi, dataLoginType} from "../api/auth-api";
import {setErrorAT, setStatusAC, setStatusAT, setUserNameAC, setUserNameAT} from "./app-reducer";
import {handleServerAppError} from "../Utils/error-utils";

export type authInitialStateType = {
    isLoginIn: boolean
    isInitialized:boolean
}

export type isLoginInAT = ReturnType<typeof isLoginInAC>
export type isInitializedAT = ReturnType<typeof isInitializedAC>

type AuthActionType = isLoginInAT | isInitializedAT | setUserNameAT | setErrorAT | setStatusAT

const initialState: authInitialStateType = {
    isLoginIn: false,
    isInitialized:false
}

export const authReducer = (state = initialState, action: AuthActionType): authInitialStateType => {

    switch (action.type) {
        case "SET-LOGIN-IN":
            return {...state, isLoginIn: action.isLoginIn}
        case "SET-INITIALIZE":
            return {...state, isInitialized: action.isInitialized}
        default:
            return state
    }
}

export const isLoginInAC = (isLoginIn: boolean) => {
    return {type: "SET-LOGIN-IN", isLoginIn} as const
}
export const isInitializedAC = (isInitialized: boolean) => {
    return {type: "SET-INITIALIZE", isInitialized} as const
}

export const isLoginInTC = (data:dataLoginType) => (dispatch:Dispatch<AuthActionType>) => {
    dispatch(setStatusAC("loading"))
    authApi.login(data)
        .then(res => {
            if(res.data.resultCode === 0) {
                dispatch(isLoginInAC(true))
                dispatch(setStatusAC("success"))
                dispatch(setUserNameAC(res.data.data?.userId))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((err) => {
            handleServerAppError(err, dispatch)
        })
}

export const isInitializedTC = () => (dispatch:Dispatch<AuthActionType>) => {
    dispatch(setStatusAC("loading"))
    authApi.me()
        .then(res => {
            if(res.data.resultCode === 0) {
                dispatch(isLoginInAC(true))
                dispatch(setStatusAC("success"))
                dispatch(setUserNameAC(res.data.data?.id))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((err) => {
            handleServerAppError(err, dispatch)
        })
        .finally(() => {
            dispatch(isInitializedAC(true))
        })
}

export const logOutTC = () => (dispatch:Dispatch<AuthActionType>) => {
    dispatch(setStatusAC("loading"))
    authApi.logOut()
        .then(res => {
            if(res.data.resultCode === 0) {
                dispatch(isLoginInAC(false))
                dispatch(setStatusAC("success"))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((err) => {
            handleServerAppError(err, dispatch)
        })
}
