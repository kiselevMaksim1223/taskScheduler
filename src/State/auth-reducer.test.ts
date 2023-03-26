import {
    authInitialStateType,
    authReducer,
    isInitializedAC,
    isInitializedAT,
    isLoginInAC,
    isLoginInAT
} from "./auth-reducer";

export const x = () => {}


test("isLoginIn status should change", () => {
    const initialState: authInitialStateType = {
        isLoginIn: false,
        isInitialized:false
    }

     const action:isLoginInAT = isLoginInAC(true)

    const endState = authReducer(initialState, action)

    expect(endState.isLoginIn).toBe(true)
})

test("isInitialized status should change", () => {
    const initialState: authInitialStateType = {
        isLoginIn: false,
        isInitialized:false
    }

    const action:isInitializedAT = isInitializedAC(true)

    const endState = authReducer(initialState, action)

    expect(endState.isInitialized).toBe(true)
})