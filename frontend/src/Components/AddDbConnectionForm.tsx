import Add_DB_Connection_Form from "../UI/Add_DB_Connection_Form";
import {form_constants} from "../Constants/Add_DB_Connection_Constants";

const AddDbConnectionForm = () => {

    return (
        <>
        <div className="d-flex justify-center m-3">
        <div className="border-2 rounded-2xl p-3 w-[500px] shadow-[1px_2px_1px_rgba(0,0,0,0.5)] shadow-amber-50">
            {/* Header of form */}
            <div className="m-2 mb-4">
                <div
                  className="text-[22px]">Add Database Connection</div>
            </div>

            {/* Form */}
            <div>
                {Add_DB_Connection_Form(form_constants)}
            </div>
        </div>
        </div>
        </>
    )
};

export default AddDbConnectionForm;