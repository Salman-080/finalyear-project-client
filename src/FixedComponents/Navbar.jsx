import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../Provider/Provider";
import useCart from "../Hooks/useCart";

const Navbar = () => {
    const {user, logOut, loading}= useContext(AuthContext);
    const [carts]= useCart();
    console.log(user)

console.log(loading)
    


    const navLinks= <>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/shop/All">Shop</NavLink></li>
        <li><NavLink to="/cart">My Cart <p className="text-red-500">+{carts.length}</p></NavLink>
            
        </li>
        <li><NavLink to="/addProducts">Add Products</NavLink></li>
        {/* <li><NavLink to="/allUsers">All Users</NavLink></li> */}
        <li><NavLink to="/dashboard/adminHome">DashBoard</NavLink></li>
        <li><NavLink to="/orderHistory">My Orders</NavLink></li>
    </>

    const googleSignIn=()=>{

    }

    const handleLogOut=()=>{
        logOut()
        .then(() => {
          // Sign-out successful.
        }).catch((error) => {
          // An error happened.
        });
    }
   
    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navLinks}
                    
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">daisyUI</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 md:space-x-12">
                    
                 {navLinks}
                   
                </ul>
            </div>
            <div className="navbar-end">
                {/* <div className="mr-6">
                    <button onClick={handleTheme}>{
                        theme == "darkTheme" ? <img className="w-[30px] h-[30px]" src="/toggleDark.png" alt="" /> :
                            <img className="w-[30px] h-[30px]" src="/toggleLight.png" alt="" />
                    }</button>
                </div> */}
                <div className="dropdown dropdown-end dropDown_zIndex relative">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                         <div className="w-10 rounded-full">
                            {user ?  <img src={  user?.photoURL ?  user.photoURL : "https://i.ibb.co/4t3SVXP/man-avatar-profile-picture-vector-illustration-268834-538.jpg"} />
                                :
                                <img src="https://i.ibb.co/4t3SVXP/man-avatar-profile-picture-vector-illustration-268834-538.jpg" />
                            }
                        </div>
                        
                    </label>
                    <ul tabIndex={0} className="mt-3 z-50 p-4 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-[200px] md:w-[300px] mr-2">

                        {
                            user ?
                                <div className="space-y-6">
                                    <p className="text-center text-xl font-semibold "><span className="text-orange-400">Logged as </span> <br /> <span className="text-base"> {user?.displayName}</span></p>
                                    <p className="text-center text-sm font-thin "><span className="text-base font-normal">Email:</span> <span className="text-sm"> {user?.email}</span></p>

                                    <hr />
                                    <div className="text-center">
                                        <button  onClick={handleLogOut} className="btn bg-orange-500 text-white w-full">Log Out</button>
                                    </div>
                                </div>
                                :
                                <div className="space-y-6">
                                    <Link to="/login"><li className="text-lg hover:bg-orange-300 hover:text-white hover:py-[6px] hover:px-2 hover:rounded text-orange-400 font-medium">Login</li></Link>
                                    <br />
                                    <Link to="/register"> <li className="text-lg hover:bg-orange-300 hover:text-white hover:py-[6px] hover:px-2 hover:rounded text-orange-400 font-medium">Register</li></Link>
                                    <hr />
                                    <div className=" text-center">
                                        <button onClick={googleSignIn} className="bg-orange-800 px-3 py-2 text-white rounded-xl font-semibold hover:bg-orange-300">Log In with Google</button>
                                    </div>
                                </div>

                        }


                    </ul>
                </div>

            </div>
        </div>
    );
};

export default Navbar;