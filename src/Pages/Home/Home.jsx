import Banner from "./Banner/Banner";
import BestSells from "./BestSells/BestSells";
import BrowseCategory from "./BrowseCategory/BrowseCategory";
import FeaturedProducts from "./FeaturedProducts/FeaturedProducts";
import NewArrival from "./NewArrival/NewArrival";


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <BrowseCategory></BrowseCategory>
            <FeaturedProducts></FeaturedProducts>
            <NewArrival></NewArrival>
            <BestSells></BestSells>
        </div>
    );
};

export default Home;