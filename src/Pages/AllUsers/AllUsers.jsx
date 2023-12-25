import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import MUIDataTable from "mui-datatables";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import Swal from "sweetalert2";

const AllUsers = () => {
    const axiosPrivate = useAxiosPrivate();
    // const [allUsers, setAllUsers] = useState([]);
    // useEffect(() => {
    //     axios.get("http://localhost:5000/users")
    //         .then(res => {
    //             console.log(res.data);
    //             setAllUsers(res.data);
    //         })
    // }, [])
    // console.log(allUsers)

    // const [pendingsData,setData]=useState([]);

    const { data: allUsers=[], refetch } = useQuery({
        queryKey: ["allUsers"],
        queryFn: async () => {
            const res = await axiosPrivate.get("/users");
            console.log(res.data);

            return res.data;
        }
    })


    const handleAddAdmin = async (userId) => {
        console.log(userId)
        const res = await axiosPrivate.patch(`/addAsAdmin/${userId}`);
        console.log(res.data);

        if (res?.data?.modifiedCount > 0) {
            Swal.fire({
                icon: "success",
                title: "Successful",
                text: "Added as Admin",

            });
            refetch();
        }
    }
    const handleRemoveFromAdmin = async (userId) => {
        console.log(userId)
        const res = await axiosPrivate.patch(`/removeFromAdmin/${userId}`);
        console.log(res.data);

        if (res?.data?.modifiedCount > 0) {
            Swal.fire({
                icon: "success",
                title: "Successful",
                text: "Removed from Admin",

            });
            refetch();
        }
    }


    const columns = [
        {
            name: "SL",
            label: "SL",
            options: {
                filter: false,
                customBodyRender: (notUsing, idx, notUsingToo) => {
                    return idx.rowIndex + 1;
                },
            }
        },

        {
            name: "userImg",
            label: "User Image",
            options: {
                filter: false,
                customBodyRender: (userImage, tableMeta, updateValue) => {
                    return (
                        <img src={userImage} alt="Image" className="w-[40px] h-[40px] rounded-full" />
                    );
                },
            },
        },
        {
            name: "userName",
            label: "User Name",
            options: { filter: true },
        },
        {
            name: "userEmail",
            label: "User Email",
            options: { filter: true },
        },


        {
            name: "role",
            label: "Action",
            options: {
                filter: false,

                customBodyRender: (value, tableMeta) => {
                    return (

                        <div>
                            {
                                value == "Admin" ? <button
                                    onClick={() => handleRemoveFromAdmin(allUsers[tableMeta.rowIndex]._id)}
                                    className="btn bg-red-500 text-white"
                                >
                                    Remove From Admin
                                </button> : <button
                                    onClick={() => handleAddAdmin(allUsers[tableMeta.rowIndex]._id)}
                                    className="btn bg-green-500 text-white"
                                >
                                    Make Admin
                                </button>
                            }



                        </div>

                    );
                },
            },
        },


    ];

    const options = {
        filter: true,
        search: true,
        responsive: "",
        selectableRows: "none",



    };
    return (
        <div className="">
            <div className=" px-4 mt-8">

                <MUIDataTable className=" md:w-auto"
                    title={""}

                    data={allUsers}
                    columns={columns}
                    options={options}

                />



            </div>
        </div>
    );
};

export default AllUsers;