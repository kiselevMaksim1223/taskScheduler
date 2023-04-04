import {authApi, dataLoginType} from "../../api/auth-api";
import {handleServerAppError, handleServerNetworkError} from "../../Utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunk} from "../../Store/Store";
import {appActions} from "../app/app-reducer";


export type authInitialStateType = {
    isLoginIn: boolean
    isInitialized: boolean
}

const initialState: authInitialStateType = {
    isLoginIn: false,
    isInitialized: false
}

const slice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        isLoginIn: (state, action: PayloadAction<{ isLoginIn: boolean }>) => {
            state.isLoginIn = action.payload.isLoginIn
        },
        isInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
            state.isInitialized = action.payload.isInitialized
        }
    }
})

export const authReducer = slice.reducer
export const authAction = slice.actions

export const isLoginInTC = (data: dataLoginType): AppThunk => (dispatch) => {
    dispatch(appActions.setStatus({status:"loading"}))
    authApi.login(data)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(authAction.isLoginIn({isLoginIn: true}))
                dispatch(appActions.setStatus({status:"success"}))
                dispatch(appActions.setUserName({userID:res.data.data?.userId}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((err) => {
            handleServerAppError(err, dispatch)
        })
}

export const isInitializedTC = (): AppThunk => (dispatch) => {
    dispatch(appActions.setStatus({status:"loading"}))
    authApi.me()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(authAction.isLoginIn({isLoginIn: true}))
                dispatch(appActions.setStatus({status:"success"}))
                dispatch(appActions.setUserName({userID:res.data.data?.id}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((err) => {
            handleServerAppError(err, dispatch)
        })
        .finally(() => {
            dispatch(authAction.isInitialized({isInitialized: true}))
        })
}

export const logOutTC = (): AppThunk => async (dispatch) => {
    dispatch(appActions.setStatus({status:"loading"}))
    try {
        let res = await authApi.logOut()
        if (res.data.resultCode === 0) {
            dispatch(authAction.isLoginIn({isLoginIn: false}))
            dispatch(appActions.setStatus({status:"success"}))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (err: any) {
        console.log(err)
        handleServerNetworkError(err, dispatch)
    }
}
