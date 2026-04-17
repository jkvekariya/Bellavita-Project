import Navbar from '../../navbar/Navbar'
import Footer from '../../footer/Footer'
import BrandLogoCarousel from "../../brandlogocarousel/BrandLogoCarousel"
import Carousel from "../../carousel/Carousel";
import Category from "../../category/Category";
import HeroSection from "../../heroSection/HeroSection";
import HomePageProductCard from "../../homePageProductCard/HomePageProductCard";
import Offerbanner from "../../offerbanner/Offerbanner";
import ProductGallery from "../../productgallery/ProductGallery";
import Video from '../../video/Video'
import WhyBellavita from "../../waybellavita/WhyBellavita";
import TopBannerCarousel from '../../topbannercarousel/TopBannerCarousel';
import ImageCarousel from "../../imagecarousel/ImageCarousel";


const Home = () => {
    return (
        <div>
            <TopBannerCarousel />
            <Navbar />
            <Carousel />
            <HomePageProductCard />
            <Category />
            <Video />
            <WhyBellavita />
            <Offerbanner />
            <ProductGallery />
            <BrandLogoCarousel />
            <Footer />
        </div>
    );
}

export default Home;