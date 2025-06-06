import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-neutral-700 text-neutral-300 py-15">
      <div className="continer mx-auto px-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8  max-w-6xl">
        
        <div>
          <h3 className="text-neutral-300 font-semibold mb-4">BESTSELLERS</h3>
          <ul className="space-y-2">
            <Link to="/allproduct" className="hover:text-white ursor-pointer after:block after:h-[1px] after:bg-white after:scale-x-0 hover:after:scale-x-30 after:transition-transform after:duration-300 after:origin-left">Shop All</Link>
            <Link to="/BestSellers" className="hover:text-white ursor-pointer after:block after:h-[1px] after:bg-white after:scale-x-0 hover:after:scale-x-40 after:transition-transform after:duration-300 after:origin-left">Best Sellers</Link>
            <Link to="/perfumes" className="hover:text-white ursor-pointer after:block after:h-[1px] after:bg-white after:scale-x-0 hover:after:scale-x-32 after:transition-transform after:duration-300 after:origin-left">Perfumes</Link>
            <Link to="/bathbody" className="hover:text-white ursor-pointer after:block after:h-[1px] after:bg-white after:scale-x-0 hover:after:scale-x-32 after:transition-transform after:duration-300 after:origin-left">Bath & Body</Link>
            <Link to="/newarrivals" className="hover:text-white ursor-pointer after:block after:h-[1px] after:bg-white after:scale-x-0 hover:after:scale-x-45 after:transition-transform after:duration-300 after:origin-left">New Arrivals</Link>
            <Link to="/gifting" className="hover:text-white ursor-pointer after:block after:h-[1px] after:bg-white after:scale-x-0 hover:after:scale-x-23 after:transition-transform after:duration-300 after:origin-left">Gifting</Link>
          </ul>
        </div>

        <div>
        <h3 className="text-lg font-semibold text-neutral-300 mb-4">INFORMATION</h3>
          <ul className="space-y-2">
            <Link to="/Blogs" className="hover:text-white ursor-pointer after:block after:h-[1px] after:bg-white after:scale-x-0 hover:after:scale-x-19 after:transition-transform after:duration-300 after:origin-left">Blogs</Link>
            <Link to="/AboutUs" className="hover:text-white ursor-pointer after:block after:h-[1px] after:bg-white after:scale-x-0 hover:after:scale-x-33 after:transition-transform after:duration-300 after:origin-left">About Us</Link>
            <Link to="/contactus" className="hover:text-white ursor-pointer after:block after:h-[1px] after:bg-white after:scale-x-0 hover:after:scale-x-39 after:transition-transform after:duration-300 after:origin-left">Contact Us</Link>
          </ul>
        </div>

        <div>
        <h3 className="text-lg font-semibold text-neutral-300 mb-4">SUPPORT</h3>
          <ul className="space-y-2">
            <Link to="/PrivacyPolicy" className="hover:text-white ursor-pointer after:block after:h-[1px] after:bg-white after:scale-x-0 hover:after:scale-x-47 after:transition-transform after:duration-300 after:origin-left">Privacy Policy</Link>
            <Link to="/ShippingPolicy" className="hover:text-white ursor-pointer after:block after:h-[1px] after:bg-white after:scale-x-0 hover:after:scale-x-55 after:transition-transform after:duration-300 after:origin-left">Shipping Policy</Link>
            <Link to="/RefundReturn" className="hover:text-white ursor-pointer after:block after:h-[1px] after:bg-white after:scale-x-0 hover:after:scale-x-82   after:transition-transform after:duration-300 after:origin-left">Refund & Return Policy</Link>
            <Link to="/TermsConditions" className="hover:text-white ursor-pointer after:block after:h-[1px] after:bg-white after:scale-x-0 hover:after:scale-x-70 after:transition-transform after:duration-300 after:origin-left">Terms & Conditions</Link>
          </ul>
        </div>

        <div>
        <h3 className="text-lg font-semibold text-neutral-300 mb-4">CONTACT US</h3>
          <p className="text-sm">Office Location: Plot no. 417, Udyog Vihar Phase III, Gurgaon, Haryana, India</p>
          <Link to='' className="mt-2 text-sm hover:text-white cursor-pointer">Contact Us on WhatsApp</Link>
          <p className="mt-2 text-sm">+91-9311732440</p>
          <p className="mt-2 text-sm">Timing: 10:00 AM to 7:00 PM, Monday to Sunday</p>
        </div>

        <div>
          <h3 className="text-neutral-300 font-semibold mb-4">EXCLUSIVE</h3>
          <div className="relative">
            <input type="email" placeholder="Enter email here" className="w-full p-2  text-neutral-300 border-b  border-neutral-300 bofocus:outline-none"
            />
            <button className="absolute right-3 top-2 text-neutral-300 hover:text-white transition">
              →
            </button>
          </div>
          <p className="mt-2 text-sm">Sign up here to get the latest news, updates and special offers delivered to your inbox.</p>
          <div className="flex space-x-4 mt-4">
            <Link to="#" className="text-neutral-300 hover:text-white"><i className="fab fa-facebook"></i></Link>
            <Link to="#" className="text-neutral-300 hover:text-white"><i className="fab fa-twitter"></i></Link>
            <Link to="#" className="text-neutral-300 hover:text-white"><i className="fab fa-pinterest"></i></Link>
            <Link to="#" className="text-neutral-300 hover:text-white"><i className="fab fa-instagram"></i></Link>
            <Link to="#" className="text-neutral-300 hover:text-white"><i className="fab fa-youtube"></i></Link>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center text-sm mx-auto text-neutral-300">
        © 2025, Bella Vita Luxury.
      </div>
    </footer>
  );
}

export default Footer
