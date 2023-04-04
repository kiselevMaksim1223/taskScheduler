import {Provider} from "react-redux";
import {AppRootState,} from "../../Store/Store";
import {combineReducers, createStore} from "redux";
import {todolistsReducer} from "../../State/todolists/todolists-reducer";
import {tasksReducer} from "../../State/tasks/tasks-reducer";
import {v1} from "uuid";
import {ReactNode} from "react";


const rootReducer = combineReducers({
    todoLists:todolistsReducer,
    tasks:tasksReducer
})

const initialGlobalState = {
    todoLists: [
        {id: 'todolistId1', todoListTitle: 'What to learn', filter: 'all'},
        {id: 'todolistId2', todoListTitle: 'What to buy', filter: 'all'}
    ],
    tasks: {
        ['todolistId1']: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true}
        ],
        ['todolistId2']: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'React Book', isDone: true}
        ]
    }
}

export const storyBookStore = createStore(rootReducer, initialGlobalState as unknown as AppRootState)

export const ReduxStoreProviderDecorator = (storyFn:() => ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}

