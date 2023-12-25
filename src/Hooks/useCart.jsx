import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../Provider/Provider";

const useCart = () => {
    const {user}= useContext(AuthContext);
    console.log(user)
    const {refetch, data: carts=[]}=useQuery({
        queryKey: ['carts', user?.email],
        queryFn: async ()=>{
            const res= await axios.get(`http://localhost:5000/cart?email=${user.email}`);
            return res.data;
        }
    });
    
    return [carts, refetch]
};

export default useCart;