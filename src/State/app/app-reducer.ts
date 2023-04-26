import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type appStatusType = "idle" | "success" | "failed" | "loading"

export type AppInitialStateType = {
    status: appStatusType
    error: string | null
    userID:number | null
    isInitialized: boolean
}

const initialState: AppInitialStateType = {
    status: "idle",
    error: null,
    userID: null,
    isInitialized: false
}

export const slice = createSlice({
    name:"app",
    initialState,
    reducers:{
        setError:(state, action:PayloadAction<{error:string | null}>) => {
            state.error = action.payload.error
        },
        setStatus:(state, action:PayloadAction<{status:appStatusType}>) => {
            state.status = action.payload.status
        },
        setUserName:(state, action:PayloadAction<{userID:number}>) => {
            state.userID = action.payload.userID
        },
        setAppInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
            state.isInitialized = action.payload.isInitialized
        },
    }
})

export const appReducer = slice.reducer
export const appActions = slice.actions



