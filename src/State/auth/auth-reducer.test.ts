import {authInitialStateType, authReducer, authThunks} from "./auth-reducer";

export const x = () => {}

test("isLoginIn status should change", () => {
    const initialState: authInitialStateType = {
        isLoginIn: false,
    }

     const action = authThunks.LoginIn.fulfilled
     ({isLoginIn:true}, 'requestId', {data:{email:'123', password:'1231', rememberMe:true}})

    const endState = authReducer(initialState, action)

    expect(endState.isLoginIn).toBe(true)
})

// test("isInitialized status should change", () => {
//     const initialState: authInitialStateType = {
//         isLoginIn: false,
//     }
//
//     const action = authThunks.isInitialized.fulfilled({isInitialized:true}, 'requestId')
//
//     const endState = authReducer(initialState, action)
//
//     expect(endState.isInitialized).toBe(true)
// })