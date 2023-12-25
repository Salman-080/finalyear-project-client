import axios from "axios";
import { useContext, useEffect, useState } from "react";
import useCart from "../../Hooks/useCart";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
    // const [cartProducts, setCartProducts]= useState([]);
    // const {user}= useContext(AuthContext);

    // useEffect(()=>{
    //     axios.get(`http://localhost:5000/cart?email=${user?.email}`)
    //     .then(res=>{
    //         console.log(res.data)
    //         setCartProducts(res.data)
    //     })
    // },[])

    const [carts, refetch] = useCart();
    console.log(carts);
    const navigate=useNavigate();

    const totalPrice = carts.reduce((total, item) => total + (item.productPrice) * (item.productSltQnt), 0);
    console.log(totalPrice)

    const handleDeleteCart = (cartDataId) => {
        console.log(cartDataId)

        axios.delete(`http://localhost:5000/cartDataDelete/${cartDataId}`)
            .then(res => {
                console.log(res.data);

                if (res?.data?.deletedCount > 0) {
                    Swal.fire({
                        icon: "success",
                        title: "Successful",
                        text: "Successfully Deleted from Cart",

                    });

                    refetch();
                }
            })
    }

    // const handleIncQnt=(cartData)=>{
    //     console.log(cartData);
    //     if(quantityUpdate<cartData.productQuantity){
    //         setQuantityUpdate(quantityUpdate+1);
    //     }
    // }

    const handlePurchase=()=>{
        
        const filterExceedQnty= carts.filter(cart=> cart.productSltQnt> cart.productQuantity);
        console.log(filterExceedQnty);

        if(filterExceedQnty.length>0){
          const errMessage= filterExceedQnty.map(filterData=> `${filterData.productName} has ${filterData.productQuantity} in stock. You selected quantity ${filterData.productSltQnt}.`).join('\n');
            
          Swal.fire({
            icon: "error",
            title: "Error",
            text: `${errMessage} "Please decrease quantity`,
        });
        
        }
        else{
            console.log("navigateee");
            navigate("/payment");
        }
        
    }



    return (

        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className=" flex flex-col gap-4 md:col-span-3">
                <div className="text-center text-4xl mt-5 mb-5 font-semibold text-orange-600">
                    Your Selected Items
                </div>
                {
                    carts?.map(cartData =>
                        <div key={cartData._id} className="mb-4 px-4">
                            <div className=" md:flex gap-5 items-center">

                                <div className="md:h-[200px] md:w-[250px]">
                                    <img className="h-full w-full" src={cartData.productImg} alt="" />
                                </div>

                                <div className="space-y-3">

                                    <h2 className="text-3xl font-semibold">{cartData.productName}</h2>
                                    <h2 className="text-lg">{cartData.brandName}</h2>
                                    <h2 className="text-sm text-gray-500">{cartData.productType}</h2>

                                    <h2 className="text-sm text-gray-500">{cartData.productSltQnt}</h2>



                                    <button onClick={() => handleDeleteCart(cartData._id)} className="btn bg-orange-600 text-white">Remove</button>



                                </div>
                                <div className="md:flex-grow"></div>
                                <div className="md:mr-36">
                                    <p className=""><span className="text-xl font-bold ">Price:</span> <span className="text-lg text-orange-700 font-bold">${cartData.productPrice}</span> </p>
                                </div>



                            </div>
                            <div className="border border-gray-300 mt-3"></div>
                        </div>


                    )
                }
            </div>

            <div className="max-h-screen-xl shadow-xl h-fit px-6 py-12 mt-12 md:col-span-1">
                <div className="text-2xl font-semibold text-center">
                    Order
                </div>
                <br />
                <div className="space-y-2">
                    <h2>Total Items: {carts.length}</h2>
                    <h2>Total Price: ${totalPrice}</h2>
                    <h2>Discount: </h2>
                </div>
                

                
                    <button onClick={handlePurchase} disabled={totalPrice == 0} className="btn bg-orange-500">Purchase</button>
                


            </div>
        </div>
    );
};

export default Cart;