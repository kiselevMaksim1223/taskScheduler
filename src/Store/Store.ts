import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {todolistsReducer} from "../State/todolists-reducer";
import {tasksReducer} from "../State/tasks-reducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {appReducer} from "../State/app-reducer";
import {authReducer} from "../State/auth-reducer";
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
// export type AppRootActionType = TodoListActionType

type ThunkDispatchType = ThunkDispatch<AppRootState, any, AnyAction>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootState, unknown, AnyAction>

export const useAppDispatch = () => useDispatch<ThunkDispatchType>();
export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector;

// export const _store = legacy_createStore(rootReducer, applyMiddleware(thunk))

//@ts-ignore
window.store = store