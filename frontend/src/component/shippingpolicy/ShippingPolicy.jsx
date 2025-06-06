import Layout from "../layout/layout";

function ShippingPolicy() {
    return (
        <Layout>
          <div className="max-w-4xl mx-auto px-6 py-12 ">
                <h1 className="text-3xl font-medium mb-4">Shipping Policy</h1>
                <p className="mb-6 text-sm text-zinc-600 leading-6">
                Purchases are shipped from our warehouse in Gurgaon, Haryana – India, by courier. Please allow following number of days from receipt of your order.
                </p>
        
                <p className="mb-6 text-sm text-zinc-600 leading-6">India Wide – 3 to 7 business days</p>

                <p className="mb-6 text-sm text-zinc-600 leading-6">Order deliveries will be made between 9am – 8pm Monday – Saturday. Goods will need to be signed for upon delivery. If you cannot be there to sign for your delivery, please suggest an alternative i.e., a family member, colleague, neighbor, etc.</p> 

                <p className="mb-6 text-sm text-zinc-600 leading-6">Bella Vita Luxury takes no responsibility for goods signed by an alternative person.</p> 

                <p className="mb-6 text-sm text-zinc-600 leading-6">Bella Vita Luxury is not responsible for damage after delivery.</p> 

                <p className="mb-6 text-sm text-zinc-600 leading-6">All claims for shortages or damages must be reported to customer service on the day of delivery. Shipping and handling rates may vary based on product, packaging, size, volume, type and other considerations. The shipping and handling charges are given at the time of check out and consumers will know about this before making payments.</p> 
                
                <div>
                    <div className="mt-6">
                        <h2 className="font-medium mb-2">Support</h2>
                        <ol className="list-disc pl-5 text-sm text-zinc-600">
                        <p>1. About Us</p>
                        <p>2. Contact Us</p>
                        </ol>
                    </div>

                    <div className="mt-6">
                        <h2 className="font-medium mb-2">Marketed By:</h2>
                        <p className="text-sm text-zinc-600">
                        Bella Vita Luxury <br />
                        First Floor, Plot 417, Udyog Vihar III Rd, Gurugram, 122016 <br />
                        Haryana
                        </p>
                    </div>

                    <div className="mt-6">
                        <h2 className="font-medium mb-2">Manufactured By:</h2>
                        <p className="text-sm text-zinc-600">
                        Idam Natural Wellness Pvt. Ltd <br />
                        Ground Floor, Plot 417, Udyog Vihar III Rd, Gurugram, 122016 <br />
                        Haryana
                        </p>
                    </div>

                    <div className="mt-6">
                        <p className="text-sm text-zinc-600">
                        Email:{" "}
                        <a href="mailto:shop@bellavitaluxury.co.in" className="underline">
                            shop@bellavitaluxury.co.in
                        </a>
                        </p>
                        <p className="text-sm text-zinc-600">Call: +91-9289147325</p>
                        <p className="text-sm text-zinc-600 mt-3">(Monday-Sunday 10:30 AM - 7 PM)</p>
                    </div>
                </div>

            </div>
      </Layout>
    );
  }
  export default ShippingPolicy