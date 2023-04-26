import {AppRootState} from "../../Store/Store";

export const selectError = (state:AppRootState) => state.app.error
export const selectAppStatus = (state:AppRootState) => state.app.status
export const selectIsInitialized = (state:AppRootState) => state.app.isInitialized