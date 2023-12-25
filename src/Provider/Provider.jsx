import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import app from "../Firebase/firebase.config";


export const AuthContext= createContext(null);

const Provider = ({children}) => {

    const [allProducts, setAllproducts] = useState([]);
    const [filteredProducts, setFilteredProducts]=useState([]);
    const [user, setUser]= useState(null);
    const [loading,setLoading]= useState(true);
    const auth = getAuth(app);
    // const [userName, setUserName]=useState(null);
    // const [userImg, setUserImg]= useState(null);
   

    const createUser=(email,password)=>{
        setLoading(true)
       return createUserWithEmailAndPassword(auth, email, password);

    }

    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);

    }

    const profileUpdate=(userName, userPhoto)=>{
       
       return updateProfile(auth.currentUser, {
            displayName: userName, photoURL: userPhoto
            
          })
    }

    const logOut= ()=>{
        setLoading(true)
       return signOut(auth);
          
    }

    useEffect(()=>{
       const unsubscribe= onAuthStateChanged(auth, (currentUser) => {
            console.log(currentUser)
            setUser(currentUser);
            setLoading(false)
          });

          return ()=>{
            unsubscribe();
          }
    },[])


    const handleCategoryFilter=(categoryName)=>{
        // setActiveRoute(categoryName);

        if(categoryName!=="All"){
            const filteredData= allProducts.filter(product=> product.productCategory==categoryName);
        console.log(filteredData)

        setFilteredProducts(filteredData);
        }
        else if(categoryName=="All"){
            setFilteredProducts(allProducts);
        }
        else{
            setFilteredProducts(allProducts);
        }
        

    }

    const authInfo={

        handleCategoryFilter,
        allProducts,
        filteredProducts,
        setAllproducts,
        setFilteredProducts,
        createUser,
        profileUpdate,
        loading,
        user,
        logOut,
        signInUser
        // userName,
        // userImg,
        // setUserName,
        // setUserImg
    }
    console.log(user)
    return (
      <AuthContext.Provider value={authInfo}>
{children}
      </AuthContext.Provider>
    );
};

export default Provider;