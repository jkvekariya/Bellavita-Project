import  { BrowserRouter as Router,Route,Routes,} from "react-router-dom"; 
import Home from './component/pages/home/Home';
import Nopage from './component/pages/noPage/NoPage';
import ProductInfo from './component/pages/productInfo/ProductInfo';
import BestSellers from './component/pages/bestsellers/BestSellers';
import AllProduct from './component/pages/shopall/Shoall';
import Perfumes from './component/pages/perfumes/Perfumes';
import Signup from './component/pages/registration/Signup';
import Login from './component/pages/registration/Login';
import ScrollTop from './component/scrollTop/ScrollTop';
import CartPage from './component/pages/cart/CartPage';
import AboutUs from './component/aboutus/AboutUs';
import PrivacyPolicy from './component/privacypolicy/PrivacyPolicy';
import ShippingPolicy from './component/shippingpolicy/ShippingPolicy';
import RefundReturn from './component/refundreturn/RefundReturn';
import TermsConditions from './component/termsconditions/TermsConditions';
import Blogs from './component/blogspage/blogs/Blogs';
import BlogFragrance from './component/blogspage/blogfragrance/BlogFragrance';
import TaajGold from './component/blogspage/taajgold/TaajGold';
import AttarLifestyle from './component/blogspage/attarlifestyle/AttarLifestyle';
import ValentinesDay from './component/blogspage/valentinesday/ValentinesDay';
import GiftingPerfume from './component/blogspage/giftingperfume/GiftingPerfume';
import WomenPerfume from './component/blogspage/womenperfume/WomenPerfume';
import { Toaster } from "react-hot-toast";
import AdminDashboard from './component/pages/admin/admindashboard';
import AddProduct from './component/pages/admin/addproduct';
import UpdateProduct from "./component/pages/admin/UpdateProductPage";
import Luxuryperfumes from './component/category/Luxuryperfumes';
import Bathbody from './component/pages/bathbody/Bathbody';
import Bathbodyinfo from './component/pages/bathbodyinfo/Bathbodyinfo';
import Newarrivals from './component/pages/newarrivals/Newarrivals';
import Gifting from './component/pages/gifting/Gifting';
import Bodywashes from './component/category/Bodywashes';
import Bodylotions from './component/category/Bodylotions';
import Bodydeos from './component/category/Bodydeos';
import CheckoutPage from './component/pages/cart/CheckoutPage ';
import AddressForm from './component/pages/cart/AddressForm';
import SearchBar from './component/searchbar/SearchBar';
import Wishlist from './component/wishlist/Wishlist';
import ContactUs from './component/pages/contactus/ContactUs';
import BottomNav from './component/bottomnav/BottomNav';
import MyOrdersPage from './component/myorderspage/MyOrdersPage';
import { ContextProvider } from "./component/context/Context";


const App = () => {
  
  return (
    <div>
      <ContextProvider >
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            fontSize: "14px",
            padding: "12px 16px",
            borderRadius: "8px",
          },
          success: {
            style: {
              background: "#d1fae5",
              color: "#065f46",
            },
          },
          error: {
            style: {
              background: "#fee2e2",
              color: "#991b1b",
            },
          },
        }}
      />
      <Router>
        <ScrollTop/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/*" element={<Nopage/>}/>
          <Route path='/productinfo/:id' element={<ProductInfo/>}/>
          <Route path="/allproduct" element={<AllProduct />} />
          <Route path="/bestSellers" element={<BestSellers />}/>
          <Route path="/Perfumes" element={<Perfumes />}/>
          <Route path="/bathbody" element={<Bathbody />}/>
          <Route path="/newarrivals" element={<Newarrivals/>}/>
          <Route path="/gifting" element={<Gifting/>}/>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path='/AdminDashboard' element={<AdminDashboard/>}></Route>
          <Route path="/cart" element={<CartPage />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          <Route path="/shippingpolicy" element={<ShippingPolicy />} />
          <Route path="/refundreturn" element={<RefundReturn />} />
          <Route path="/termsconditions" element={<TermsConditions />} />
          <Route path="/blogfragrance" element={<BlogFragrance />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/TaajGold" element={<TaajGold />} />
          <Route path="/attarlifestyle" element={<AttarLifestyle />} />
          <Route path="/valentinesday" element={<ValentinesDay />} />
          <Route path="/GiftingPerfume" element={<GiftingPerfume />} />
          <Route path="/womenperfume" element={<WomenPerfume />} />
          <Route path="/AddProduct" element={<AddProduct />} />
          <Route path="/updateProduct/:id" element={<UpdateProduct />} />
          <Route path="/luxuryperfumes" element={<Luxuryperfumes />} />
          <Route path="/bodywashes" element={<Bodywashes />} />
          <Route path="/bodylotions" element={<Bodylotions />} />
          <Route path="/bodydeos" element={<Bodydeos />} />
          <Route path="/checkoutpage" element={<CheckoutPage />} />
          <Route path="/addressform" element={<AddressForm />} />
          <Route path="/bathbodyinfo/:id" element={<Bathbodyinfo />} />
          <Route path="/searchbar" element={<SearchBar />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/bottomnav" element={<BottomNav />} />
          <Route path="/myorderspage" element={<MyOrdersPage />} />
        </Routes>
      </Router>
      </ContextProvider>
    </div>
  )
}

export default App