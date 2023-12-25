import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const Update = () => {

    const [categories, setCategories] = useState([]);
    const [productData, setProductData]= useState({});

    const {id}=useParams();
    console.log(id)

    useEffect(() => {
        fetch('/categories.json')
            .then(res => res.json())
            .then(data => setCategories(data))
    }, [])

    useEffect(()=>{
        axios.get(`http://localhost:5000/update/${id}`)
        .then(res=>{
            console.log(res.data);
            setProductData(res.data);
        })
    },[])

    const handleUpdateProducts=e=>{
        e.preventDefault();

        
          const  productName= e.target.name.value;
          const  productCategory= e.target.category.value;
          const  productImg= e.target.image.value;
          const  productShortDescription= e.target.shortDescription.value;
          const  productLongDescription= e.target.longDescription.value;
          const productType= e.target.productType.value;
          const productFeatured= e.target.featured.value;
          const productBestSelling= e.target.bestSelling.value;
          const productNewArrival= e.target.newArrival.value;

          const updatingProductInfo={
            productName,productCategory, productImg, productShortDescription, productLongDescription, productType, productFeatured, productBestSelling, productNewArrival
        }

        axios.put(`http://localhost:5000/updateProduct/${productData._id}`, updatingProductInfo)
        .then(res=>{
            console.log(res.data);
            if(res?.data?.modifiedCount>0){
                Swal.fire({
                    icon: "success",
                    title: "Successful",
                    text: "Successfully Updated",
                   
                  });
            }
        })
    }
    return (
        <div className="bg-[#fff6ea] py-14 md:py-36">

            <form onSubmit={handleUpdateProducts} className=" max-w-screen-xl mx-auto lg:w-[900px] p-6 bg-white">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    <div>
                        <h2>Product Name</h2>
                        <input className="w-full border border-gray-400 rounded p-1" type="text" name="name" id="" defaultValue={productData.productName} />
                    </div>
                    <div>
                        <h2>Product Category</h2>
                        <select name="category" className="w-full border border-gray-400 rounded p-1">
                            <option disabled selected>{productData.productCategory}</option>

                            {/* <option value="Recipes">Recipes</option>
                    <option value="Cooking Tips and Techniques">Cooking Tips and Techniques</option>
                    <option value="Dessert Creations">Dessert Creations</option>
                    <option value="Quick and Easy Meals">Quick and Easy Meals</option> */}

                            {
                                categories?.map(category => <option key={category.category_id} value={`${category.category_name}`}>{category.category_name}</option>

                                )
                            }

                        </select>
                    </div>
                    <div>
                        <h2>Product Image</h2>
                        <input className="w-full border border-gray-400 rounded p-1" type="text" name="image" id="" defaultValue={productData.productImg} />
                    </div>
                    <div>
                        <h2>Short Description</h2>
                        
                        <input className="w-full border border-gray-400 rounded p-1" type="text" name="shortDescription" id="" defaultValue={productData.productShortDescription}  />
                    </div>
                    <div>
                        <h2>Long Description</h2>
                        <input className="w-full border border-gray-400 rounded p-1" type="text" name="longDescription" id="" defaultValue={productData.productLongDescription} />
                    </div>
                    <div>
                            <h2>Product Type</h2>
                        <input className="w-full border border-gray-400 rounded p-1" type="text" name="productType" id="" defaultValue={productData.productType} />
                    </div>
                    <div>
                        <h2>Featured?</h2>

                        <select name="featured" className="select select-bordered w-full max-w-xs">
                        <option selected>{productData.productFeatured}</option>
                            <option>Yes</option>
                            <option>No</option>

                        </select>
                    </div>
                    <div>
                        <h2>Best Selling</h2>
                        <select name="bestSelling" className="select select-bordered w-full max-w-xs">
                        <option selected>{productData.productBestSelling}</option>
                            <option>Yes</option>
                            <option>No</option>

                        </select>
                    </div>
                    <div>
                        <h2>New Arrival?</h2>
                        <select name="newArrival" className="select select-bordered w-full max-w-xs">
                            <option selected>{productData.productNewArrival}</option>
                            <option>Yes</option>
                            <option>No</option>

                        </select>
                    </div>
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

export default Update;