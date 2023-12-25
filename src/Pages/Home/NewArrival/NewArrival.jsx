import axios from "axios";
import { useEffect, useState } from "react";
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { FreeMode, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from 'swiper/react';



const NewArrival = () => {
    const [newArrivals, setNewArrivals] = useState([])

    useEffect(() => {
        axios.get("http://localhost:5000/newArrivalProducts")
            .then(res => {
                console.log(res.data);
                setNewArrivals(res.data);
            })
    }, [])



    return (
        <div className="max-w-screen-xl mx-auto mt-12">
            <h2 className="text-center text-4xl font-bold">New Arrivals</h2>

            <div className="px-6">
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
                        newArrivals.length !== 0 ?
                            (
                                newArrivals.map(newArrival => (

                                    <SwiperSlide key={newArrival._id}>
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

export default NewArrival;