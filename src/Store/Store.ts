import {applyMiddleware, combineReducers, legacy_createStore, AnyAction} from "redux";
import {TodoListActionType, todolistsReducer} from "../State/todolists-reducer";
import {tasksReducer} from "../State/tasks-reducer";
import thunk, {ThunkDispatch}  from "redux-thunk";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {appReducer} from "../State/app-reducer";
import {authReducer} from "../State/auth-reducer";


export const rootReducer = combineReducers({
    todoLists:todolistsReducer,
    tasks:tasksReducer,
    app:appReducer,
    auth:authReducer
})

export type AppRootState = ReturnType<typeof rootReducer>
export type AppRootActionType = TodoListActionType

type ThunkDispatchType = ThunkDispatch<AppRootState, any, AnyAction>
export const useAppDispatch = () => useDispatch<ThunkDispatchType>();
export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector;

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

//@ts-ignore
window.store = store