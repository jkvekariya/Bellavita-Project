import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../../../Apis/backendApi";
import Context from "../../../component/context/Context";
import toast from "react-hot-toast";

const ProductDetail = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { cartCount, setCartCount } = useContext(Context);
  const token = localStorage.getItem("token");

  const fetchProducts = async () => {
    try {
      const res = await fetch(Api.ProductgetAll.url);
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.log("Error fetching products", error);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this product?");
    if (!confirm) return;

    try {
      const res = await fetch(Api.DeleteProduct(id).url, {
        method: Api.DeleteProduct(id).method,
      });

      if (res.ok) {
        setProducts((prev) => prev.filter((product) => product._id !== id));
      } else {
        console.log("Failed to delete product");
      }
    } catch (error) {
      console.log("Error deleting product", error);
    }
  };

  const handleAddToCart = async (productId) => {
    if (!token) {
      toast.error("Please login first");
      return;
    }

    try {
      const res = await fetch(Api.addToCart.url, {
        method: Api.addToCart.method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Product added to cart");
        setCartCount(data.items?.length || cartCount + 1);
      } else {
        toast.error(data?.error || "Failed to add to cart");
      }
    } catch (error) {
      toast.error("Error adding product to cart");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="py-5 flex justify-between items-center">
        <h1 className="text-xl text-gray-700 font-bold ml-10">All Products</h1>
        <button
          className="px-5 py-2 bg-gray-100 font-semibold border border-gray-200 hover:bg-white mr-10"
          onClick={() => navigate("/AddProduct")}
        >
          Add Product
        </button>
      </div>

      <div className="flex justify-end px-10 mb-4">
        <input
          type="text"
          placeholder="Search product by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-80 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
        />
      </div>

      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border border-collapse sm:border-separate border-gray-200 text-pink-400">
          <thead>
            <tr>
              <th className="h-12 px-6 bg-gray-100 text-gray-700 font-bold">S.No</th>
              <th className="h-12 px-6 bg-gray-100 text-gray-700 font-bold">Image</th>
              <th className="h-12 px-6 bg-gray-100 text-gray-700 font-bold">Product Name</th>
              <th className="h-12 px-6 bg-gray-100 text-gray-700 font-bold">Real Price</th>
              <th className="h-12 px-6 bg-gray-100 text-gray-700 font-bold">Discount Price</th>
              <th className="h-12 px-6 bg-gray-100 text-gray-700 font-bold">Category</th>
              <th className="h-12 px-6 bg-gray-100 text-gray-700 font-bold">Collection</th>
              <th className="h-12 px-6 bg-gray-100 text-gray-700 font-bold">Rating</th>
              <th className="h-12 px-6 bg-gray-100 text-gray-700 font-bold">Reviews</th>
              <th className="h-12 px-6 bg-gray-100 text-gray-700 font-bold">Date</th>
              <th className="h-12 px-6 bg-gray-100 text-gray-700 font-bold">Edit</th>
              <th className="h-12 px-6 bg-gray-100 text-gray-700 font-bold">Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product, index) => (
              <tr key={product._id} className="text-gray-700">
                <td className="px-6 py-3 border-t border-gray-200">{index + 1}.</td>
                <td className="h-12 px-6 border-t border-l border-gray-200">
                  <div className="flex justify-center">
                    <img
                      className="w-20 h-20 object-cover"
                      src={product.image}
                      alt={product.name}
                    />
                  </div>
                </td>
                <td className="px-6 py-3 border-t border-l border-gray-200 capitalize">{product.name}</td>
                <td className="px-6 py-3 border-t border-l border-gray-200 capitalize">{product.realprice}</td>
                <td className="px-6 py-3 border-t border-l border-gray-200 capitalize">{product.discountprice}</td>
                <td className="px-6 py-3 border-t border-l border-gray-200 capitalize">{product.category}</td>
                <td className="px-6 py-3 border-t border-l border-gray-200 capitalize">{product.collection}</td>
                <td className="px-6 py-3 border-t border-l border-gray-200 capitalize">{product.rating}</td>
                <td className="px-6 py-3 border-t border-l border-gray-200 capitalize">{product.reviews}</td>
                <td className="px-6 py-3 border-t border-l border-gray-200 capitalize">{product.createdAt}</td>
                <td
                  className="px-6 py-3 border-t border-l border-gray-200 text-green-500 cursor-pointer"
                  onClick={() => navigate(`/updateProduct/${product._id}`)}
                >
                  Edit
                </td>
                <td
                  className="px-6 py-3 border-t border-l border-gray-200 text-red-500 cursor-pointer"
                  onClick={() => handleDelete(product._id)}
                >
                  Delete
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredProducts.length === 0 && (
          <p className="text-center text-gray-400 py-4">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
