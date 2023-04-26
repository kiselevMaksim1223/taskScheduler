import {AppRootState} from "../../Store/Store";

export const selectIsLoginIn = (state:AppRootState) => state.auth.isLoginIn
