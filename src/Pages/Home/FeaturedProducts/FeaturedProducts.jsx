import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './Featured.css';

import { FreeMode, Pagination, Navigation  } from 'swiper/modules';
import { useEffect, useState } from 'react';
import axios from 'axios';

const FeaturedProducts = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:5000/featuredProducts")
            .then(res => {
                console.log(res.data);
                setFeaturedProducts(res.data)
            })
    }, [])
    // console.log(featuredProducts)
    return (
        <div className="mt-9 max-w-screen-xl mx-auto ">
            <h2 className="text-center text-4xl font-bold">Featured Products</h2>

            <div>
                <Swiper
                    slidesPerView={3}
                    spaceBetween={30}
                    freeMode={true}
                    navigation={{
                        clickable: true,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[FreeMode, Pagination, Navigation]}
                    className=""
                >

                    {
                        featuredProducts.length !== 0 ?
                            (
                                featuredProducts.map(featuredProduct => (

                                    <SwiperSlide key={featuredProduct._id}>
                                        <div className="card bg-base-100 shadow-xl">
                                            <figure><img src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
                                            <div className="card-body">
                                                <h2 className="card-title">Shoes!</h2>
                                                <p>If a dog chews shoes whose shoes does he choose?</p>
                                                <div className="card-actions justify-end">
                                                    <button className="btn btn-primary">Buy Now</button>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))
                            )


                            :
                            (<h2 className='text-center'>Currently No featured Products Available</h2>)
                    }
                     


                </Swiper>
            </div>
        </div>
    );
};

export default FeaturedProducts;