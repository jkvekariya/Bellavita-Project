import Layout from "../layout/layout";

function ShippingPolicy() {
    return (
        <Layout>
            <div className="max-w-5xl mx-auto px-6 md:px-12 py-16 font-['Lato'] bg-white">

                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 font-['Jost'] tracking-wide">Shipping Policy</h1>
                    <div className="w-24 h-1 bg-gray-800 mx-auto"></div>
                </div>

                <div className="prose prose-sm md:prose-base max-w-none">
                    {/* Main Content */}
                    <div className="mb-10 bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-lg shadow-md border border-blue-100">
                        <p className="text-base text-gray-800 leading-7 mb-4">
                            <i className="fa-solid fa-truck-fast text-blue-600 mr-3 text-xl"></i>
                            Purchases are shipped from our warehouse in <strong>Surat, Gujarat – India</strong>, by courier. Please allow the following number of days from receipt of your order:
                        </p>
                        <div className="bg-white p-6 rounded-md mt-4 shadow-sm">
                            <p className="text-lg font-bold text-gray-900 flex items-center">
                                <i className="fa-solid fa-clock text-green-600 mr-3"></i>
                                India Wide – 3 to 7 business days
                            </p>
                        </div>
                    </div>

                    {/* Delivery Information */}
                    <div className="mb-10 bg-gray-50 p-8 rounded-lg shadow-sm border border-gray-100">
                        <h2 className="text-2xl font-bold mb-6 text-gray-900 font-['Jost'] flex items-center">
                            <i className="fa-solid fa-calendar-days text-gray-700 mr-3"></i>
                            Delivery Schedule
                        </h2>
                        <p className="mb-6 text-base text-gray-700 leading-7">
                            Order deliveries will be made between <strong>9:00 AM – 8:00 PM, Monday – Saturday</strong>. Goods will need to be signed for upon delivery. If you cannot be there to sign for your delivery, please suggest an alternative i.e., a family member, colleague, neighbor, etc.
                        </p>
                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-5 rounded-r-md">
                            <p className="text-sm text-gray-800 font-medium">
                                <i className="fa-solid fa-triangle-exclamation text-yellow-500 mr-2"></i>
                                Bella Vita Luxury takes no responsibility for goods signed by an alternative person.
                            </p>
                        </div>
                    </div>

                    {/* Important Notes */}
                    <div className="mb-10 bg-red-50 p-8 rounded-lg shadow-sm border border-red-100">
                        <h2 className="text-2xl font-bold mb-6 text-gray-900 font-['Jost'] flex items-center">
                            <i className="fa-solid fa-circle-exclamation text-red-600 mr-3"></i>
                            Important Notes
                        </h2>
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <i className="fa-solid fa-chevron-right text-red-500 mr-3 mt-1"></i>
                                <span className="text-base text-gray-700 leading-7">
                                    Bella Vita Luxury is <strong>not responsible for damage after delivery</strong>.
                                </span>
                            </li>
                            <li className="flex items-start">
                                <i className="fa-solid fa-chevron-right text-red-500 mr-3 mt-1"></i>
                                <span className="text-base text-gray-700 leading-7">
                                    All claims for <strong>shortages or damages must be reported to customer service on the day of delivery</strong>.
                                </span>
                            </li>
                            <li className="flex items-start">
                                <i className="fa-solid fa-chevron-right text-red-500 mr-3 mt-1"></i>
                                <span className="text-base text-gray-700 leading-7">
                                    Shipping and handling rates may vary based on product, packaging, size, volume, type and other considerations. The shipping and handling charges are given at the time of check out and consumers will know about this before making payments.
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* Support Section */}
                    <div className="grid md:grid-cols-2 gap-8 mb-10">
                        <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-lg shadow-md border border-gray-100">
                            <h3 className="text-xl font-bold mb-4 text-gray-900 font-['Jost'] flex items-center">
                                <i className="fa-solid fa-headset text-gray-700 mr-3"></i>
                                Support
                            </h3>
                            <ul className="space-y-2 text-sm text-gray-700">
                                <li className="flex items-center">
                                    <i className="fa-solid fa-angle-right text-gray-500 mr-2"></i>
                                    About Us
                                </li>
                                <li className="flex items-center">
                                    <i className="fa-solid fa-angle-right text-gray-500 mr-2"></i>
                                    Contact Us
                                </li>
                            </ul>
                        </div>

                        <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-lg shadow-md border border-gray-100">
                            <h3 className="text-xl font-bold mb-4 text-gray-900 font-['Jost'] flex items-center">
                                <i className="fa-solid fa-building text-gray-700 mr-3"></i>
                                Marketed By
                            </h3>
                            <p className="text-sm text-gray-700 leading-relaxed">
                                Bella Vita Luxury<br />
                                B-45, Capital Square<br />
                                Near Yogi Chowk, Varachha<br />
                                Surat, Gujarat - 395006<br />
                                India
                            </p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 mb-10">
                        <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-lg shadow-md border border-gray-100">
                            <h3 className="text-xl font-bold mb-4 text-gray-900 font-['Jost'] flex items-center">
                                <i className="fa-solid fa-industry text-gray-700 mr-3"></i>
                                Manufactured By
                            </h3>
                            <p className="text-sm text-gray-700 leading-relaxed">
                                CodiqSolutions Pvt. Ltd<br />
                                First Floor, Plot No. 12<br />
                                VIP Circle,
                                Mota Varachha Surat<br />
                                Gujarat - 395006<br />
                                India
                            </p>
                        </div>

                        <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-lg shadow-md border border-gray-100">
                            <h3 className="text-xl font-bold mb-4 text-gray-900 font-['Jost'] flex items-center">
                                <i className="fa-solid fa-address-book text-gray-700 mr-3"></i>
                                Contact Information
                            </h3>
                            <div className="space-y-3 text-sm text-gray-700">
                                <p className="flex items-center">
                                    <i className="fa-solid fa-envelope text-gray-600 mr-2 w-5"></i>
                                    <a href="mailto:shop@bellavitaluxury.co.in" className="hover:text-black transition-colors font-medium">
                                        shop@bellavitaluxury.co.in
                                    </a>
                                </p>
                                <p className="flex items-center">
                                    <i className="fa-solid fa-phone text-gray-600 mr-2 w-5"></i>
                                    <a href="tel:+919945678720" className="hover:text-black transition-colors font-medium">
                                        +91-9945678720
                                    </a>
                                </p>
                                <p className="text-xs text-gray-500 ml-7">
                                    Monday-Sunday: 10:30 AM - 7:00 PM
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="mt-16 bg-gradient-to-r from-gray-900 to-gray-800 p-10 rounded-lg text-white text-center shadow-xl">
                        <h3 className="text-2xl font-bold mb-4 font-['Jost']">Need Help With Your Order?</h3>
                        <p className="mb-6 text-gray-200">
                            Our customer support team is here to assist you with any shipping-related queries.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="mailto:shop@bellavitaluxury.co.in"
                                className="inline-block bg-white text-gray-900 px-8 py-3 rounded-md font-bold hover:bg-gray-100 transition-all duration-300 shadow-md"
                            >
                                <i className="fa-solid fa-envelope mr-2"></i>
                                Email Us
                            </a>
                            <a
                                href="tel:+919945678720"
                                className="inline-block bg-green-600 text-white px-8 py-3 rounded-md font-bold hover:bg-green-700 transition-all duration-300 shadow-md"
                            >
                                <i className="fa-solid fa-phone mr-2"></i>
                                Call Us
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default ShippingPolicy;