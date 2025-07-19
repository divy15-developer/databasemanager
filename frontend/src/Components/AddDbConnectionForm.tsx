import {useForm} from "react-hook-form";

interface defaultValuesState {
    ip : string,
    user : string,
    database : string,
    password : string,
    developer_id : number,
    port : string
};

const AddDbConnectionForm = () => {

    const { register , handleSubmit 
    } = useForm<defaultValuesState>({
        defaultValues : {
            ip : "",
            user : "",
            database : "",
            password : "",
            developer_id : 1,
            port : ""
        }
    });

    const onSubmit = (data : defaultValuesState) => {
        try {
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };



    return (

        <>
        <div className="border-2 rounded-2xl p-3 w-[500px] shadow-[1px_2px_1px_rgba(0,0,0,0.5)] shadow-amber-50">
            {/* Header of form */}
            <div className="m-2 mb-4">
                <div
                  className="text-[22px]">Add Database Connection</div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)}>
            {/* input hostname ip address */}
            <div>
            <div className="flex items-center m-2">
                <div
                  className="w-[160px]">
                    <label className="text-[16px]">Hostname (Ip Address) : </label>
                </div>
                <div 
                className="">
                    <input 
                    {...register("ip" , {required : true})}
                    type="text" 
                    placeholder="Enter the Hostname (Ip Address)" 
                    className="border p-2 text-[13px] rounded-lg w-[280px]" />
                </div>
            </div>
            </div>

            {/* Database name*/}
            <div className="flex items-center m-2">
                <div
                  className="w-[160px]">
                    <label  className="text-[16px]">Database name : </label>
                </div>
                <div>
                    <input 
                    {...register("database" , {required : true})}
                    type="text" 
                    placeholder="Enter the database name" 
                    className="border p-2 text-[13px] rounded-lg w-[280px]" />
                </div>
            </div>

            {/* Databse user */}
            <div className="flex items-center m-2">
                <div
                  className="w-[160px]">
                    <label className="text-[16px]">Database user : </label>
                </div>
                <div>
                    <input 
                    {...register("user" , {required : true})}
                    type="text" 
                    placeholder="Enter the database user" 
                    className="border p-2 text-[13px] rounded-lg w-[280px]" />
                </div>
            </div>

            {/* Database user password */}
            <div className="flex items-center m-2">
                <div
                  className="w-[160px]">
                    <label className="text-[16px]">Database password : </label>
                </div>
                <div>
                    <input 
                    {...register("password" , {required : true})}
                    type="text" 
                    placeholder="Enter the database password" 
                    className="border p-2 text-[13px] rounded-lg w-[280px]" />
                </div>
            </div>

            {/* Database PORT */}
            <div className="flex items-center m-2">
                <div
                 className="w-[160px]">
                    <label className="text-[16px]">Database PORT : </label>
                </div>
                <div>
                    <input 
                    {...register("port" , {required : true})}
                    type="text" 
                    placeholder="Enter the database PORT" 
                    className="border p-2 text-[13px] rounded-lg w-[280px]" />
                </div>
            </div>

            {/* Form Submittion */}
            <div
             className="flex justify-between m-2">
                <button className="btn btn-outline-danger m-2">Cancel</button>
                <input className="btn btn-outline-success m-2" type="submit" />
             </div>

            </form>
        </div>
        </>
    )
};

export default AddDbConnectionForm;