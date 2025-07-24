import Navbar from "../Components/Navbar";
import { useSelector } from "react-redux";
import type {RootState} from "../ReducerStore/Store";
import AddDbConnectionForm from "../Components/AddDbConnectionForm";
import ShowDBListView from "../Components/ShowDBListView";

const HomePage = () => {

    let add_db_connection_for_view = useSelector((state : RootState) => state.userDahsboardState.add_db_conn_btn_form_view);
    let search_db_list_view = useSelector((state : RootState) => state.userDahsboardState.search_show_db_list_view);

    return (
        <>
        <div>
            <Navbar />
        </div>

        {/* DB connection form component */}
        {add_db_connection_for_view ? <AddDbConnectionForm /> : null}

        {/* DBList from search */}
        {search_db_list_view ? <ShowDBListView /> : null}

        </>
    )
};

export default HomePage;