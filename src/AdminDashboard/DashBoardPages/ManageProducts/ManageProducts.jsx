import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import MUIDataTable from "mui-datatables";
import { Link } from "react-router-dom";

const ManageProducts = () => {
    const axiosPrivate = useAxiosPrivate();
    const { data: allProducts = [], refetch } = useQuery({
        queryKey: ["allProducts"],
        queryFn: async () => {
            const res = await axiosPrivate.get("/dashboardAllProducts");
            console.log(res.data);

            return res.data;
        }
    })

    const handleViewDetails = () => {

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
            name: "productImg",
            label: " Image",
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
            name: "productName",
            label: " Name",
            options: { filter: true },
        },
        {
            name: "productCategory",
            label: " Category",
            options: { filter: true },
        },
        {
            name: "productType",
            label: " Type",
            options: { filter: true },
        },
        {
            name: "productPrice",
            label: " Price",
            options: { filter: true },
        },
        {
            name: "productQuantity",
            label: "Quantity",
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
                            <button
                                onClick={() => handleViewDetails(allProducts[tableMeta.rowIndex]._id)}
                                className="btn bg-blue-500 text-white"
                            >
                                View Details
                            </button>

                            <Link to={`/dashboard/updateProduct/${allProducts[tableMeta.rowIndex]._id}`}>
                                <button 
                                    className="btn bg-blue-500 text-white"
                                >
                                    Update 
                                </button>
                            </Link>




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
        <div>
            <div className=" px-4 mt-8">

                <MUIDataTable className=" md:w-auto"
                    title={""}

                    data={allProducts}
                    columns={columns}
                    options={options}

                />



            </div>
        </div>
    );
};

export default ManageProducts;