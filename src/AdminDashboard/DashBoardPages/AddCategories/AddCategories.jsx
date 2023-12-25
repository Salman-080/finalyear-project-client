import Swal from "sweetalert2";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const image_hosting_key = import.meta.env.VITE_IMAGE_API;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`
const AddCategories = () => {

    const axiosPublic = useAxiosPublic();
    const axiosPrivate= useAxiosPrivate()

    const handleCategories = async (e) => {
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

        if(res?.data?.success){

            const categoryData={
                categoryName: e.target.categoryName.value,
                categoryImage: res.data.data.display_url
            }

         
            const result =await axiosPublic.post("/addCategories", categoryData);

            if(result?.data?.insertedId){
                Swal.fire({
                    title: "Uploaded!",
                    text: "Data uploaded successfully",
                    icon: "success"
                });
            }
        }



    }
    return (
        <div className="bg-gray-100 h-full py-3 ">
            <h2 className="text-center text-3xl font-bold mt-7 mb-4">Add Categories</h2>
            <form onSubmit={handleCategories} className="w-[200px] md:w-[400px] lg:w-[600px] bg-white mx-auto p-12">
                <h2>Category Name</h2>
                <input name="categoryName" type="text" placeholder="Category Name" className="input input-bordered w-full mt-1" />
                <br /> <br />

                <h2>Image</h2>
                <input name="image" type="file" className="file-input file-input-bordered w-full mt-1" placeholder="image" />

                <div className="flex justify-center mt-7">
                    <button className="btn btn-ghost text-center">Submit</button>
                </div>

            </form>
        </div>
    );
};

export default AddCategories;