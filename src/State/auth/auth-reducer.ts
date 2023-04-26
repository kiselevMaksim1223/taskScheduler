import {authApi, dataLoginType} from "../../api/auth-api";
import {handleServerAppError, handleServerNetworkError} from "../../Utils/error-utils";
import {createSlice} from "@reduxjs/toolkit";
import {appActions} from "../app/app-reducer";
import {createAppAsyncThunk} from "../../Utils/create-app-asynk-thunk";

export type authInitialStateType = {
    isLoginIn: boolean
}

const initialState: authInitialStateType = {
    isLoginIn: false,
}

const logOut = createAppAsyncThunk<{ isLoginIn: boolean }, void>
('auth/logout', async (_, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    try {
        dispatch(appActions.setStatus({status: "loading"}))
        const res = await authApi.logOut()
        if (res.data.resultCode === 0) {
            dispatch(appActions.setStatus({status: "success"}))

            return {isLoginIn:false}
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    } catch (e) {
        handleServerNetworkError(e, dispatch)
        return rejectWithValue(null)
    }
})

const LoginIn = createAppAsyncThunk<{ isLoginIn: boolean }, {data: dataLoginType}>
('auth/isLoginIn', async ({data}, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    try {
        dispatch(appActions.setStatus({status: "loading"}))
        const res = await authApi.login(data)
        if (res.data.resultCode === 0) {
            dispatch(appActions.setStatus({status: "success"}))

            return {isLoginIn:true}
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    } catch (e) {
        handleServerNetworkError(e, dispatch)
        return rejectWithValue(null)
    }
})

const isInitialized = createAppAsyncThunk<{ isLoginIn: boolean }, void>
('auth/isInitialized', async (_, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    try {
        dispatch(appActions.setStatus({status: "loading"}))
        const res = await authApi.me()
        if (res.data.resultCode === 0) {
            dispatch(appActions.setStatus({status: "success"}))

            return {isLoginIn:true}
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    } catch (e) {
        handleServerNetworkError(e, dispatch)
        return rejectWithValue(null)
    }
    finally {
        dispatch(appActions.setAppInitialized({isInitialized:true}))
    }
})

const slice = createSlice({
    name: "auth",
    initialState,
    reducers: {
    },
    extraReducers: builder => {
        builder
            .addCase(logOut.fulfilled, (state, action) => {
                state.isLoginIn = action.payload.isLoginIn
            })
            .addCase(LoginIn.fulfilled, (state, action) => {
                state.isLoginIn = action.payload.isLoginIn
            })
            .addCase(isInitialized.fulfilled, (state, action) => {
                state.isLoginIn = action.payload.isLoginIn
            })

    }
})

export const authReducer = slice.reducer
export const authAction = slice.actions
export const authThunks = { logOut, LoginIn, isInitialized }
