import {appActions, AppInitialStateType, appReducer, appStatusType} from "./app-reducer";

let initialState:AppInitialStateType

beforeEach(() => {
    initialState = {
        status: "idle",
        error: null,
        userID: null,
        isInitialized:false
    }
})

test("error message should change", () => {

    const newError = "errorrrrr"
    const action = appActions.setError({error:newError})

    const newState = appReducer(initialState, action)

    expect(newState.error).toBe(newError)
})

test("app status should change", () => {

    const newStatus:appStatusType = "success"

    const action = appActions.setStatus({status:newStatus})

    const newState = appReducer(initialState, action)

    expect(newState.status).toBe(newStatus)
})

test("user name should change", () => {

    const userID:number = 1234

    const action = appActions.setUserName({userID})

    const newState = appReducer(initialState, action)

    expect(newState.userID).toBe(userID)
})

test("isInitialized status should change", () => {

    const action = appActions.setAppInitialized({isInitialized:true})

    const endState = appReducer(initialState, action)

    expect(endState.isInitialized).toBe(true)
})