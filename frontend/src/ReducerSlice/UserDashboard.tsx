import { createSlice } from "@reduxjs/toolkit";

export interface DBItem {
  id: number,
  database_name: string
}

interface AllTableData {
  id : number,
  table_name : string
};

interface AllFunctionData{
  id : number,
  name : string
};

interface AllTypeData{
  id : number,
  type_name : string
};

interface AllIndexingData{
  id : number,
  index_name : string
};

interface AllTriggerData{
  id : number,
  trigger_name : string
}

interface AllDBData{
  table_records : AllTableData[] | null,
  function_records : AllFunctionData[] | null,
  type_records : AllTypeData[] | null,
  indexing_records : AllIndexingData[] | null,
  trigger_records : AllTriggerData[] | null
}

export interface userDashboardState  {
  add_db_conn_btn_form_view : boolean,
  search_show_db_list_view : boolean,
  search_db_list : DBItem[],
  loding : boolean,
  setNullValuesAction : boolean,
  searchDBListInput : string,
  all_db_data : AllDBData[]
};

const initialState: userDashboardState = {
  add_db_conn_btn_form_view : false,
  search_show_db_list_view : false,
  search_db_list : [],
  loding : false,
  setNullValuesAction : false,
  searchDBListInput : "",
  all_db_data : []
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
        },
        setNullValuesAction : (state , action) => {
           if(action.payload){
            state.searchDBListInput = ""
           };
        },
        searchDBListInput : (state, action) => {
          state.searchDBListInput = action.payload
        },
        allDBDataResult : (state, action) => {
          state.all_db_data = action.payload
        }
    }
});

export const { is_add_db_conn_btn_click , search_show_db_list_view , search_db_list , loading , setNullValuesAction, searchDBListInput, allDBDataResult} = userDashboardStateSlice.actions;

export default userDashboardStateSlice.reducer