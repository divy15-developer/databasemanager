import { useSelector } from "react-redux";
import type {RootState} from "../ReducerStore/Store";

const ShowDBListView = () => {

    const search_db_list = useSelector((state : RootState) => state.userDahsboardState.search_db_list);

    console.log("👷‍♂️ search result :", search_db_list);

    return (
        <>
        <div className=" container-fluid m-1 p-0" 
        >
            <div className=" border shadow-[1px_1px_10px_rgba(0,0,0,1)] shadow-amber-50 max-h-[250px] w-[268px] rounded-[12px] ms-[920px] flex"
            style={{zIndex : 1}}>
            <ul className="">
              {search_db_list.map((items , index) => (
                <div 
                className="flex items-center hover:text-[18px] hover:border-b-[1px] transition-all duration-[100ms] w-[200px]">
                <li key={index} className=""> 
                    <label className="p-2">{items.database_name} </label>
                </li>
                </div>
              ))}
            </ul>
            </div>
        </div>
        </>
    )
};

export default ShowDBListView;