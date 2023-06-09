export type appStatusType = "idle" | "success" | "failed" | "loading"

export type AppInitialStateType = {
    status: appStatusType
    error: string | null
    userID:number | null
}

const initialState: AppInitialStateType = {
    status: "idle",
    error: null,
    userID: null
}

export type setErrorAT = ReturnType<typeof setErrorAC>
export type setStatusAT = ReturnType<typeof setStatusAC>
export type setUserNameAT = ReturnType<typeof setUserNameAC>

export type AppActionsType = setErrorAT | setStatusAT | setUserNameAT

export const appReducer = (state = initialState, action: AppActionsType): AppInitialStateType => {
    switch (action.type) {
        case "SET-STATUS":
            return {...state, status:action.status}
        case "SET-ERROR":
            return {...state, error:action.error}
        case "SET-USER-ID":
            return {...state, userID:action.userID}
        default:
            return state
    }
}

export const setErrorAC = (error:string | null) => {
    return ({
        type:"SET-ERROR",
        error
    } as const)
}

export const setStatusAC = (status:appStatusType) => {
    return ({
        type:"SET-STATUS",
        status
    } as const )
}

export const setUserNameAC = (userID:number) => {
    return ({
        type:"SET-USER-ID",
        userID
    } as const )
}

