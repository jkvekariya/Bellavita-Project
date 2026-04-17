import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-[#2a2a2a] text-white py-16 font-['Jost']">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">

          {/* Logo & About */}
          <div className="lg:col-span-1">
            <h2 className="text-xl font-bold tracking-widest mb-6">BELLAVITA<sup>®</sup></h2>
            <p className="text-[#a0a0a0] text-sm leading-relaxed font-['Lato']">
              Experience the world of luxury fragrances. We craft premium scents for those who appreciate the finer things in life.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] mb-6 text-white border-b border-white/10 pb-2">Bestsellers</h3>
            <ul className="flex flex-col space-y-3">
              <li><Link to="/allproduct" className="text-[#a0a0a0] hover:text-white text-sm transition-colors font-['Lato']">Shop All</Link></li>
              <li><Link to="/BestSellers" className="text-[#a0a0a0] hover:text-white text-sm transition-colors font-['Lato']">Best Sellers</Link></li>
              <li><Link to="/perfumes" className="text-[#a0a0a0] hover:text-white text-sm transition-colors font-['Lato']">Perfumes</Link></li>
              <li><Link to="/bathbody" className="text-[#a0a0a0] hover:text-white text-sm transition-colors font-['Lato']">Bath & Body</Link></li>
              <li><Link to="/newarrivals" className="text-[#a0a0a0] hover:text-white text-sm transition-colors font-['Lato']">New Arrivals</Link></li>
              <li><Link to="/gifting" className="text-[#a0a0a0] hover:text-white text-sm transition-colors font-['Lato']">Gifting</Link></li>
            </ul>
          </div>

          {/* Info & Support */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] mb-6 text-white border-b border-white/10 pb-2">Information</h3>
            <ul className="flex flex-col space-y-3">
              <li><Link to="/Blogs" className="text-[#a0a0a0] hover:text-white text-sm transition-colors font-['Lato']">Blogs</Link></li>
              <li><Link to="/AboutUs" className="text-[#a0a0a0] hover:text-white text-sm transition-colors font-['Lato']">About Us</Link></li>
              <li><Link to="/contactus" className="text-[#a0a0a0] hover:text-white text-sm transition-colors font-['Lato']">Contact Us</Link></li>
              <li><Link to="/PrivacyPolicy" className="text-[#a0a0a0] hover:text-white text-sm transition-colors font-['Lato']">Privacy Policy</Link></li>
              <li><Link to="/ShippingPolicy" className="text-[#a0a0a0] hover:text-white text-sm transition-colors font-['Lato']">Shipping Policy</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] mb-6 text-white border-b border-white/10 pb-2">Contact Us</h3>
            <div className="flex flex-col space-y-4 text-[#a0a0a0] text-sm font-['Lato']">
              <p className="leading-relaxed">
                B-45, Capital Square near Yogichowk, Varachha, Surat, Gujarat, India.
              </p>
              <div className="flex flex-col space-y-1">
                <p className="flex items-center gap-2"><i className="fa-brands fa-whatsapp text-green-500"></i> +91-9945678720</p>
                <p className="px-6 text-xs text-[#707070]">Mon-Sun: 10AM - 7PM</p>
              </div>
              <a href="mailto:info@bellavita.com" className="hover:text-white transition-colors">info@bellavita.com</a>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] mb-6 text-white border-b border-white/10 pb-2">Newsletter</h3>
            <p className="text-[#a0a0a0] text-xs mb-4 font-['Lato']">Sign up for exclusive updates and offers.</p>
            <div className="relative group">
              <input
                type="email"
                placeholder="EMAIL ADDRESS"
                className="w-full bg-transparent border-b border-[#404040] py-2 text-sm focus:border-white focus:outline-none transition-colors font-['Lato'] uppercase tracking-widest placeholder:text-[#505050]"
              />
              <button className="absolute right-0 bottom-2 text-white/50 hover:text-white transition-colors">
                <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
            <div className="flex items-center gap-6 mt-8">
              <a href="#" className="text-[#a0a0a0] hover:text-white transition-all transform hover:-translate-y-1"><i className="fa-brands fa-facebook-f"></i></a>
              <a href="#" className="text-[#a0a0a0] hover:text-white transition-all transform hover:-translate-y-1"><i className="fa-brands fa-instagram text-lg"></i></a>
              <a href="#" className="text-[#a0a0a0] hover:text-white transition-all transform hover:-translate-y-1"><i className="fa-brands fa-x-twitter"></i></a>
              <a href="#" className="text-[#a0a0a0] hover:text-white transition-all transform hover:-translate-y-1"><i className="fa-brands fa-youtube"></i></a>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="mt-20 pt-8 border-t border-white/5 text-center">
          <p className="text-[#606060] text-xs font-['Lato'] tracking-widest uppercase">
            © 2025 BELLAVITA LUXURY. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

