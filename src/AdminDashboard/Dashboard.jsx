import { Link, NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
    return (

        <div className="flex flex-col md:flex-row gap-5">
            <div className="w-full md:w-[240px] bg-orange-500 md:min-h-screen p-2">
                <h2 className="text-2xl font-bold">Admin Dashboard</h2>
                <div className="">
                    <ul className=" flex flex-wrap md:flex-col gap-2">
                        {/* Sidebar content here */}
                        <li><NavLink to="/dashboard/adminHome">Admin Home</NavLink></li>

                        <li><NavLink to="/dashboard/manageProducts">Manage Products</NavLink></li>
                        <li><NavLink to="/dashboard/addCategories">Add Categories</NavLink></li>
                        <li><NavLink to="/dashboard/addProducts">Add Products</NavLink></li>
                      


                        <li><NavLink to="/dashboard/manageUsers">Manage Users</NavLink></li>
                        <li><NavLink to="/dashboard/paymentHistory">Payment History</NavLink></li>
                        <li><NavLink to="/dashboard/orderHistory">Order History</NavLink></li>
                        <li><NavLink to="/dashboard/managePendings">Manage Pendings</NavLink></li>
                        <li><Link to="/">Exit From Dashboard</Link></li>

                    </ul>
                </div>
            </div>

            <div className="flex-1">
                   <Outlet></Outlet>
            </div>
        </div>
       
    );
};

export default Dashboard;