import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const PaymentHistory = () => {
    const axiosPrivate = useAxiosPrivate();
    // const { user } = useContext(AuthContext);
    const { data: PaymentStat = [], refetch } = useQuery({
        queryKey: ["PaymentStat"],
        queryFn: async () => {
            const res = await axiosPrivate.get(`/paymentStats`);
            console.log(res.data);

            return res.data;
        }
    })
    return (
        <div>
            <div className="flex justify-center mt-6">
                <div className="stats gap-10 ">

                    <div className="stat text-white bg-green-600 rounded-xl w-[200px]">
                        <div className="stat-title text-white">Total Success Paid</div>
                        <div className="stat-value">{PaymentStat[0]?.Success}</div>

                    </div>
                    <div className="stat text-white bg-red-600 rounded-xl w-[200px]">
                        <div className="stat-title text-white">Yet to Pay</div>
                        <div className="stat-value">{PaymentStat[0]?.Pending}</div>

                    </div>

                </div>



                <div>

                </div>
            </div>

        </div>
    );
};

export default PaymentHistory;