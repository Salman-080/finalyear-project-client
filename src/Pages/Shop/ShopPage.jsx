import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Link, NavLink, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const ShopPage = () => {
    const axiosPublic = useAxiosPublic();
    // const [categoryNameParam, setCategoryNameParam] = useState("All");
    const [allProducts, setAllproducts] = useState([]);
    const [productsData, setProducts] = useState([]);
    // const [render,setRender]=useState(true);
    const [selectTargeter, setSelectTargeter] = useState("For Men & Women");

    const {categoryName}= useParams();
    console.log(categoryName);


    const inActive = {
        color: 'black',

        padding: 0,
        backgroundColor: 'white',


    };

    const Active = {
        color: 'red',
        backgroundColor: 'white',

        textDecoration: 'none',

    };


    const { data: categories } = useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            const res = await axiosPublic("/categoriesData");
            return res.data;
        }
    })


    useEffect(() => {

        axiosPublic.get(`/allProducts?categoryName=${categoryName}`)
            .then(res => {
                setAllproducts(res.data)
                setProducts(res.data)
            })

    }, [])

    console.log(productsData)

    const handleCategoryFilter = async (categoryName) => {
        console.log(categoryName)

        const res = await axiosPublic.get(`/filterByCategory/${categoryName}`)
        setAllproducts(res.data);
        setProducts(res.data);
        setSelectTargeter("For Men & Women");
        // setRender(!render);
        // setCategoryNameParam(categoryName);



    }

    const handleSearchProduct = async (e) => {
        e.preventDefault();
        const searchValue = e.target.searchValue.value;
        console.log(searchValue)
        const res = await axiosPublic.get(`/searchProducts?searching=${searchValue}`);
        setProducts(res.data);
        setAllproducts(res.data);
        setSelectTargeter("For Men & Women");
        console.log(res.data)
    }

    const handleTargeter = async (e) => {
        const targeter = e.target.value;
        console.log(targeter);

        // const res= await axiosPublic.get(`/targeterFilter/${targeter}`);
        // setProducts(res.data);
        // console.log(res.data)
        if (targeter == "Men" || targeter == "Women") {
            const targeterProducts = allProducts.filter(product => product.productTargeter == targeter);
            setProducts(targeterProducts);
            setSelectTargeter(targeter);
        }
        else {
            setProducts(allProducts);
            setSelectTargeter(targeter);
        }



    }

    return (
        <div className="max-w-screen-xl mx-auto">

            <div>
                <div className="flex justify-center gap-7">


                    <ul className="flex flex-wrap gap-4  ">
                        <li className="border-r-2 border-b-2 px-2" ><NavLink onClick={() => handleCategoryFilter("All")} style={({ isActive }) => (isActive ? Active : inActive)} to={"/shop/All"}>All</NavLink></li>
                        {
                            categories?.map(category => (
                                <li className="border-r-2 border-b-2 px-2" key={category._id}><NavLink onClick={() => handleCategoryFilter(category.categoryName)} style={({ isActive }) => (isActive ? Active : inActive)} to={`/shop/${category.categoryName}`}>{category.categoryName}</NavLink></li>
                            ))
                        }
                    </ul>

                </div>
            </div>

            <div className="flex justify-center relative mt-4">
                <form onSubmit={handleSearchProduct} className="flex">
                    <input name="searchValue" type="text" placeholder="Type here" className="px-2 py-2 border border-black w-full max-w-xs rounded-l-xl" />
                    <button className="py-2 rounded-r-xl bg-black px-2 text-white">Search</button>
                </form>
                <div className="absolute right-0">
                    <select value={selectTargeter} onChange={handleTargeter} name="targeter" className="select select-bordered w-full">
                        <option disabled>For Men & Women</option>
                        <option>For Men & Women</option>
                        <option>Men</option>
                        <option>Women</option>

                    </select>
                </div>
            </div>

            <div className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {
                        productsData && productsData?.map(product => (
                            <div key={product._id} className="card card-compact bg-base-100 shadow-xl w-[350px]">
                                <figure className="w-full h-[300px]"><img className="w-full h-full" src={product.productImg} alt="Shoes" /></figure>
                                <div className="card-body">
                                    <h2 className="card-title">{product.productName}</h2>
                                    <p>{product.productShortDescription}</p>
                                    <div className="card-actions justify-end">
                                        <Link to={`/product/${product._id}`}><button className="btn btn-primary">Details</button></Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>

            </div>

        </div>
    );
};

export default ShopPage;