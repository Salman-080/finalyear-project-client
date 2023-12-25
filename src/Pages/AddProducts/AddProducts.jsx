import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";

const image_hosting_key = import.meta.env.VITE_IMAGE_API;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`
const AddProducts = () => {

    // const [categories, setCategories] = useState([]);
    const axiosPublic = useAxiosPublic();
    const axiosPrivate = useAxiosPrivate();


    const { data: categories } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await axiosPrivate.get("/categoriesData");
            return res.data;
        }
    })

    console.log(categories);

    // useEffect(() => {
    //     fetch('categories.json')
    //         .then(res => res.json())
    //         .then(data => setCategories(data))
    // }, [])

    const handleAddProducts = async (e) => {
        e.preventDefault();


        const imageFile = {
            image: e.target.image.files[0]
        }
        console.log(imageFile)

        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                "content-type": "multipart/form-data"
            }
        });
        console.log(res.data);

        if (res.data.success) {
            const productName = e.target.name.value;
            const productQuantity = parseInt(e.target.quantity.value, 10);
            const productPrice = parseFloat(e.target.price.value);
            const productCategory = e.target.category.value;
            const productImg = res.data.data.display_url;
            const productShortDescription = e.target.shortDescription.value;
            const productLongDescription = e.target.longDescription.value;
            const productType = e.target.productType.value;
            const productFeatured = e.target.featured.value;
            const productBestSelling = e.target.bestSelling.value;
            const productNewArrival = e.target.newArrival.value;
            const productTargeter = e.target.targeter.value;

            console.log(productName, productCategory, productImg, productShortDescription, productLongDescription, productType, productFeatured, productBestSelling, productNewArrival)

            const productsInfo = {
                productName,
                productCategory,
                productImg,
                productPrice,
                productQuantity,
                productShortDescription,
                productLongDescription,
                productType,
                productFeatured,
                productBestSelling,
                productNewArrival,
                productTargeter
            }

            console.log(productsInfo);

            const result = axiosPrivate.post("/products", productsInfo);

            if (result?.data?.insertedId) {
                Swal.fire({
                    icon: "success",
                    title: "Successful",
                    text: "Successfully Product Added",

                });
            }
        }





        // fetch("http://localhost:5000/productss",{
        //     method: "POST",
        //     headers: {
        //         "content-type": "application/json"
        //     },
        //     body: JSON.stringify(productsInfo)
        // })
        // .then(res=>console.log(res))

        // axios.post("http://localhost:5000/products", productsInfo)
        //     .then(res => {
        //         console.log(res.data);

        //         if (res.data.insertedId) {
        //             Swal.fire({
        //                 icon: "success",
        //                 title: "Successful",
        //                 text: "Successfully Product Added",

        //             });
        //         }
        //     })



    }
    return (
        <div className=" bg-gray-100 py-9 h-full">

            <h2 className="text-center text-3xl font-bold">Add New Items</h2>
            <br />
            <br />

            <form onSubmit={handleAddProducts} className=" max-w-screen-xl mx-auto lg:w-[900px] p-6 bg-white">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    <div>

                        <input className="w-full border border-gray-400 rounded p-1" type="text" name="name" id="" placeholder="Name" />
                    </div>
                    <div>

                        <select name="category" className="w-full border border-gray-400 rounded p-1">
                            <option disabled selected>Categories</option>

                            {/* <option value="Recipes">Recipes</option>
                        <option value="Cooking Tips and Techniques">Cooking Tips and Techniques</option>
                        <option value="Dessert Creations">Dessert Creations</option>
                        <option value="Quick and Easy Meals">Quick and Easy Meals</option> */}

                            {
                                categories?.map(category => <option key={category._id} value={`${category.categoryName}`}>{category.categoryName}</option>

                                )
                            }

                        </select>
                    </div>
                    <div>
                        <input name="image" type="file" className="file-input file-input-bordered w-full" placeholder="image" />
                        {/* <input className="w-full border border-gray-400 rounded p-1" type="text" name="image" id="" placeholder="image" /> */}
                    </div>
                    <div>

                        <input className="w-full border border-gray-400 rounded p-1" type="number" name="quantity" id="" placeholder="Quantity" />
                    </div>
                   

                    <div>

                        <input className="w-full border border-gray-400 rounded p-1" type="text" name="price" id="" placeholder="Price" />
                    </div>
                    <div>

                        <input className="w-full border border-gray-400 rounded p-1" type="text" name="shortDescription" id="" placeholder="Short Description" />
                    </div>
                    <div>

                        <input className="w-full border border-gray-400 rounded p-1" type="text" name="longDescription" id="" placeholder="Long Description" />
                    </div>
                    <div>

                        <input className="w-full border border-gray-400 rounded p-1" type="text" name="productType" id="" placeholder="Type" />
                    </div>
                    <div>
                        <h2>Featured?</h2>

                        <select name="featured" className="select select-bordered w-full">

                            <option>Yes</option>
                            <option selected>No</option>

                        </select>
                    </div>
                    <div>
                        <h2>Best Selling</h2>
                        <select name="bestSelling" className="select select-bordered w-full ">

                            <option>Yes</option>
                            <option selected>No</option>

                        </select>
                    </div>
                    <div>
                        <h2>New Arrival?</h2>
                        <select name="newArrival" className="select select-bordered w-full ">

                            <option>Yes</option>
                            <option selected>No</option>

                        </select>
                    </div>

                    <div>
                        <h2>targeter</h2>
                        <select name="targeter" className="select select-bordered w-full">
                            <option disabled selected>For Men & Women</option>
                            <option>For Men & Women</option>
                            <option>Men</option>
                            <option>Women</option>

                        </select>
                    </div>
                    {/* <div>
                        <h2>Targeter</h2>
                        <select name="newArrival" className="select select-bordered w-full ">

                            <option>All</option>
                            <option>Men</option>
                            <option selected>Women</option>
                            <option selected>Women</option>
                            <option selected>Women</option>

                        </select>
                    </div> */}
                </div>

                <br />
                <br />
                <div className="text-center">
                    <button className="btn btn-neutral w-full">Submit</button>
                </div>

            </form>

        </div>
    );
};

export default AddProducts;