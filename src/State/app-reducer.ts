
export type appStatusType = "idle" | "success" | "failed" | "loading"

export type AppInitialStateType = {
    status: appStatusType
    error: string | null
}

const initialState: AppInitialStateType = {
    status: "idle",
    error: null
}

export type setErrorAT = ReturnType<typeof setErrorAC>
export type setStatusAT = ReturnType<typeof setStatusAC>

export type AppActionsType = setErrorAT | setStatusAT

export const appReducer = (state = initialState, action: AppActionsType): AppInitialStateType => {
    switch (action.type) {
        case "SET-STATUS":
            return {...state, status:action.status}
        case "SET-ERROR":
            return {...state, error:action.error}
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

