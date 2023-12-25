
const AddExtraInfo = () => {
    return (
        <div className="bg-[#fff6ea] py-14 md:py-36">

            <form className=" max-w-screen-xl mx-auto lg:w-[900px] p-6 bg-white">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                  
            
                    <div>
                        <h2>Type Category</h2>
                        <input className="w-full border border-gray-400 rounded p-1" type="text" name="categoryName" id="" placeholder="Type" />
                    </div>
                    <div>
                        <h2>Type Targeters</h2>
                        <input className="w-full border border-gray-400 rounded p-1" type="text" name="targeters" id="" placeholder="Type" />
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

export default AddExtraInfo;