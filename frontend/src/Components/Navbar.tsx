import {is_add_db_conn_btn_click} from '../ReducerSlice/UserDashboard';
import { useDispatch} from 'react-redux';

const Navbar = () => {

    const Dispatch = useDispatch();

    const handle_add_db_conn_btn = () => {
        Dispatch(is_add_db_conn_btn_click());
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
                {/* Add DB Connection */}
                <div 
                className=" mr-3 rounded-full p-2  hover:shadow-[1px_1px_10px_rgba(0,0,0,1)] hover:shadow-amber-50 focus:border-2  focus:border-violet-500 active:border-violet-700 transition duration-100 hover:text-[17px] hover:opacity-75">
                    <button 
                    onClick={() => handle_add_db_conn_btn()}
                    >Add DB Connection</button>
                </div>
                {/* Show the list of DB Connection */}
                <div 
                className=" mr-3 rounded-full p-2 hover:shadow-[1px_1px_10px_rgba(0,0,0,1)] hover:shadow-amber-50 focus:shadow-amber-50 transition duration-100 hover:text-[17px] hover:opacity-75">
                    <button className="">Show DB List</button>
                </div>
            </div>
            </div>
        </div>
        </>
    )
};

export default Navbar;