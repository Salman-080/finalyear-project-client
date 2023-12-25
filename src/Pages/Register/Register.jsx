import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Provider/Provider";
import axios from "axios";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const Register = () => {
    const { user, createUser, profileUpdate, logOut } = useContext(AuthContext);
    const axiosPublic=useAxiosPublic();
    const handleRegister = e => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);

        const registerName = form.get('name');
        const registerEmail = form.get('email');
        const registerPassword = form.get('password');
        const registerImage = form.get('image');

        console.log(registerEmail, registerImage, registerName, registerPassword);

        createUser(registerEmail, registerPassword)
            .then(res => {
                console.log(res);
                profileUpdate(registerName, registerImage)
                    .then(async(res) => {
                        // Profile updated!
                        // console.log(res)
                        // ...
                        console.log("okk")
                        const userName = registerName;
                        const userEmail = registerEmail;
                        const userImg = registerImage;

                        const userInfo = {
                            userName, userEmail, userImg
                        }

                        console.log(userInfo)

                        const response= await axiosPublic.post("/users", userInfo);
                        console.log(response.data);
                        // axios.post("/users", userInfo)
                        //     .then(res => {
                        //         console.log(res.data);
                        //     })
                    }).catch((error) => {
                        // An error occurred
                        // ...
                    });


            })
            .catch(err => {
                console.log(err);
            })

    }


    const googleSignIn = () => {

    }
    return (
        <div className="flex flex-col justify-center items-center min-h-screen ">
            <div className=" w-full md:w-[500px] flex flex-col justify-center items-center">
                <div className="text-center lg:text-left">
                    <br />
                </div>
                <div className="card flex-shrink-0 w-full max-w-md shadow-2xl bg-base-100">
                    <h1 className="text-2xl md:text-4xl font-bold text-center mt-2">Register Now</h1>
                    <form onSubmit={handleRegister} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>

                            <input name="name" type="text" placeholder="Your Name" className="input input-bordered" required />
                        </div>
                        <div className="form-control">

                            <label className="label">

                                <span className="label-text">Image</span>
                            </label>

                            <input name="image" type="text" placeholder="Your Photo Url" className="input input-bordered" />
                        </div>
                        <div className="form-control">

                            <label className="label">

                                <span className="label-text">Email</span>
                            </label>

                            <input name="email" type="email" placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input name="password" type="password" placeholder="password" className="input input-bordered" required />

                        </div>
                        <p>Already Have an Account? <Link to="/login"><span className="text-blue-600">Login</span></Link></p>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Register</button>
                        </div>
                    </form>

                    <div className="text-center mb-5 space-y-2">
                        <p className="text-gray-500">Or Sign in using</p>
                        <button onClick={googleSignIn} className="btn ">
                            <img className="w-[20px] h-[20px] rounded-full" src="/google.png" alt="" />
                            <p>Google</p>
                        </button>

                    </div>
                </div>
            </div>
            {/* <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
        /> */}
        </div>
    );
};

export default Register;