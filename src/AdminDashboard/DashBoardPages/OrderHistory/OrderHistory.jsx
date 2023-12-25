import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const OrderHistory = () => {

    const axiosPrivate = useAxiosPrivate();
    // const { user } = useContext(AuthContext);
    const { data: OrderStat = [], refetch } = useQuery({
        queryKey: ["OrderStat"],
        queryFn: async () => {
            const res = await axiosPrivate.get(`/getOrderInfoStat`);
            console.log(res.data);

            return res.data;
        }
    })
    console.log(OrderStat);

    const data = [
        {
            name: "Success",
            value: OrderStat?.deliveryStatus[0]?.Success
        },
        {
            name: "Pending",
            value: OrderStat?.deliveryStatus[0]?.Pending
        },
    ]

    return (
        <div>
            <div className="flex justify-center mt-10">
                <div className="stats gap-10 ">

                    <div className="stat text-white bg-violet-600 rounded-xl w-[250px]">
                        <div className="stat-title text-white font-semibold">Total Orders</div>
                        <div className="stat-value">{OrderStat?.totalOrders}</div>

                    </div>
                    <div className="stat text-white bg-red-600 rounded-xl w-[250px]">
                        <div className="stat-title text-white font-semibold">Delivered Already</div>
                        <div className="stat-value">{OrderStat?.deliveryStatus[0]?.Success}</div>

                    </div>
                    <div className="stat text-white bg-yellow-300 font-semibold rounded-xl w-[250px]">
                        <div className="stat-title text-white">Yet to Deliver</div>
                        <div className="stat-value">{OrderStat?.deliveryStatus[0]?.Pending}</div>

                    </div>

                </div>
            </div>

            <div className="mt-16">
                <BarChart
                    width={600}
                    height={500}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                    barSize={20}
                >
                    <XAxis dataKey="name" scale="point" padding={{ left: 100, right: 100 }} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Bar dataKey="value" fill="#8884d8" background={{ fill: '#eee' }} />
                </BarChart>

                <div>
                    
                </div>
            </div>
        </div>
    );
};

export default OrderHistory;