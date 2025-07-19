import { createSlice } from "@reduxjs/toolkit";

export interface userDashboardState  {
  add_db_conn_btn_form_view : boolean
};

const initialState: userDashboardState = {
  add_db_conn_btn_form_view : false
};

export const userDashboardStateSlice = createSlice({
    name : 'userDashboard',
    initialState,
    reducers : {
        is_add_db_conn_btn_click : (state) => {
            state.add_db_conn_btn_form_view = !state.add_db_conn_btn_form_view
        }
    }
});

export const { is_add_db_conn_btn_click } = userDashboardStateSlice.actions;

export default userDashboardStateSlice.reducer