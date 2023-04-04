import {AppRootState} from "../../Store/Store";

export const selectIsLoginIn = (state:AppRootState) => state.auth.isLoginIn
export const selectIsInitialized = (state:AppRootState) => state.auth.isInitialized