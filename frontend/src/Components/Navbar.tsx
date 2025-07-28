import {is_add_db_conn_btn_click , search_show_db_list_view, searchDBListInput} from '../ReducerSlice/UserDashboard';
import { useDispatch , useSelector} from 'react-redux';
import type { RootState } from '../ReducerStore/Store';
import Serch from "../assets/search-svgrepo-com.svg";
import  {get_db_list} from "../Actions/UserDashboard";

const Navbar = () => {

    let SearchDBListInputValues = useSelector((state : RootState) => state.userDahsboardState.searchDBListInput);
    const Dispatch = useDispatch();

    const handle_add_db_conn_btn = () => {
        Dispatch(is_add_db_conn_btn_click());
    };

    const handle_search_db_name = async (value : string) => {
         let db_name = value.trim();

         Dispatch(searchDBListInput(db_name))

        if(db_name != "" || !db_name || db_name != undefined){
        await get_db_list({db : db_name} , Dispatch);
        };

        if(db_name === "" || !db_name || db_name === undefined){
            Dispatch(search_show_db_list_view(false));
        };
        
    };


    return (
        <>
        <div className="h-[75px] hover:shadow-[1px_1px_10px_rgba(0,0,0,1)] hover:shadow-amber-50 transition-shadow duration-[600ms]">
            <div className="flex justify-between items-center h-full">

            {/* Title */}
            <div className="ml-[20px]">
                <div className=" text-[28px] transition duration-75  hover:opacity-75">Database Manager</div>
            </div>
            {/* Navigation list */}
            <div className="flex justify-end ">
                {/* search bar */}
            <div className="mr-3 rounded-full p-2  hover:shadow-[1px_1px_10px_rgba(0,0,0,1)] hover:shadow-amber-50 transition duration-100 hover:text-[17px] hover:opacity-75">
                <div className="input-group">
                <div className="flex items-center"><img src={Serch} alt="Search" style={{height:"20px"}} /></div>
                <div className="mx-2 border-none">
                    <input type="text" 
                    className="border-none focus:outline-none focus:ring-0" 
                    placeholder="Serch" 
                    onChange={(e) => handle_search_db_name(e.target.value)}
                    value={SearchDBListInputValues}/>
                </div>
                </div>
            </div>
                {/* Add DB Connection */}
                <div 
                className="mr-3 rounded-full p-2  hover:shadow-[1px_1px_10px_rgba(0,0,0,1)] hover:shadow-amber-50 transition duration-100 hover:text-[17px] hover:opacity-75">
                    <button 
                    onClick={() => handle_add_db_conn_btn()}
                    >Add DB Connection</button>
                </div>
            </div>
            </div>
        </div>
        </>
    )
};

export default Navbar;