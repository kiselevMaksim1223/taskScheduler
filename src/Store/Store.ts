import {AnyAction, combineReducers} from "redux";
import {todolistsReducer} from "../State/todolists/todolists-reducer";
import {tasksReducer} from "../State/tasks/tasks-reducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {appReducer} from "../State/app/app-reducer";
import {authReducer} from "../State/auth/auth-reducer";
import {configureStore} from "@reduxjs/toolkit";

export const rootReducer = combineReducers({
    todoLists:todolistsReducer,
    tasks:tasksReducer,
    app:appReducer,
    auth:authReducer
})

export const store = configureStore({
    reducer:rootReducer,
    middleware:(getDefaultMiddleware) =>
        getDefaultMiddleware()
            .prepend(thunk)
})

export type AppRootState = ReturnType<typeof rootReducer>

type ThunkDispatchType = ThunkDispatch<AppRootState, any, AnyAction>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootState, unknown, AnyAction>

export const useAppDispatch = () => useDispatch<ThunkDispatchType>();
export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector;

//@ts-ignore
window.store = store