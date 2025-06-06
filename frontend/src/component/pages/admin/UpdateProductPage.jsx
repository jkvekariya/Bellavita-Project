import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Api from '../../../Apis/backendApi';
import { toast } from 'react-hot-toast';


const UpdateProduct = () => {
  const { id } = useParams();
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
    allingredients: []
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(Api.ProductById(id).url);
        const data = await res.json();
        setFormData({
          name: data.name || '',
          description: data.description || '',
          realprice: data.realprice || '',
          discountprice: data.discountprice || '',
          image: data.image || [],
          rating: data.rating || '',
          reviews: data.reviews || '',
          collection: data.collection || '',
          category: data.category || '',
          condition: data.condition || '',
          benefits: data.benefits || [],
          howtouse: data.howtouse || [],
          allingredients: data.allingredients || [],
        });
      } catch (err) {
        toast.error("❌ Failed to fetch product data.");
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["image", "benefits", "howtouse", "allingredients"].includes(name)) {
      setFormData({ ...formData, [name]: value.split(",") });
    }
    else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(Api.UpdateProduct(id).url, {
        method: Api.UpdateProduct(id).method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(`❌ Update failed: ${result.error || res.statusText}`);
        return;
      }

      toast.success("✅ Product updated successfully!");
      navigate('/Admindashboard');
    } catch (err) {
      toast.error("Something went wrong: " + err.message);
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-pink-500 mb-6 text-center">Update Product</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col">
          <label className='mb-3'>name: </label>
          <input name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} className="border border-gray-500 rounded text-sm p-2" required />
        </div>

        <div className="flex flex-col">
          <label className='mb-3'>category</label>
          <input name="category" placeholder="Category" value={formData.category} onChange={handleChange} className="border border-gray-500 rounded text-sm p-2" />
        </div>

        <div className="flex flex-col">
          <label className='mb-3'>condition</label>
          <input name="condition" placeholder="condition" value={formData.condition} onChange={handleChange} className="border border-gray-500 rounded text-sm p-2" />
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
          <input type="text" name="collection" placeholder="Collection" value={formData.collection} onChange={handleChange} className="border border-gray-500 rounded text-sm p-2" />
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
          <label className='mb-3'>Image URL</label>
          <input name="image" placeholder="Image URL" value={formData.image.join(",")} onChange={handleChange} className="border border-gray-500 rounded text-sm p-2" />
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

export default UpdateProduct;
