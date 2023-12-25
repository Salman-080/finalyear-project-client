import { FaBeer, FaBook, FaDollarSign, FaMemory, FaProductHunt, FaSitemap, FaUser } from 'react-icons/fa';
import useAxiosPrivate from '../../../Hooks/useAxiosPrivate';
import { useQuery } from '@tanstack/react-query';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Pie, PieChart, Legend } from 'recharts';


const AdminHome = () => {
    const axiosPrivate = useAxiosPrivate();
    const { data: Stats = [], refetch } = useQuery({
        queryKey: ["Stats"],
        queryFn: async () => {
            const res = await axiosPrivate.get("/adminHomeStats");
            console.log(res.data);

            return res.data;
        }
    })

    const { data: OrdersStats = [] } = useQuery({
        queryKey: ["OrdersStats"],
        queryFn: async () => {
            const res = await axiosPrivate.get("/orderStats");
            console.log(res.data);

            return res.data;
        }
    })

    const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];


    const getPath = (x, y, width, height) => {
        return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
        ${x + width / 2}, ${y}
        C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
        Z`;
    };

    const TriangleBar = (props) => {
        const { fill, x, y, width, height } = props;

        return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
    };


    //piechart configuration
    const pieChartData = OrdersStats?.map(stat => {
        return { name: stat?.categoryName, value: stat?.totalRevenue }
    })
    console.log(pieChartData)
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };


    return (
        <div>
            <div className="flex justify-center mt-8">
                <div className="stats shadow gap-16">

                    <div className="stat bg-yellow-400 text-white space-y-2">

                        <div className="stat-title text-3xl text-white font-bold">Revenues</div>

                        <div className='flex gap-2 items-center justify-center'>
                            <div className="stat-value text-4xl">{Stats?.revenue}</div>

                            <FaDollarSign className='text-3xl'></FaDollarSign>

                        </div>


                    </div>

                    <div className="stat bg-red-400 text-white space-y-2">

                        <div className="stat-title text-3xl text-white font-bold">Products</div>

                        <div className='flex gap-2 items-center justify-center'>
                            <div className="stat-value text-4xl">{Stats?.products}</div>

                            <FaBook className='text-3xl'></FaBook>

                        </div>


                    </div>

                    <div className="stat bg-blue-400 text-white space-y-2">

                        <div className="stat-title text-3xl text-white font-bold">Customers</div>

                        <div className='flex gap-2 items-center justify-center'>
                            <div className="stat-value text-4xl">{Stats?.customers}</div>

                            <FaUser className='text-3xl'></FaUser>

                        </div>


                    </div>

                    <div className="stat bg-green-400 text-white space-y-2">

                        <div className="stat-title text-3xl text-white font-bold">Orders</div>

                        <div className='flex gap-2 items-center justify-center'>
                            <div className="stat-value text-4xl">{Stats?.orders}</div>

                            <FaMemory className='text-3xl'></FaMemory>

                        </div>


                    </div>

                </div>
            </div>

            <div className='flex flex-col md:flex-row mt-24 gap-14 justify-center items-center'>

                <div className=''>
                    <PieChart width={400} height={400}>
                        <Pie
                            data={pieChartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={140}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {pieChartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Legend></Legend>
                    </PieChart>
                </div>

                <div>
                    <BarChart
                        width={600}
                        height={400}
                        data={OrdersStats}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="categoryName" />
                        <YAxis />
                        <Bar dataKey="totalQuantity" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
                            {OrdersStats?.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                            ))}
                        </Bar>
                        
                    </BarChart>
                </div>

            </div>


        </div>
    );
};

export default AdminHome;