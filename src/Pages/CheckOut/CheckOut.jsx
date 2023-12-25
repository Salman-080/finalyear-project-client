import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useCart from "../../Hooks/useCart";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import { AuthContext } from "../../Provider/Provider";
import Swal from "sweetalert2";

const CheckOut = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [err, setErr] = useState("");
    const [clientSecret, setClientSecret] = useState("");
    const [transactionId, setTransactionId] = useState('');
    const { user } = useContext(AuthContext);
    const axiosPrivate = useAxiosPrivate();
    const [carts, refetch] = useCart();
    console.log(carts);
    const [customerName, setCustomerName] = useState("")
    const [customerEmail, setCustomerEmail] = useState("")
    const [customerPhone, setCustomerPhone] = useState("")
    const [customerAddress, setCustomerAddress] = useState("")
    const [paymentType, setPaymentType] = useState("CashOnDelivery")
    const [openCardDiv, setOpenCardDiv] = useState(false);
    console.log(paymentType);
    const totalPrice = carts.reduce((total, item) => total + (item.productPrice) * (item.productSltQnt), 0);
    console.log(customerEmail)
    console.log(customerName)
    useEffect(() => {
        if (totalPrice > 0) {
            axiosPrivate.post("/create-payment-intent", { price: totalPrice })
                .then(res => {
                    console.log(res.data);
                    setClientSecret(res.data.clientSecret);
                })

        }

    }, [axiosPrivate, totalPrice])

    const handleSubmitCheckOut = async (e) => {
        e.preventDefault();

        setCustomerName(e.target.customer_Name.value);
        setCustomerEmail(e.target.customer_Email.value);
        setCustomerAddress(e.target.customer_Address.value);
        setCustomerPhone(e.target.customer_Phone.value);
     

        if (paymentType == "CardPayment") {
            setOpenCardDiv(!openCardDiv);
            return;
        }


        const orderInfo={
            customerName: e.target.customer_Name.value,
            customerEmail: e.target.customer_Email.value,
            customerAddress: e.target.customer_Address.value,
            customerPhone: e.target.customer_Phone.value,       
            totalPrice: totalPrice,
            itemsInfo: carts.map((item) => ({
                    productId: item.product_id,
                    productName: item.productName,
                    productType: item.productType,
                    productCategory: item.productCategory,
                    productPrice: item.productPrice,
                    productSltQnt: item.productSltQnt,
                    
                  })),
            
            cartIds: carts.map(cartId=> cartId._id),
            productIds: carts.map(productId=> productId.product_id),
            paymentMethod: paymentType,
            paymentStatus: "Pending",
            deliveryStatus: "Pending",
            

        }
        console.log(orderInfo);
        
       

        const response = await axiosPrivate.post("/payment", orderInfo);
        console.log(response?.data);
        if(response?.data?.paymentInsResult?.insertedId){
            refetch();
            Swal.fire({
                icon: "success",
                title: "Successful",
                text: "Order Successfull. We will contact you as soon as possible for product delivery! Thank You!",

            });
        }



    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {

            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }


        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('error', error);
            setErr(error.message);
        } else {
            console.log('PaymentMethod Successfull', paymentMethod);
        }


        const { paymentIntent, error: confirmPaymentError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user?.displayName || "Anonymous",
                        email: user?.email || "Anonymous",
                    }
                },
            },
        );

        if (confirmPaymentError) {
            console.log("payment confirm error", confirmPaymentError);

            setErr(confirmPaymentError.message);
        }
        else {
            console.log("payment Confirm Success", paymentIntent);
            if (paymentIntent.status == "succeeded") {
                setTransactionId(paymentIntent.id);

                const orderInfo={
                    customerName: customerName,
                    customerEmail: customerEmail,
                    customerAddress: customerAddress,
                    customerPhone: customerPhone,       
                    totalPrice: totalPrice,
                    itemsInfo: carts.map((item) => ({
                            productId: item.product_id,
                            productName: item.productName,
                            productType: item.productType,
                            productCategory: item.productCategory,
                            productPrice: item.productPrice,
                            productSltQnt: item.productSltQnt,
                          })),
                    
                    cartIds: carts.map(cartId=> cartId._id),
                    productIds: carts.map(productId=> productId.product_id),
                    paymentMethod: paymentType,
                    transactionId: paymentIntent.id,
                    paymentStatus: "Success",
                    deliveryStatus: "Pending",
                    

                }

                console.log(orderInfo);

                const response = await axiosPrivate.post("/payment", orderInfo);
                console.log(response.data);
                if(response.data.paymentInsResult.insertedId){
                    refetch();
                    Swal.fire({
                        icon: "success",
                        title: "Successful",
                        text: "Payment Successfull. We will contact you as soon as possible for product delivery! Thank You!",

                    });
                }

            }
        }


    };

    return (
        <div className="mt-8 mb-20">
            
            <div className="max-w-screen-xl mx-auto flex flex-col justify-center mb-11 w-[250px] md:w-[300px] lg:w-[600px]">
                <div className="bg-black text-white py-2">
                    <h2 className="text-center text-lg">CheckOut</h2>
                </div>
                <div className="bg-gray-100">
                    <form onSubmit={handleSubmitCheckOut} className="  ">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-12 py-10">
                            <input name="customer_Name" className="py-2 px-1" type="text" required />
                            <input name="customer_Email" className="py-2 px-1" readOnly value={user?.email} type="email" required />
                            <input name="customer_Address" className="py-2 px-1" type="text" placeholder="Address" required />
                            <input name="customer_Phone" className="py-2 px-1" type="number" placeholder="Phone" required />
                            <select onChange={(e) => setPaymentType(e.target.value)} className="py-2 px-1" name="" id="">
                                <option selected disabled value="CashOnDelivery">Cash on Delivery</option>
                                <option value="CashOnDelivery">Cash on Delivery</option>
                                <option value="CardPayment">Card Payment</option>
                            </select>

                        </div>
                        <div className="text-center mb-2">
                            <button className="btn btn-secondary">Submit</button>
                        </div>
                    </form>

                </div>

            </div>
            {
                openCardDiv && (
                    <form onSubmit={handleSubmit} >
                        <div className="bg-black w-[600px] max-w-screen-xl mx-auto py-2">
                            <h2 className="text-white text-lg text-center">Card Payment</h2>
                        </div>

                        {/* {
                    loading && <div className="text-center"><span className="loading loading-spinner loading-lg"></span></div>
                } */}
                        <div className="md:w-[600px] bg-slate-100 mx-auto h-[200px] grid items-center space-y-4 mt-2  md:px-14">
                            <CardElement className=" "
                                options={{
                                    style: {
                                        base: {
                                            fontSize: '16px',
                                            color: '#424770',
                                            '::placeholder': {
                                                color: '#aab7c4',
                                                backgroundColor: "white",


                                            },
                                        },
                                        invalid: {
                                            color: '#9e2146',
                                        },
                                    },
                                }}
                            />

                            <div className="text-center">
                                <button className=" btn bg-green-400 text-white" type="submit" disabled={!stripe || !clientSecret}>
                                    Pay
                                </button>
                            </div>





                        </div>

                        <div className="text-center text-red-600">
                            <h2>{err}</h2>
                        </div>

                        {
                            transactionId && (
                                <div className="text-center" >
                                    <h2> Your Transaction Id: <span className=" text-green-600"> {transactionId}</span> </h2>
                                </div>
                            )
                        }




                    </form>
                )
            }

        </div>
    );
};

export default CheckOut;