import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import TopBannerCarousel from "../topbannercarousel/TopBannerCarousel";
const Layout = ({children}) => {
    return (
        <div>
            <TopBannerCarousel/>
            <Navbar/>
            <div className="main-content min-h-screen">
                {children}
            </div>
            <Footer/>
        </div>
    );
}

export default Layout;