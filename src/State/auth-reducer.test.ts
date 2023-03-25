import {authInitialStateType, authReducer, isLoginInAC, isLoginInAT} from "./auth-reducer";

export const x = () => {}


test("isLoginIn status should change", () => {
    const initialState: authInitialStateType = {
        isLoginIn: false
    }

     const action:isLoginInAT = isLoginInAC(true)

    const endState = authReducer(initialState, action)

    expect(endState.isLoginIn).toBe(true)
})