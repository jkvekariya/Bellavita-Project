import mongoose from "mongoose";
import dotenv from "dotenv";
import ProductModel from "../model/productModel/ProductModel.js";

dotenv.config();

const products = [
    {
        name: "CEO Man Luxury Perfume",
        description: "A signature scent for the modern man who knows what he wants.",
        realprice: 899,
        discountprice: 699,
        image: ["/ceoperfum.png"],
        collection: "Luxury",
        category: "Perfume",
        condition: "New",
        rating: "4.8",
        reviews: "1250",
        benefits: ["Long lasting", "Alcohol free", "Premium scent"],
        howtouse: ["Spray on pulse points", "Apply from 15cm distance"],
        allingredients: ["Alcohol Denat", "Parfum", "Aqua"]
    },
    {
        name: "White Oud Perfume",
        description: "The essence of luxury with rare white oud and floral notes.",
        realprice: 1299,
        discountprice: 999,
        image: ["/whiteoud.png"],
        collection: "Oud Royale",
        category: "Perfume",
        condition: "Best Seller",
        rating: "4.9",
        reviews: "850",
        benefits: ["Woody fragrance", "Unisex", "Intense"],
        howtouse: ["Apply to wrists and neck"],
        allingredients: ["Oud Extract", "Rose Oil", "Amber"]
    },
    {
        name: "Honey Oud Perfume",
        description: "A sweet and smoky blend of honey and rich oud.",
        realprice: 1199,
        discountprice: 849,
        image: ["/honeyoud.png"],
        collection: "Oud Royale",
        category: "Perfume",
        condition: "Special",
        rating: "4.7",
        reviews: "620",
        benefits: ["Warm aroma", "Versatile"],
        howtouse: ["Spray on clothing or skin"],
        allingredients: ["Natural Honey", "Agarwood", "Vanilla"]
    },
    {
        name: "Date Woman Perfume",
        description: "The perfect romantic fragrance for your special evenings.",
        realprice: 799,
        discountprice: 599,
        image: ["/datewomen.png"],
        collection: "Luxury",
        category: "Perfume",
        condition: "Trending",
        rating: "4.8",
        reviews: "1100",
        benefits: ["Floral notes", "Elegant"],
        howtouse: ["Apply to pulse points"],
        allingredients: ["Jasmine", "Rose", "Musk"]
    },
    {
        name: "Skai Aquatic Perfume",
        description: "Fresh as the ocean breeze with aquatic and citrus notes.",
        realprice: 699,
        discountprice: 499,
        image: ["/sky.png"],
        collection: "Luxury",
        category: "Perfume",
        condition: "New",
        rating: "4.6",
        reviews: "450",
        benefits: ["Refreshing", "Daily wear"],
        howtouse: ["Spritz after shower"],
        allingredients: ["Sea Salt", "Bergamot", "Cedarwood"]
    },
    {
        name: "Restoring Body Wash",
        description: "Nourish your skin with the goodness of natural oils and premium fragrance.",
        realprice: 499,
        discountprice: 349,
        image: ["/bodywash.png"],
        collection: "Bath & Body",
        category: "Body Wash",
        condition: "Fresh",
        rating: "4.7",
        reviews: "300",
        benefits: ["Gently cleanses", "Hydrating"],
        howtouse: ["Lather on wet skin", "Rinse off"],
        allingredients: ["Aloe Vera", "Vitamin E", "Glycerin"]
    },
    {
        name: "Hydrating Body Lotion",
        description: "Deep moisture lock for smooth and glowing skin all day long.",
        realprice: 599,
        discountprice: 399,
        image: ["/bodylotion.png"],
        collection: "Bath & Body",
        category: "Body Lotion",
        condition: "Soft",
        rating: "4.8",
        reviews: "250",
        benefits: ["Non-greasy", "24h moisture"],
        howtouse: ["Massage into skin until absorbed"],
        allingredients: ["Shea Butter", "Cocoa Butter", "Almond Oil"]
    },
    {
        name: "Fresh Deo Stick",
        description: "Keep the sweat away with our powerful aluminum-free deodorant.",
        realprice: 399,
        discountprice: 249,
        image: ["/freshdio.png"],
        collection: "Luxury",
        category: "Deo",
        condition: "Active",
        rating: "4.5",
        reviews: "180",
        benefits: ["Lasts 24h", "Skin friendly"],
        howtouse: ["Apply to clean armpits"],
        allingredients: ["Witch Hazel", "Essential Oils"]
    },
    {
        name: "Gifting Mini Set",
        description: "The ultimate collection of our best sellers in travel-friendly sizes.",
        realprice: 1599,
        discountprice: 1199,
        image: ["/convertio.in_luxurygitftset.png"],
        collection: "Gift Sets",
        category: "Gift",
        condition: "Perfect Gift",
        rating: "4.9",
        reviews: "500",
        benefits: ["Trial sizes", "Beautiful box"],
        howtouse: ["Assorted products"],
        allingredients: ["Various"]
    },
    {
        name: "Oud Gold Perfume",
        description: "A rich and golden fragrance for a royal experience.",
        realprice: 1499,
        discountprice: 1199,
        image: ["/poster3.jpg"],
        collection: "Oud Royale",
        category: "Perfume",
        condition: "Premium",
        rating: "4.9",
        reviews: "350",
        benefits: ["Royal scent", "Long stay"],
        howtouse: ["Direct spray to pulse points"],
        allingredients: ["Gold Oud", "Saffron", "Amber"]
    },
    {
        name: "Luxury Rose Perfume",
        description: "An exquisite blend of Bulgarian rose and jasmine for the sophisticated woman.",
        realprice: 1899,
        discountprice: 1499,
        image: ["/poster3.jpg"],
        collection: "Luxury",
        category: "Perfume",
        condition: "Best Seller",
        rating: "4.9",
        reviews: "890",
        benefits: ["Floral elegance", "Long lasting", "Premium quality"],
        howtouse: ["Spray on pulse points", "Apply after shower"],
        allingredients: ["Bulgarian Rose", "Jasmine", "White Musk", "Vanilla"]
    },
    {
        name: "Luxury Sandalwood Perfume",
        description: "Deep woody notes of sandalwood blended with exotic spices.",
        realprice: 1699,
        discountprice: 1299,
        image: ["/poster3.jpg"],
        collection: "Luxury",
        category: "Perfume",
        condition: "New",
        rating: "4.8",
        reviews: "560",
        benefits: ["Woody fragrance", "Unisex appeal", "Premium blend"],
        howtouse: ["Apply to wrists and neck", "Reapply as needed"],
        allingredients: ["Sandalwood", "Cardamom", "Cedarwood", "Patchouli"]
    },
    {
        name: "Luxury Lavender Body Wash",
        description: "Indulge in the calming essence of French lavender with every wash.",
        realprice: 699,
        discountprice: 499,
        image: ["/bodywash.png"],
        collection: "Bath & Body",
        category: "Body Wash",
        condition: "Best Seller",
        rating: "4.8",
        reviews: "420",
        benefits: ["Calming fragrance", "Deep cleansing", "Moisturizing"],
        howtouse: ["Apply on wet skin", "Lather and rinse"],
        allingredients: ["French Lavender", "Aloe Vera", "Vitamin E", "Glycerin"]
    },
    {
        name: "Luxury Citrus Body Wash",
        description: "Energize your senses with zesty citrus and refreshing mint.",
        realprice: 649,
        discountprice: 449,
        image: ["/bodywash.png"],
        collection: "Bath & Body",
        category: "Body Wash",
        condition: "New",
        rating: "4.7",
        reviews: "310",
        benefits: ["Refreshing", "Energizing", "pH balanced"],
        howtouse: ["Use daily", "Massage gently", "Rinse thoroughly"],
        allingredients: ["Orange Extract", "Lemon Oil", "Mint", "Tea Tree Oil"]
    },
    {
        name: "Luxury Shea Butter Body Lotion",
        description: "Rich shea butter formula for intense hydration and silky smooth skin.",
        realprice: 799,
        discountprice: 599,
        image: ["/bodylotion.png"],
        collection: "Bath & Body",
        category: "Body Lotion",
        condition: "Best Seller",
        rating: "4.9",
        reviews: "670",
        benefits: ["Deep moisturizing", "Non-greasy", "48h hydration"],
        howtouse: ["Apply after shower", "Massage until absorbed"],
        allingredients: ["Shea Butter", "Cocoa Butter", "Vitamin E", "Jojoba Oil"]
    },
    {
        name: "Luxury Vanilla Body Lotion",
        description: "Luxurious vanilla-scented lotion that leaves skin soft and fragrant.",
        realprice: 749,
        discountprice: 549,
        image: ["/bodylotion.png"],
        collection: "Bath & Body",
        category: "Body Lotion",
        condition: "New",
        rating: "4.8",
        reviews: "380",
        benefits: ["Sweet fragrance", "Quick absorption", "All-day moisture"],
        howtouse: ["Use daily", "Apply generously"],
        allingredients: ["Vanilla Extract", "Almond Oil", "Argan Oil", "Hyaluronic Acid"]
    },
    {
        name: "Luxury Sport Deo Stick",
        description: "Premium aluminum-free deodorant with 48-hour protection for active lifestyles.",
        realprice: 499,
        discountprice: 349,
        image: ["/freshdio.png"],
        collection: "Luxury",
        category: "Deo",
        condition: "Best Seller",
        rating: "4.7",
        reviews: "540",
        benefits: ["48h protection", "Aluminum-free", "Fresh scent"],
        howtouse: ["Apply to clean underarms", "Use daily"],
        allingredients: ["Natural Minerals", "Essential Oils", "Vitamin E", "Aloe Extract"]
    },
    {
        name: "Luxury Oud Deo Stick",
        description: "Sophisticated oud fragrance in a long-lasting deodorant formula.",
        realprice: 549,
        discountprice: 399,
        image: ["/freshdio.png"],
        collection: "Luxury",
        category: "Deo",
        condition: "Premium",
        rating: "4.8",
        reviews: "290",
        benefits: ["Luxury fragrance", "All-day freshness", "Skin-friendly"],
        howtouse: ["Apply after shower", "Reapply if needed"],
        allingredients: ["Oud Extract", "Sandalwood", "Natural Minerals", "Witch Hazel"]
    },
    {
        name: "Luxury Premium Gift Set",
        description: "Complete luxury collection featuring our bestselling perfume, body wash, and lotion.",
        realprice: 2499,
        discountprice: 1899,
        image: ["/convertio.in_luxurygitftset.png"],
        collection: "Gift Sets",
        category: "Gift",
        condition: "Best Seller",
        rating: "5.0",
        reviews: "780",
        benefits: ["Complete set", "Premium packaging", "Perfect for gifting"],
        howtouse: ["Full luxury experience"],
        allingredients: ["Various premium products"]
    },
    {
        name: "Luxury Travel Gift Set",
        description: "Travel-sized luxury essentials in an elegant carry case.",
        realprice: 1299,
        discountprice: 999,
        image: ["/convertio.in_luxurygitftset.png"],
        collection: "Gift Sets",
        category: "Gift",
        condition: "New",
        rating: "4.8",
        reviews: "340",
        benefits: ["Travel-friendly", "TSA approved sizes", "Elegant case"],
        howtouse: ["Perfect for travel"],
        allingredients: ["Assorted luxury minis"]
    }
];

async function seed() {
    try {
        const mongoUrl = process.env.URL || "mongodb://localhost:27017/BellaVita";
        await mongoose.connect(mongoUrl);
        console.log("Connected to MongoDB...");

        await ProductModel.deleteMany({});

        await ProductModel.insertMany(products);
        console.log("Products seeded successfully with local Public images!");

        process.exit();
    } catch (error) {
        console.error("Seeding error:", error);
        process.exit(1);
    }
}

seed();
