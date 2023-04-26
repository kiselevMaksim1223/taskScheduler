import {AppRootState, ThunkDispatchType} from "../Store/Store";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: AppRootState
    dispatch: ThunkDispatchType
    rejectValue: null
}>()