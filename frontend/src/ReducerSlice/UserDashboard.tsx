import { createSlice } from "@reduxjs/toolkit";

export interface DBItem {
  id: number;
  database_name: string;
}

export interface userDashboardState  {
  add_db_conn_btn_form_view : boolean,
  search_show_db_list_view : boolean,
  search_db_list : DBItem[],
  loding : boolean
};

const initialState: userDashboardState = {
  add_db_conn_btn_form_view : false,
  search_show_db_list_view : false,
  search_db_list : [],
  loding : false
};

export const userDashboardStateSlice = createSlice({
    name : 'userDashboard',
    initialState,
    reducers : {
        is_add_db_conn_btn_click : (state) => {
            state.add_db_conn_btn_form_view = !state.add_db_conn_btn_form_view
        },
        search_show_db_list_view : (state , action) => {
           state.search_show_db_list_view = action.payload
        },
        search_db_list : (state, action) => {
          state.search_db_list = action.payload
        },
        loading : (state) => {
          state.loding = !state.loding
        }
    }
});

export const { is_add_db_conn_btn_click , search_show_db_list_view , search_db_list , loading} = userDashboardStateSlice.actions;

export default userDashboardStateSlice.reducer