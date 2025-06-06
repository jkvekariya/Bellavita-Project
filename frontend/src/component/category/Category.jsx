import { Link, useNavigate } from "react-router-dom";

const category = [
    {
        image: 'https://bellavitaluxury.co.in/cdn/shop/files/intense_1_1.jpg?v=1710762538&width=300', Link: "/luxuryperfumes",
        name: 'LUXURY PERFUMES'
    },
    {
        image: 'https://bellavitaluxury.co.in/cdn/shop/files/3_833ef840-04a1-4ed8-91fb-5ffb379169f7.jpg?v=1713962912&width=300', Link: "/bodywashes",
        name: 'BODY WASHES'
    },
    {
        image: 'https://bellavitaluxury.co.in/cdn/shop/files/lotion-new_a1753ce7-348c-4b78-8eac-9ae1ebd694dd.jpg?v=1713962842&width=300', Link: "/bodylotions",
        name: 'BODY LOTIONS'
    },
    {
        image: 'https://bellavitaluxury.co.in/cdn/shop/files/p4_0b267779-4c41-42e8-97b1-6e71f8d7557f.jpg?v=1713962842&width=300', Link: "/bodydeos",
        name: 'BODY DEOS'
    },
    {
        image: 'https://bellavitaluxury.co.in/cdn/shop/files/Artboard_4_copy_05b3b2ed-5440-4463-b119-bedcd60ed5c1_1.jpg?v=1712657622&width=300', Link: "/gifting",
        name: 'GIFT SETS'
    }
]

const Category = () => {
    const navigate = useNavigate()
    return (
        <div>
            <div className="mt-10">
                <h1 className=" text-center mb-5 text-2xl font-semibold">LUXURY CATEGORIES</h1>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-6xl mx-auto mt-8">
                {category.map((item, index) => {
                    return (
                        <div key={index} className="px-3 lg:px-3 group text-center">
                            <div className="overflow-hidden" >
                                <img src={item.image} onClick={() => navigate(item.Link)} className="mx-auto transform transition-transform duration-300 group-hover:scale-110" />
                            </div>
                            <p className="mt-4 text-sm font-semibold tracking-wide text-black ursor-pointer after:block after:h-[1px] after:bg-white after:scale-x-0 hover:after:scale-x-47 after:transition-transform after:duration-300 after:origin-left">{item.name}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default Category;