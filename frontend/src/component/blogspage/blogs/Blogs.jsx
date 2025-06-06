import React from 'react'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Layout from '../../layout/layout';

const Blogs = () => {
    const navigate = useNavigate();

    return (
        <Layout>
            <div className="mx-auto max-w-3xl px-4 py-10">
                <h1 className="text-4xl font-midum mb-8">Perfumes</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="cursor-pointer overflow-hidden  transition " onClick={() => navigate("/BlogFragrance")}>
                        <img src="https://bellavitaluxury.co.in/cdn/shop/articles/Perfume_or_Body_mist_dc5e2118-b5f2-449d-a569-1e0c07d958ee.jpg?v=1727259658&width=1100" className="w-full h-48 object-cover transition-transform transfrom hover:scale-103" />
                        <div className="mt-2">
                            <h2 className="text-xl font-midum">Your Ideal Fragrance: Perfumes or Body Mists?</h2>
                            <p className="text-gray-500 text-xs mt-2">September 25, 2024</p>
                            <p className="text-gray-700 text-sm my-2">Perfumes and body mists are popular choices for adding​ a pleasant fragrance​ tо your daily routine. They can make you feel fresh, confident, and ready​ tо take​ оn the day.​...</p>
                            <Link to="/BlogFragrance" className="text-gray-600 hover:underline font-semibold ">
                                Read more →
                            </Link>
                        </div>
                    </div>

                    <div className="cursor-pointer  overflow-hidden transition" onClick={() => navigate("/TaajGold")}>
                        <img src="https://bellavitaluxury.co.in/cdn/shop/articles/20th_May_Blog_Banner.jpg?v=1724927093&width=535" className="w-full h-48 object-cover transition-transform transfrom hover:scale-103" />
                        <div className="mt-2">
                            <h2 className="text-xl font-midum">TAAJ Gold Oud & AMEER Attar</h2>
                            <p className="text-gray-500 text-xs mt-2">August 29, 2024</p>
                            <p className="text-gray-700 text-sm my-2">Welcome​ tо the﻿ world​ оf TAAJ Gold Oud and﻿ Ameer Attar,﻿ where luxury and tradition come together​ tо create the best attars for men and women.​ If you love natural...</p>
                            <Link to="/BlogFragrance" className="text-gray-600 hover:underline font-semibold">
                                Read more →
                            </Link>
                        </div>
                    </div>

                    <div className="cursor-pointer  overflow-hidden transition mt-5" onClick={() => navigate("/AttarLifestyle")}>
                        <img src="https://bellavitaluxury.co.in/cdn/shop/articles/Attar_as_a_Lifestyle.jpg?v=1719899681&width=535" className="w-full h-48 object-cover transition-transform transfrom hover:scale-103" />
                        <div className="mt-2">
                            <h2 className="text-xl font-midum">Attar as a Lifestyle</h2>
                            <p className="text-gray-500 text-xs mt-2">July 02, 2024</p>
                            <p className="text-gray-700 text-sm my-2">Natural fragrances have been part​ оf our history for the longest﻿ time, adding﻿ depth and richness​ tо our﻿ daily lives.﻿ Among these,﻿ Attar stands out​ as​ a classic.﻿ Attar offers​...</p>
                            <Link to="/BlogFragrance" className="text-gray-600 hover:underline font-semibold">
                                Read more →
                            </Link>
                        </div>
                    </div>

                    <div className="cursor-pointer  overflow-hidden transition mt-5" onClick={() => navigate("/ValentinesDay")}>
                        <img src="https://bellavitaluxury.co.in/cdn/shop/articles/Valentine_s_Day_Gifts.jpg?v=1709788939&width=535" className="w-full h-48 object-cover transition-transform transfrom hover:scale-103" />
                        <div className="mt-2">
                            <h2 className="text-xl font-midum">Valentine’s Day Gifts: Perfume Gift Set & Hampers</h2>
                            <p className="text-gray-500 text-xs mt-2">March 07, 2024</p>
                            <p className="text-gray-700 text-sm my-2">Are you also tired​ оf searching for the best gifts and presents for your better half and searching the whole internet with keywords like “Best Valentine's Day gifts for boyfriend,...</p>
                            <Link to="/BlogFragrance" className="text-gray-600 hover:underline font-semibold">
                                Read more →
                            </Link>
                        </div>
                    </div>

                    <div className="cursor-pointer  overflow-hidden transition mt-5" onClick={() => navigate("/GiftingPerfume")}>
                        <img src="https://bellavitaluxury.co.in/cdn/shop/articles/Gifting_the_Perfect_Perfume_Set_for_Couples.jpg?v=1687158097&width=535" className="w-full h-48 object-cover transition-transform transfrom hover:scale-103" />
                        <div className="mt-2">
                            <h2 className="text-xl font-midum">Gifting the Perfect Perfume Set for Couples: An Expert Guide</h2>
                            <p className="text-gray-500 text-xs mt-2">June 19, 2023</p>
                            <p className="text-gray-700 text-sm my-2">Choosing the ideal gift for a couple can be fun and difficult. A thoughtful gift, however, can enrich their important occasions and generate enduring memories. Among the many available gift...</p>
                            <Link to="/BlogFragrance" className="text-gray-600 hover:underline font-semibold">
                                Read more →
                            </Link>
                        </div>
                    </div>

                    <div className="cursor-pointer  overflow-hidden transition mt-5" onClick={() => navigate("/WomenPerfume")}>
                        <img src="https://bellavitaluxury.co.in/cdn/shop/articles/Women-Perfume-History-Uses-with-these-6-Best-Fragrances.jpg?v=1652174637&width=535" className="w-full h-48 object-cover transition-transform transfrom hover:scale-103" />
                        <div className="mt-2">
                            <h2 className="text-xl font-midum">Women Perfume - History, Uses with these 6 Best Fragrances</h2>
                            <p className="text-gray-500 text-xs mt-2">March 24, 2022</p>
                            <p className="text-gray-700 text-sm my-2">It is said, “You are never fully dressed without perfume”! For creating a sophisticated, enchanting impression, it is imperative that you smell good too. There are perfumes galore in the...</p>
                            <Link to="/BlogFragrance" className="text-gray-600 hover:underline font-semibold">
                                Read more →
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </Layout>
    );
};

export default Blogs;




