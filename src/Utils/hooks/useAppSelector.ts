import {TypedUseSelectorHook, useSelector} from "react-redux";
import {AppRootState} from "../../Store/Store";

export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector;
