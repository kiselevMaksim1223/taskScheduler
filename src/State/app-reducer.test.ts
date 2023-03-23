import {AppInitialStateType, appReducer, appStatusType, setErrorAT, setStatusAT} from "./app-reducer";


let initialState:AppInitialStateType

beforeEach(() => {
    initialState = {
        status: "idle",
        error: null
    }
})

test("error message should change", () => {

    const newError = "errorrrrr"
    const action:setErrorAT = {type:"SET-ERROR", error:newError}

    const newState = appReducer(initialState, action)

    expect(newState.error).toBe(newError)
})

test("app status should change", () => {

    const newStatus:appStatusType = "success"

    const action:setStatusAT = {type:"SET-STATUS", status:newStatus}

    const newState = appReducer(initialState, action)

    expect(newState.status).toBe(newStatus)
})