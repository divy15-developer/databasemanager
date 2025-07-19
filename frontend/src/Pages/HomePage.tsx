import Navbar from "../Components/Navbar";
import { useSelector } from "react-redux";
import type {RootState} from "../ReducerStore/Store";
import AddDbConnectionForm from "../Components/AddDbConnectionForm";

const HomePage = () => {

    let add_db_connection_for_view = useSelector((state : RootState) => state.userDahsboardState.add_db_conn_btn_form_view);

    return (
        <>
        <div>
            <Navbar />
        </div>
        <div className="flex justify-center items-center m-5">
            {add_db_connection_for_view ? <AddDbConnectionForm /> : null}
        </div>
        </>
    )
};

export default HomePage;