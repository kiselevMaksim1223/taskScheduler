import {
    authAction,
    authInitialStateType,
    authReducer
} from "./auth-reducer";

export const x = () => {}

test("isLoginIn status should change", () => {
    const initialState: authInitialStateType = {
        isLoginIn: false,
        isInitialized:false
    }

     const action = authAction.isLoginIn({isLoginIn:true})

    const endState = authReducer(initialState, action)

    expect(endState.isLoginIn).toBe(true)
})

test("isInitialized status should change", () => {
    const initialState: authInitialStateType = {
        isLoginIn: false,
        isInitialized:false
    }

    const action = authAction.isInitialized({isInitialized:true})

    const endState = authReducer(initialState, action)

    expect(endState.isInitialized).toBe(true)
})