
const Banner = () => {
    return (
        <div>
            <div className="relative">
                <img className="w-full" src="/banner.png" alt="" />
                <div className="absolute top-[50%] left-[50%]">
                    <h2>Hello</h2>
                </div>
            </div>

            <div className="max-w-screen-xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-3 mt-8">
                <div className="flex justify-start items-center gap-3">
                    <img className="h-14 w-14" src="/icon1.png" alt="" />
                    <div>
                        <h2>Fast & Secure Delivery</h2>
                        <p>Tell about your service.</p>
                    </div>
                </div>
                <div className="flex justify-start items-center gap-3">
                    <img className="h-14 w-14" src="/icon2.png" alt="" />
                    <div>
                        <h2>2 Days Return Policy</h2>
                        <p>No question ask.</p>
                    </div>
                </div>
                <div className="flex justify-start items-center gap-3">
                    <img className="h-14 w-14" src="/icon3.png" alt="" />
                    <div>
                        <h2>Money Back Guarantee</h2>
                        <p>Within 5 business days</p>
                    </div>
                </div>
                <div className="flex justify-start items-center gap-3">
                    <img className="h-14 w-14" src="/icon4.png" alt="" />
                    <div>
                        <h2>24 X 7 Service</h2>
                        <p>Online service for customer</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Banner;