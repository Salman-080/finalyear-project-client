import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../../Provider/Provider";
import Swal from "sweetalert2";
import useCart from "../../Hooks/useCart";

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [reviews, setReviews] = useState([]);
    const { user } = useContext(AuthContext);
    const [render, setRender] = useState(false);
    const [renderAgain, setRenderAgain] = useState(false);
    const [quantityUpdate, setQuantityUpdate] = useState(1);

    const [, refetch] = useCart();

    useEffect(() => {
        axios.get(`http://localhost:5000/product/${id}`)
            .then(res => {
                console.log(res.data);
                setProduct(res.data);
            })
    }, [renderAgain])
    console.log(product)
    console.log(id)
    console.log(product._id)

    useEffect(() => {
        axios.get(`http://localhost:5000/reviews/${product._id}`)
            .then(res => {
                console.log(res.data);
                setReviews(res.data);

            })
    }, [product, render])

    console.log(reviews)

    const handleAddToCart = (product) => {
        const addingProductToCart = {

            product_id: product._id,
            productName: product.productName,
            productCategory: product.productCategory,
            productImg: product.productImg,
            productShortDescription: product.productShortDescription,
            productLongDescription: product.productLongDescription,
            productType: product.productType,
            productFeatured: product.productFeatured,
            productBestSelling: product.productBestSelling,
            productNewArrival: product.productNewArrival,
            productQuantity: product.productQuantity,
            productPrice: product.productPrice,
            productTargeter: product.productTargeter,
            productSltQnt: quantityUpdate,
            userEmail: user?.email
        }
        axios.post("http://localhost:5000/cart", addingProductToCart)
            .then(res => {
                console.log(res.data)
                if (res?.data?.insertedId) {
                    Swal.fire({
                        icon: "success",
                        title: "Successful",
                        text: "Successfully Added to Cart",

                    });

                    refetch();

                }
            })
    }


    const handleUpdateProduct = () => {

    }

    const handleReviews = e => {
        e.preventDefault();

        const productReviewInfo = {
            Review: e.target.ReviewBox.value,
            product_id: product._id,
            userEmail: user?.email,
            userImage: user?.photoURL,
            userName: user?.displayName
        }

        axios.post("http://localhost:5000/reviews", productReviewInfo)
            .then(res => {
                console.log(res.data)
                if (res?.data?.insertedId) {
                    Swal.fire({
                        icon: "success",
                        title: "Successfull",
                        text: "Your Review added successfully",

                    });

                    setRender(!render);
                }

            })
    }

    const handleDelete = (deletingProductId) => {
        axios.delete(`http://localhost:5000/productDeleteFromShop/${deletingProductId}`)
            .then(res => {
                console.log(res.data);
                if (res?.data?.deletedCount > 0) {
                    Swal.fire({
                        icon: "success",
                        title: "Successful",
                        text: "Successfully Deleted",

                    });
                    setRenderAgain(!renderAgain);


                }

            })
    }


    const handleIncQnt = (cartData) => {
        console.log(cartData);
        if (quantityUpdate < cartData.productQuantity) {
            setQuantityUpdate(quantityUpdate + 1);
        }
    }

    return (
        <div className="max-w-screen-xl mx-auto">
            {
                product ? <div className="card lg:card-side bg-base-100 shadow-xl space-x-4 px-2 py-3">
                    <figure className=" lg:w-[550px]"><img className=" w-full h-full" src={product.productImg} alt="" /></figure>
                    <div className=" lg:w-[750px] space-y-3">
                        <h2 className="card-title">{product.productName}</h2>
                        <p><span className="text-lg font-semibold">Brand: </span> <span>{product.productName}</span></p>
                        <p><span className="text-lg font-semibold">Type: </span> <span>{product.productCategory}</span></p>
                        <p><span className="text-lg font-semibold">Description: </span> <span>{product.productShortDescription}</span></p>


                        {/* <p className="flex items-center gap-2"><span className="text-lg font-semibold">Rating: </span> <span className="flex">

                        {
                            array.map((a, idx) => a + 1 <= productData.rating ? <div key={idx}> <FaStar className="text-yellow-400"></FaStar></div> : <div key={idx + 1}><AiOutlineStar ></AiOutlineStar></div>)
                        }
                    </span></p> */}



                        <p><span className="text-lg font-semibold">Price: </span> <span>${product.productPrice}</span></p>
                        <p><span className="text-lg font-semibold">Quantity: </span> <span>{product.productQuantity}</span></p>


                        <div className="card-actions mt-3">


                            {/* Open the modal using document.getElementById('ID').showModal() method */}
                            <button className="btn" onClick={() => document.getElementById(`my_modal_5${product?._id}`).showModal()}>Add To Cart</button>
                            <dialog id={`my_modal_5${product?._id}`} className="modal modal-bottom sm:modal-middle">
                                <div className="modal-box">

                                    <div className="md:mr-36">

                                        <button>-</button>
                                        <input
                                            type="number"
                                            name="sltQnt"
                                            value={quantityUpdate} // Default quantity is 1

                                            className="border border-gray-300 p-1 w-16"
                                        />
                                        <button onClick={() => handleIncQnt(product)}>+</button>
                                    </div>
                                    <div className="modal-action">
                                        <form method="dialog">
                                            {/* if there is a button in form, it will close the modal */}
                                            <button onClick={() => handleAddToCart(product)} className="btn bg-orange-500 text-white">Add To Cart</button>
                                            <button className="btn">Close</button>
                                        </form>
                                    </div>
                                </div>
                            </dialog>
                        </div>

                        <div> <Link to={`/update/${product._id}`}><button className="btn bg-orange-500 text-white">Update</button></Link> </div>
                        <button onClick={() => handleDelete(product._id)} className="btn btn-primary">Delete</button>
                    </div>


                </div>
                    :
                    <h2>Product Removed</h2>
            }


            {
                product && <div className="space-y-3">
                    <h2 className="text-4xl font-bold mt-4">Reviews</h2>


                    <div className="space-y-6">
                        {
                            reviews?.length !== 0 ? (
                                reviews?.map(review => <div key={review._id} className="flex gap-4 items-center">
                                    <div className="w-[40px] h-[40px] rounded-full">
                                        {
                                            review?.userImage ? <img className="w-full h-full rounded-full" src={review?.userImage} alt="" />
                                                :
                                                <img className="w-full h-full rounded-full" src="https://i.ibb.co/4t3SVXP/man-avatar-profile-picture-vector-illustration-268834-538.jpg" alt="" />
                                        }
                                    </div>

                                    <div className="">
                                        {
                                            review?.userName ? <h2 className="text-xl font-medium">{review?.userName}</h2>
                                                :
                                                <h2 className="text-xl font-medium">Anonymous</h2>

                                        }

                                        <p className="text-base text-gray-600 font-normal">{review?.Review}</p>
                                    </div>
                                </div>)
                            )
                                :
                                <div></div>
                        }
                    </div>

                    <div className="">

                        <form onSubmit={handleReviews}>
                            <textarea className="px-1 border border-black" name="ReviewBox" id="" cols="50" rows="10" placeholder="Give Reviews About This Product"></textarea>
                            <br />
                            <button className="btn btn-primary">
                                Submit
                            </button>
                        </form>

                    </div>
                </div>
            }




        </div>
    );
};

export default ProductDetails;