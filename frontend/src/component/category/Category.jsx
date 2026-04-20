import { Link, useNavigate } from "react-router-dom";

const category = [
    {
        image: '/luxuryperfum.png', Link: "/luxuryperfumes",
        name: 'LUXURY PERFUMES'
    },
    {
        image: '/convertio.in_luxurybodywash.png', Link: "/bodywashes",
        name: 'BODY WASHES'
    },
    {
        image: '/luxurybodylotion.png', Link: "/bodylotions",
        name: 'BODY LOTIONS'
    },
    {
        image: '/convertio.in_luxurydeos.png', Link: "/bodydeos",
        name: 'BODY DEOS'
    },
    {
        image: '/convertio.in_luxurygitftset.png', Link: "/gifting",
        name: 'GIFT SETS'
    }
]

const Category = () => {
    const navigate = useNavigate()
    return (
        <div className="mt-10 mb-10">
            <div>
                <h1 className="text-center mb-5 text-2xl font-semibold">LUXURY CATEGORIES</h1>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-6xl mx-auto mt-8">
                {category.map((item, index) => {
                    return (
                        <div key={index} className="px-3 lg:px-3 group text-center">
                            <div className="overflow-hidden rounded-3xl bg-white p-4 shadow-sm transition-shadow duration-300 hover:shadow-lg">
                                <img src={item.image} onClick={() => navigate(item.Link)} className="mx-auto transform transition-transform duration-300 group-hover:scale-110" />
                            </div>
                            <p className="mt-4 text-sm font-semibold tracking-wide text-black cursor-pointer after:block after:h-[1px] after:bg-black after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left">{item.name}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default Category;