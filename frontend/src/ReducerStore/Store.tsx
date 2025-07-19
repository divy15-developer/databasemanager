import { configureStore } from "@reduxjs/toolkit";
import { userDashboardStateSlice } from "../ReducerSlice/UserDashboard";

export const store = configureStore({
    reducer:{
        userDahsboardState : userDashboardStateSlice.reducer
    },
});

export type RootState = ReturnType<typeof store.getState>

export type AppDistpatch = typeof store.dispatch
