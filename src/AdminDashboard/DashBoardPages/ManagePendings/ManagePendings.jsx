import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import MUIDataTable from "mui-datatables";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ManagePendings = () => {
    const axiosPrivate = useAxiosPrivate();
    // const [pendingsData,setData]=useState([]);

    const { data: pendingsData=[], refetch } = useQuery({
        queryKey: ["pendingsData"],
        queryFn: async () => {
            const res = await axiosPrivate.get("/managePendingsData");
            console.log(res.data);

            return res.data;
        }
    })

    // useEffect(()=>{
    //      axiosPrivate.get("/managePendingsData")
    //      .then(res=>setData(res.data))



    // },[pendingsData])

    console.log(pendingsData);

    const handlePaymentStatus = async (id) => {
        console.log(id);
        const res = await axiosPrivate.patch(`/approvePaymentStatus/${id}`);
        console.log(res.data);

        if (res?.data?.modifiedCount > 0) {
            Swal.fire({
                icon: "success",
                title: "Successful",
                text: "Updated Status",

            });
            refetch();
        }
    }

    const handleDeliveryStatus = async (id) => {
        console.log(id);
        const res = await axiosPrivate.patch(`/approveDeliveryStatus/${id}`);
        console.log(res.data);

        if (res?.data?.modifiedCount > 0) {
            Swal.fire({
                icon: "success",
                title: "Successful",
                text: "Updated Status",

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
            name: "itemsInfo",
            label: "productName",
            options: {
                filter: false,

                customBodyRender: (value) => {
                    if (Array.isArray(value)) {
                        return value.map(item => (
                            <div key={item.productId}>
                                {item.productName}: {item.productSltQnt}x
                            </div>
                        ));
                    }

                },
            },
        },
        {
            name: "transactionId",
            label: "Transaction Id",
            options: { filter: true },
        },
        {
            name: "customerEmail",
            label: "CustomerEmail",
            options: { filter: true },
        },
        {
            name: "customerName",
            label: "",
            options: { filter: false, },
        },

        {
            name: "paymentStatus",
            label: "Payment Status",
            options: {
                filter: false,

                customBodyRender: (value, tableMeta) => {
                    return (

                        <div>
                            {
                                value == "Success" ? <div className="text-green-700 font-semibold">{value}</div> : <button
                                    onClick={() => handlePaymentStatus(pendingsData[tableMeta.rowIndex]._id)}
                                    className="btn bg-blue-700 text-white"
                                >
                                    Done
                                </button>
                            }



                        </div>

                    );
                },
            },
        },
        {
            name: "deliveryStatus",
            label: "Delivery Status",
            options: {
                filter: false,

                customBodyRender: (value, tableMeta) => {
                    return (

                        <div>
                            {
                                value == "Success" ? <div className="text-green-700">{value}</div> : <button
                                    onClick={() => handleDeliveryStatus(pendingsData[tableMeta.rowIndex]._id)}
                                    className="btn bg-blue-700 text-white"
                                >
                                    Done
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
        <div>
            <div className=" px-4 mt-8">

                <MUIDataTable className=" md:w-auto"
                    title={""}

                    data={pendingsData}
                    columns={columns}
                    options={options}

                />



            </div>
        </div>
    );
};

export default ManagePendings;