import {applyMiddleware, combineReducers, legacy_createStore, AnyAction} from "redux";
import {TodoListActionType, todolistsReducer} from "../State/todolists-reducer";
import {tasksReducer} from "../State/tasks-reducer";
import thunk, {ThunkDispatch}  from "redux-thunk";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";


export const rootReducer = combineReducers({
    todoLists:todolistsReducer,
    tasks:tasksReducer
})

export type AppRootState = ReturnType<typeof rootReducer>
export type AppRootActionType = TodoListActionType

type ThunkDispatchType = ThunkDispatch<AppRootState, any, AnyAction>
export const useAppDispatch = () => useDispatch<ThunkDispatchType>();
export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector;

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

//@ts-ignore
window.store = store