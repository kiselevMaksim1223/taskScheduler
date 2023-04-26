import {useDispatch} from "react-redux";
import {ThunkDispatchType} from "../../Store/Store";

export const useAppDispatch = () => useDispatch<ThunkDispatchType>();
