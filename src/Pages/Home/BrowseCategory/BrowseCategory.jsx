import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { AuthContext } from "../../../Provider/Provider";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const BrowseCategory = () => {
    const axiosPublic= useAxiosPublic();
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 3
    };

    // const [categories, setCategories] = useState([]);
    const {handleCategoryFilter}=useContext(AuthContext);

    const {data: categories}= useQuery({
        queryKey: ["categories"],
        queryFn: async ()=>{
            const res= await axiosPublic.get("/categoriesData");
            return res.data;
        }
    })

    // useEffect(() => {

    //     fetch("categories.json")
    //         .then(res => res.json())
    //         .then(data => setCategories(data))
    // }, [])

    console.log(categories)
    return (
        <div className="max-w-screen-xl mx-auto mt-8">
            <h2 className="text-center text-4xl font-bold mb-4">Browse By Categories</h2>



           <div>
                <Slider {...settings}>
                    {
                        categories?.map(category => <div className="px-1" key={category.category_id}>

                            <div onClick={() => handleCategoryFilter(category.categoryName)} className="relative hover:opacity-50 rounded-xl ">
                                <NavLink to={`/shop/${category.categoryName}`}>
                                    <div className='h-[180px] bg-black rounded-xl'>
                                        <div className="absolute inset-0 bg-black opacity-40 rounded-xl"></div>
                                        <img className='opacity-100 w-full h-full rounded-xl' src={category.categoryImage} alt="Shoes" />

                                        <div className="absolute top-0 bottom-0 right-0 left-0 flex items-center justify-center ">
                                            <h2 className=" text-white font-extrabold text-xl md:text-3xl lg:text-5xl ">{category.categoryName}</h2>
                                        </div>
                                    </div>


                                </NavLink>
                            </div>

                        </div>)
                    }
                </Slider>
                </div>
         

        </div>
    );
};

export default BrowseCategory;