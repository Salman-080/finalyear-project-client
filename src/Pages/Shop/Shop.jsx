import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link, NavLink, Navigate, useNavigate, useParams } from "react-router-dom";
import "./Shop.css";
import { AuthContext } from "../../Provider/Provider";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const Shop = () => {
    const axiosPublic= useAxiosPublic();
    // const [allProducts, setAllproducts] = useState([]);
    // const [filteredProducts, setFilteredProducts]=useState([]);
    const { filteredProducts, allProducts, handleCategoryFilter, setAllproducts, setFilteredProducts } = useContext(AuthContext);
    // const [categories, setCategories] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();


    // const [activeRoute,setActiveRoute]= useState("All");

    const { categoryName } = useParams();

    console.log(categoryName)

    // const handleCategoryFilter=(categoryName)=>{
    //     // setActiveRoute(categoryName);

    //     if(categoryName!=="All"){
    //         const filteredData= allProducts.filter(product=> product.productCategory==categoryName);
    //     console.log(filteredData)

    //     setFilteredProducts(filteredData);
    //     }
    //     else if(categoryName=="All"){
    //         setFilteredProducts(allProducts);
    //     }


    // }

    const inActive = {
        color: 'black',

        padding: 0,
        backgroundColor: 'white',
        

    };

    const Active = {
        color: 'white',
        backgroundColor: 'black',
        padding: 0,
        textDecoration: 'none',
      
    };

    useEffect(() => {
        axios.get("http://localhost:5000/allProducts")
            .then(res => {
                console.log(res.data);
                setAllproducts(res.data);




            })
    }, [])

    useEffect(() => {

        if (categoryName == "All") {
            setFilteredProducts(allProducts);
        }
        else if (categoryName && categoryName !== "All") {
            const filteredData = allProducts.filter(product => product.productCategory == categoryName);
            console.log(filteredData)

            setFilteredProducts(filteredData);
        }
        else {
            setFilteredProducts(allProducts);
        }
    }, [allProducts])



    const {data: categories}= useQuery({
        queryKey: ["categories"],
        queryFn: async ()=>{
            const res= await axiosPublic.get("/categoriesData");
            return res.data;
        }
    })

    console.log(allProducts)


    const handleSearchProduct = e => {
        e.preventDefault();

        const productSearched = e.target.productSearch.value;
        console.log(productSearched);



        if (productSearched.length !== 0) {
            const filteredSearchProduct = allProducts.filter(product => product.productCategory.toLowerCase().includes(productSearched.toLowerCase()));
            console.log(filteredSearchProduct)

            setFilteredProducts(filteredSearchProduct);
            // if(productSearched.toL){
            //     navigate(`/shop/${productSearched}`)
            // }

            categories.find(category => productSearched.toLowerCase() == category.category_name.toLowerCase() && navigate(`/shop/${productSearched}`))
        }
        else {
            setFilteredProducts(allProducts)
            //empty search er jonno
        }


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

                    const filterFromAllProd = filteredProducts.filter(filterProd => filterProd._id !== deletingProductId);
                    const filterFromFilterProd = allProducts.filter(filterProd => filterProd._id !== deletingProductId);
                    console.log(filterFromFilterProd);
                    console.log(filterFromAllProd);

                }

            })
    }
    // activestyle={{ color: "red", backgroundColor: "white" }}
    return (
        <div className="max-w-screen-xl mx-auto">

            <div>
                <form onSubmit={handleSearchProduct}>
                    <input type="text" name="productSearch" id="" />
                    <button>Search</button>
                </form>

            </div>


            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

                <div className="flex md:flex-col shadow-xl w-[200px] h-fit py-4 gap-6">
                    <ul>
                        <li onClick={() => handleCategoryFilter("All")} ><NavLink to={`/shop/${"All"}`}>All</NavLink></li>
                        {
                        categories?.map(category => (
                            <li className="w-full" onClick={() => handleCategoryFilter(category.categoryName)} key={category.category_id}><NavLink to={`/shop/${category.categoryName}`} >{category.categoryName}</NavLink></li>
                        ))
                    }
                    </ul>
                </div>

                {/* <div className="flex md:flex-col shadow-xl w-[200px] h-fit py-4 gap-6">
                    <button onClick={() => handleCategoryFilter("All")}><NavLink to={`/shop/${"All"}`} style={({ isActive }) => (isActive ? Active : inActive)} activestyle={{ color: "red", backgroundColor: "white" }}>All</NavLink></button>
                    {
                        categories?.map(category => (
                            <button onClick={() => handleCategoryFilter(category.categoryName)} key={category.category_id}><NavLink to={`/shop/${category.categoryName}`} style={({ isActive }) => (isActive ? Active : inActive)}  >{category.categoryName}</NavLink></button>
                        ))
                    }
                </div> */}

                <div className="col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {
                        filteredProducts.length !== 0 ? (
                            filteredProducts?.map(product => (

                                <div key={product._id} className="card card-compact bg-base-100 shadow-xl">
                                    <figure><img src={product.productImg} alt="Shoes" /></figure>
                                    <div className="card-body">
                                        <h2 className="card-title">{product.productName}</h2>
                                        <p>{product.productShortDescription}</p>
                                        <div className="card-actions justify-end">
                                            <button className="btn btn-primary">Buy Now</button>
                                        </div>
                                    </div>
                                </div>
                                // <div key={product._id}>

                                //     <figure className="w-[300px]">
                                //         <img className="w-full h-full" src={product.productImg} alt="" />
                                //     </figure>

                                //     <div>
                                //         <h2>{product.productName}</h2>
                                //         <p>{product.productCategory}</p>
                                //         <p>{product.productType}</p>
                                //         <p>{product.productShortDescription}</p>

                                //     </div>
                                //     <div>
                                //     <Link to={`/product/${product._id}`}><button className="btn btn-primary">Details</button></Link>    


                                //     </div>
                                // </div>
                            ))
                        )
                            :
                            <div><h2>No products found</h2></div>
                    }
                </div>
            </div>

        </div>
    );
};

export default Shop;