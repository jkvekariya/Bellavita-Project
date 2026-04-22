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
  const token = localStorage.getItem("adminToken") || localStorage.getItem("token");

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
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 401) {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminUser");
        toast.error("Session expired. Please login again.");
        window.location.href = "/login";
        return;
      }

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
    <div className="p-2 md:p-4 bg-white min-h-screen">
      <div className="py-3 md:py-5 flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-xl md:text-3xl font-bold text-gray-800 ml-2 md:ml-10">All Products</h1>
        <button
          className="px-4 py-1.5 md:px-5 md:py-2 bg-gray-100 font-semibold border border-gray-200 hover:bg-white mr-2 md:mr-10 rounded text-sm md:text-base w-full sm:w-auto"
          onClick={() => navigate("/AddProduct")}
        >
          Add Product
        </button>
      </div>

      <div className="flex flex-col sm:flex-row justify-end px-2 md:px-10 mb-4 items-center">
        <input
          type="text"
          placeholder="Search product by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:w-80 px-3 py-1.5 md:px-4 md:py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black text-sm md:text-base"
        />
      </div>

      <div className="w-full overflow-x-auto shadow-sm rounded-lg border border-gray-200 mx-2 md:mx-10" style={{ width: 'auto' }}>
        <table className="w-full text-left border-collapse text-gray-600 min-w-max">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="h-10 md:h-12 px-3 md:px-6 font-bold border-b border-gray-200 text-sm md:text-base whitespace-nowrap">S.No</th>
              <th className="h-10 md:h-12 px-3 md:px-6 font-bold border-b border-gray-200 text-sm md:text-base whitespace-nowrap">Image</th>
              <th className="h-10 md:h-12 px-3 md:px-6 font-bold border-b border-gray-200 text-sm md:text-base whitespace-nowrap">Product Name</th>
              <th className="h-10 md:h-12 px-3 md:px-6 font-bold border-b border-gray-200 text-sm md:text-base whitespace-nowrap">Real Price</th>
              <th className="h-10 md:h-12 px-3 md:px-6 font-bold border-b border-gray-200 text-sm md:text-base whitespace-nowrap">Discount Price</th>
              <th className="h-10 md:h-12 px-3 md:px-6 font-bold border-b border-gray-200 text-sm md:text-base whitespace-nowrap">Category</th>
              <th className="h-10 md:h-12 px-3 md:px-6 font-bold border-b border-gray-200 text-sm md:text-base whitespace-nowrap">Collection</th>
              <th className="h-10 md:h-12 px-3 md:px-6 font-bold border-b border-gray-200 text-sm md:text-base whitespace-nowrap">Rating</th>
              <th className="h-10 md:h-12 px-3 md:px-6 font-bold border-b border-gray-200 text-sm md:text-base whitespace-nowrap">Reviews</th>
              <th className="h-10 md:h-12 px-3 md:px-6 font-bold border-b border-gray-200 text-sm md:text-base whitespace-nowrap">Date</th>
              <th className="h-10 md:h-12 px-3 md:px-6 font-bold border-b border-gray-200 text-sm md:text-base whitespace-nowrap">Edit</th>
              <th className="h-10 md:h-12 px-3 md:px-6 font-bold border-b border-gray-200 text-sm md:text-base whitespace-nowrap">Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product, index) => (
              <tr key={product._id} className="text-gray-700 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0">
                <td className="px-3 md:px-6 py-2 md:py-3 text-sm md:text-base whitespace-nowrap">{index + 1}.</td>
                <td className="h-10 md:h-12 px-3 md:px-6 text-sm md:text-base whitespace-nowrap">
                  <div className="flex justify-center bg-white rounded-lg p-1 border border-gray-100">
                    <img
                      className="w-12 h-12 md:w-16 md:h-16 object-contain mix-blend-multiply"
                      src={Array.isArray(product.image) ? product.image[0] : product.image}
                      alt={product.name}
                      onError={(e) => {
                        e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Crect fill='%23e0e0e0' width='80' height='80'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='10' fill='%23999'%3ENo image%3C/text%3E%3C/svg%3E";
                      }}
                    />
                  </div>
                </td>
                <td className="px-3 md:px-6 py-2 md:py-3 capitalize text-sm md:text-base whitespace-nowrap">{product.name}</td>
                <td className="px-3 md:px-6 py-2 md:py-3 capitalize text-sm md:text-base whitespace-nowrap">{product.realprice}</td>
                <td className="px-3 md:px-6 py-2 md:py-3 capitalize text-sm md:text-base whitespace-nowrap">{product.discountprice}</td>
                <td className="px-3 md:px-6 py-2 md:py-3 capitalize text-sm md:text-base whitespace-nowrap">{product.category}</td>
                <td className="px-3 md:px-6 py-2 md:py-3 capitalize text-sm md:text-base whitespace-nowrap">{product.collection}</td>
                <td className="px-3 md:px-6 py-2 md:py-3 capitalize text-sm md:text-base whitespace-nowrap">{product.rating}</td>
                <td className="px-3 md:px-6 py-2 md:py-3 capitalize text-sm md:text-base whitespace-nowrap">{product.reviews}</td>
                <td className="px-3 md:px-6 py-2 md:py-3 capitalize text-sm md:text-base whitespace-nowrap">
                    {new Date(product.createdAt).toLocaleDateString()}
                </td>
                <td
                  className="px-3 md:px-6 py-2 md:py-3 text-green-600 font-medium cursor-pointer hover:underline text-sm md:text-base whitespace-nowrap"
                  onClick={() => navigate(`/updateProduct/${product._id}`)}
                >
                  Edit
                </td>
                <td
                  className="px-3 md:px-6 py-2 md:py-3 text-red-500 font-medium cursor-pointer hover:underline text-sm md:text-base whitespace-nowrap"
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
