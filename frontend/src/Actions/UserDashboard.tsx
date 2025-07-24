import axios from "axios";
import {Api_Endpoint_Constants} from "../Constants/API_Endpoint_Constants";
import {loading , search_db_list , search_show_db_list_view} from "../ReducerSlice/UserDashboard";

interface db_name {
    db : string
};


export const get_db_list = async (db_name: db_name , dispatch : any) =>{
  try {
    dispatch(loading());

    if(!db_name.db || db_name === undefined){
        return;
    };

    const result = await axios.get(
      `${Api_Endpoint_Constants[0].dashboard.search_show_db_connection}/${db_name.db}`
    );

    console.log("🐠 " , `${result.data.success}`)

    if (result.data.success) {
      dispatch(loading());
      dispatch(search_db_list(result.data.data.data));
      dispatch(search_show_db_list_view(true));
    }
  } catch (error) {
    alert(error);
    dispatch(loading()); // reset loading on error
  }
};

