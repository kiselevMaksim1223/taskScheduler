type authInitialStateType = {
    isLoginIn: boolean
}

type AuthActionType = any

const initialState: authInitialStateType = {
    isLoginIn: false
}

export const authReducer = (state = initialState, action: AuthActionType): authInitialStateType => {
    return state
}


