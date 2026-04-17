import React, { useState } from 'react';
import Api from '../../../Apis/backendApi';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const AddProduct = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        realprice: '',
        discountprice: '',
        image: [],
        rating: '',
        reviews: '',
        collection: '',
        category: '',
        condition: '',
        benefits: [],
        howtouse: [],
        allingredients: [],
    });
    const [imageErrors, setImageErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (["image","benefits","howtouse","allingredients"].includes(name)) {
            const arrayValue = value.split(",").map(item => item.trim());
            setFormData({ ...formData, [name]: arrayValue });
            
            // Validate image URLs if image field
            if (name === "image") {
                const errors = {};
                arrayValue.forEach((url, idx) => {
                    if (url && !url.match(/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp|svg)$/i)) {
                        errors[idx] = "Invalid image URL format";
                    }
                });
                setImageErrors(errors);
            }
        }
        else if (name === 'benefits') {
            setFormData(prev => ({ ...prev, [name]: value.split(',').map(item => item.trim()) }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(Api.product.url, {
                method: Api.product.method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await res.json();
            console.log("API response:", result);

            if (!res.ok) {
                toast.error('Failed to add product: ' + (result.error || res.statusText));
                return;
            }

            toast.success('Product added successfully!');
            navigate("/Admindashboard");
            setFormData({
                name: '',
                description: '',
                realprice: '',
                discountprice: '',
                image: [],
                rating: '',
                reviews: '',
                collection: '',
                category: '',
                condition: '',
                benefits: [],
                howtouse: [],
                allingredients: [],
            });
        } catch (err) {
            alert('Something went wrong: ' + err.message);
            console.error(err);
        }
    };

    return (
        <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-pink-500 mb-6 text-center">Addto Product</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                    <label className='mb-3'>name: </label>
                    <input name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} className="border border-gray-500 rounded text-sm p-2" required />
                </div>

                <div className="flex flex-col">
                    <label className='mb-3'>category</label>
                    <input name="category" placeholder="Category" value={formData.category} onChange={handleChange} className="border border-gray-500 rounded text-sm p-2"/>
                </div>

                <div className="flex flex-col">
                    <label className='mb-3'>condition</label>
                    <input name="condition" placeholder="Condition" value={formData.condition} onChange={handleChange} className="border border-gray-500 rounded text-sm p-2"/>
                </div>

                <div className="flex flex-col">
                    <label className='mb-3'>realprice</label>
                    <input type="number" name="realprice" placeholder="Real Price" value={formData.realprice} onChange={handleChange} className="border border-gray-500 rounded text-sm p-2" required />
                </div>

                <div className="flex flex-col">
                    <label className='mb-3'>discountprice</label>
                    <input type="number" name="discountprice" placeholder="Discount Price" value={formData.discountprice} onChange={handleChange} className="border border-gray-500 rounded text-sm p-2" required />
                </div>

                <div className="flex flex-col">
                    <label className='mb-3'>collection</label>
                    <input type="text" name="collection" placeholder="Collection" value={formData.collection} onChange={handleChange} className="border border-gray-500 rounded text-sm p-2"/>
                </div>

                <div className="flex flex-col">
                    <label className='mb-3'>rating</label>
                    <input type="number" name="rating" placeholder="Rating" value={formData.rating} onChange={handleChange} className="border border-gray-500 rounded text-sm p-2" required />
                </div>

                <div className="flex flex-col">
                    <label className='mb-3'>reviews</label>
                    <input type="text" name="reviews" placeholder="Reviews" value={formData.reviews} onChange={handleChange} className="border border-gray-500 rounded text-sm p-2" required />
                </div>

                <div className="flex flex-col">
                    <label className='mb-3'>Image URL <span className="text-red-500">*</span></label>
                    <p className="text-xs text-gray-600 mb-2">
                        Enter image URLs separated by commas. Use: https://placehold.co/400 for testing, or Pexels/Unsplash/Pixabay for real images
                    </p>
                    <input 
                        name="image" 
                        placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg" 
                        value={formData.image.join(", ")} 
                        onChange={handleChange} 
                        className="border border-gray-500 rounded text-sm p-2"
                    />
                    {Object.keys(imageErrors).length > 0 && (
                        <p className="text-red-500 text-xs mt-1">⚠️ Some image URLs are invalid</p>
                    )}
                    
                    {/* Image Preview */}
                    {formData.image.length > 0 && (
                        <div className="mt-3">
                            <p className="text-sm font-semibold mb-2">Preview:</p>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                {formData.image.map((url, idx) => (
                                    <div key={idx} className="relative">
                                        <img 
                                            src={url} 
                                            alt={`Preview ${idx}`}
                                            className="w-full h-24 object-cover rounded border border-gray-300"
                                            onError={() => setImageErrors(prev => ({...prev, [idx]: "Failed to load"}))}
                                        />
                                        {imageErrors[idx] && (
                                            <p className="absolute bottom-0 left-0 right-0 bg-red-500 text-white text-xs p-1 rounded">
                                                {imageErrors[idx]}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex flex-col">
                    <label className='mb-3'>Description</label>
                    <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="border border-gray-500 rounded text-sm p-2" />
                </div>

                <div className="flex flex-col">
                    <label className='mb-3'>benefits</label>
                    <textarea name="benefits" placeholder="Benefits" value={formData.benefits} onChange={handleChange} className="border border-gray-500 rounded text-sm p-2" />
                </div>

                <div className="flex flex-col">
                    <label className='mb-3'>how to use</label>
                    <textarea name="howtouse" placeholder="How to Use" value={formData.howtouse} onChange={handleChange} className="border border-gray-500 rounded text-sm p-2" />
                </div>

                <div className="flex flex-col">
                    <label className='mb-3'>All Ingredients</label>
                    <textarea name="allingredients" placeholder="All Ingredients" value={formData.allingredients} onChange={handleChange} className="border border-gray-500 rounded text-sm p-2" />
                </div>

                <div className="md:col-span-2">
                    <button
                        type="submit"
                        className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-4 rounded-md"
                    >
                        Add Product
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;
