import {AppInitialStateType, appReducer, appStatusType} from "./app-reducer";

let initialState:AppInitialStateType

beforeEach(() => {
    initialState = {
        status: "idle",
        error: null,
        userID: null
    }
})

test("error message should change", () => {

    const newError = "errorrrrr"
    const action = {type:"SET-ERROR", error:newError}

    const newState = appReducer(initialState, action)

    expect(newState.error).toBe(newError)
})

test("app status should change", () => {

    const newStatus:appStatusType = "success"

    const action = {type:"SET-STATUS", status:newStatus}

    const newState = appReducer(initialState, action)

    expect(newState.status).toBe(newStatus)
})

test("user name should change", () => {

    const userID:number = 1234

    const action = {type:"SET-USER-ID", userID}

    const newState = appReducer(initialState, action)

    expect(newState.userID).toBe(userID)
})