import Layout from "../layout/layout";

function AboutUs() {
    return (
        <Layout>
          <div className="max-w-4xl mx-auto px-6 py-12 ">
                <h1 className="text-3xl font-medium mb-4">About Us</h1>
                <p className="mb-6 text-sm text-zinc-600 leading-6">
                If you like smelling awesome all day long, you're at the right place. And if you love luxurious and iconic perfumes 
                but don’t want to spend your hard-earned money, then also you’re in the right place. BELLAVITA is a fragrance-forward 
                brand that creates world-class luxury perfumes along with bath and body products that feel good and smell even better. 
                Our perfumes are all you need to be the centre of attention, be it day or night. Our best-selling perfumes are infused 
                in our bath and body range so that you smell awesome straight from the time you take a shower. Power through the day 
                with imported perfume oils from France, Spain, and Italy right in your pocket and wardrobe, as BELLAVITA is single-mindedly 
                and completely obsessed with making you smell fresh and irresistible.
                </p>
        
                <h2 className="text-2xl font-semibold mb-4">What We Want To Achieve</h2>
                <p className="mb-6 text-sm text-zinc-600 leading-6">
                We want to make luxury perfumes and aromatic bath and body ranges accessible to all at value-driven prices. No one should 
                have to compromise on their right to smell good with BELLAVITA around. Light on the pocket and heavy on the fragrance, 
                we’ve got your back.
                </p>
        
                <h2 className="text-2xl font-semibold mb-6">Our Promise To You</h2>
        
                <div className="space-y-6">
                  <div>
                      <h3 className="text-lg font-medium my-4">IFRA-certified</h3>
                      <p className="text-sm text-zinc-600 leading-6">We make perfumes that are safe to use on skin so that allergies and reactions are not words in your vocabulary.</p>
                  </div>
          
                  <div>
                      <h3 className="text-lg font-medium my-4">Imported Oils</h3>
                      <p className="text-sm text-zinc-600 leading-6">We went out around the world for you, bringing you iconic and luxurious perfumes from France, Spain, and Italy.</p>
                  </div>
          
                  <div>
                      <h3 className="text-lg font-medium my-4">Long-lasting</h3>
                      <p className="text-sm text-zinc-600 leading-6">All good things come to an end but we try our best to stay put for 6-8 hours so that you can smell fresh all day long.</p>
                  </div>
          
                  <div>
                      <h3 className="text-lg font-medium my-4">Cruelty-free</h3>
                      <p className="text-sm text-zinc-600 leading-6">
                      Neither were any furry babies harmed nor will they ever be. We love animals and do not test our products on them 
                      before dispatching them to you, with love.
                      </p>
                  </div>
                </div>
            </div>
      </Layout>
    );
  }
  export default AboutUs