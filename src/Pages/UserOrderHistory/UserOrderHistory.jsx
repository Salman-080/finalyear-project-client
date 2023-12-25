import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import { useContext } from "react";
import { AuthContext } from "../../Provider/Provider";
import { format } from "date-fns";

const UserOrderHistory = () => {
    const axiosPrivate = useAxiosPrivate();
    const { user } = useContext(AuthContext);

    const { data: orderHistory = [], refetch } = useQuery({
        queryKey: ["orderHistory"],
        queryFn: async () => {
            const res = await axiosPrivate.get(`/usersOrder/${user?.email}`);
            console.log(res.data);

            return res.data;
        }
    })

    console.log(orderHistory)
    return (
        <div className="max-w-screen-xl mx-auto mt-12">
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>SL</th>
                            <th>Transaction ID</th>
                            <th>Total Price</th>
                            <th>Delivery Method </th>
                            <th>Payment Status</th>
                            <th>Delivery Status</th>
                            <th>Ordered Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}

                        {
                            orderHistory?.map((order, idx) => (
                                <tr key={order._id}>
                                    <th>{idx+1}</th>
                                    <td>{order.transactionId ? order.transactionId : "Not Paid Yet" }</td>
                                    <td>${order.totalPrice}</td>
                                    <td>{order.paymentMethod}</td>
                                    <td>{order.deliveryStatus}</td>
                                    <td>{order.paymentStatus}</td>
                                    <td>{order?.orderDateTime && format(order?.orderDateTime, "yyyy-MM-dd hh:mm a") }</td>
                                </tr>
                            ))
                        }
 
                    </tbody>
                

                </table>
            </div>
        </div>
    );
};

export default UserOrderHistory;