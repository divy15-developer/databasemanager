import { useFormik } from "formik";
import * as Yup from "yup";
import {Api_Endpoint_Constants} from "../Constants/API_Endpoint_Constants";
import type { FormField } from "../Constants/Add_DB_Connection_Constants";
import axios from "axios";

type initialValues = {
    ip: string,
    user: string,
    database: string,
    password: string,
    port: string,
    developer_id: number
}



const Add_DB_Connection_Form = (ArrayConstants: FormField[]) => {

    const initialValues: initialValues = {
        ip: "",
        user: "",
        database: "",
        password: "",
        port: "",
        developer_id: 1
    };

    const validationSchema = Yup.object({
        ip: Yup.string().required("Ip address is required."),
        user: Yup.string().required("Database user is required."),
        database: Yup.string().required("Database name is required."),
        port: Yup.number().required("Database PORT is required."),
        developer_id: Yup.number(),
        password : Yup.string().required('Password is required.')
    });

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (data) => {
            try {
                console.log(data);
                const response = await axios.post(`${Api_Endpoint_Constants[0].dashboard.add_db_connection}` , data);

                if(!response.data.success){
                    alert('Database Connection is not Stored.')
                };

                alert('Database connection is stored.');
            } catch (error) {
                console.log(error);
            }
        }
    });

    return (
        <>
            <div className="container-fluid m-0 p-0">
                 <form onSubmit={formik.handleSubmit}>
                {ArrayConstants.map(({ name, label, type } , index) => (
                    <div key={index}>
                            <div className="row m-1">
                                <div className="col-5">
                                    <label
                                        htmlFor={name}
                                        className="form-label">
                                        {label}
                                    </label>
                                </div>
                                <div className="col-7">
                                    <input type={type}
                                        className="form-control"
                                        onChange={formik.handleChange}
                                        value={formik.values[name]}
                                        name={name}
                                        id={name}
                                        style={{fontSize : "0.75rem"}}
                                        placeholder={`Enter the ${label}`} />
                                </div>
                            </div>
                            <div className="ml-[200px]">
                                {formik.touched[name] && formik.errors[name] ? (
                                    <div className="text-red-500 text-md mt-1">
                                        {formik.errors[name] as string}
                                    </div>
                                ) : null}
                            </div>
                        </div>
                ))}
                <div className="flex justify-between">
                    <div><button className="btn btn-danger">Cancel</button></div>
                    <div><button className="btn btn-success" type="submit">Submit</button></div>
                </div>
                </form>
            </div>
        </>
    )
};

export default Add_DB_Connection_Form;