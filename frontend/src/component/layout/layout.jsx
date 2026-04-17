import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import TopBannerCarousel from "../topbannercarousel/TopBannerCarousel";
import { useLocation } from "react-router-dom";

const Layout = ({ children }) => {
    const location = useLocation();
    const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";
    const isAdminPage = location.pathname.toLowerCase().startsWith("/admin");

    return (
        <div>
            {!isAuthPage && !isAdminPage && <TopBannerCarousel />}
            {!isAuthPage && !isAdminPage && <Navbar />}
            <div className={`main-content ${!isAuthPage && !isAdminPage ? 'min-h-screen' : ''}`}>
                {children}
            </div>
            {!isAuthPage && !isAdminPage && <Footer />}
        </div>
    );
}

export default Layout;
