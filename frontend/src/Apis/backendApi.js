const backendApi = "https://bellavita-project-1.onrender.com" //http://localhost:4000

const Api = {
  signup: {
    url: `${backendApi}/signup/Create`,
    method: "post"
  },
  login: {
    url: `${backendApi}/signup/Login`,
    method: "post"
  },
  getAlluser: {
    url: `${backendApi}/signup/allUser`,
    method: "get"
  },
  updateUserRole: (userId) => ({
    url: `${backendApi}/signup/${userId}/role`,
    method: "put"
  }),
  deleteUser: (userId) => ({
    url: `${backendApi}/signup/delete/${userId}`,
    method: "delete"
  }),
  currentUser: {
    url: `${backendApi}/signup/getcurrentuser`,
    method: "get"
  },
  product: {
    url: `${backendApi}/product/Create`,
    method: "post"
  },
  ProductgetAll: {
    url: `${backendApi}/product/getAll`,
    method: "get"
  },
  DeleteProduct: (id) => ({
    url: `${backendApi}/product/delete/${id}`,
    method: "delete"
  }),
  UpdateProduct: (id) => ({
    url: `${backendApi}/product/update/${id}`,
    method: 'put',
  }),
  ProductById: (id) => ({
    url: `${backendApi}/product/getId/${id}`,
    method: 'get',
  }),
  addToCart: {
    method: 'POST',
    url: `${backendApi}/api/cart/add`,
  },
  getCart: {
    method: 'GET',
    url: `${backendApi}/api/cart/get`,
  },
  updateQuantity: {
    method: 'POST',
    url: `${backendApi}/api/cart/update`,
  },
  removeFromCart: {
    method: 'DELETE',
    url: `${backendApi}/api/cart/remove`,
  },
  clearCart: {
    method: 'DELETE',
    url: `${backendApi}/api/cart/clear`,
  },
  getCartItemCount: {
    method: 'GET',
    url: `${backendApi}/api/cart/getCartCount`,
  },
  placeOrder: {
    method: "POST",
    url: `${backendApi}/api/order/place`,
  },
  getAllOrders: {
    method: "GET",
    url: `${backendApi}/api/order/getAllOrder`,
  },
  GetMyOrders: {
    method: "GET",
    url: `${backendApi}/api/order/myOrders`,
  },
  updateOrderStatus: (id) => ({
    method: 'PUT',
    url: `${backendApi}/api/order/updateStatus/${id}`,
  }),
  productsByCategory: (category) => ({
    url: `${backendApi}/product/getByCategory/${encodeURIComponent(category)}`,
    method: "GET"
  }),
  addToWishlist: {
    method: 'POST',
    url: `${backendApi}/api/wishlist/add`,
  },
  getWishlist: {
    method: 'GET',
    url: `${backendApi}/api/wishlist/get`,
  },
  removeFromWishlist: {
    method: 'DELETE',
    url: `${backendApi}/api/wishlist/remove`,
  },
  clearWishlist: {
    method: 'DELETE',
    url: `${backendApi}/api/wishlist/clear`,
  },
  getWishlistItemCount: {
    method: 'GET',
    url: `${backendApi}/api/wishlist/getCartCount`,
  },
  searchProduct: (query) => ({
    url: `${backendApi}/product/search?query=${encodeURIComponent(query)}`,
    method: "GET",
  }),
  contact: {
    url: `${backendApi}/api/contact/create`,
    method: 'POST'
  },
  getAllContacts: {
    url: `${backendApi}/api/contact/all`,
    method: 'GET'
  },
  getUserContacts: (userId) => ({
    url: `${backendApi}/api/contact/user/${userId}`,
    method: 'GET'
  }),
  updateContactStatus: (id) => ({
    url: `${backendApi}/api/contact/update/${id}`,
    method: 'PUT'
  }),
  CreateRazorpayOrder: {
    method: 'POST',
    url: `${backendApi}/payment/create-order`,
  },
  getAllOrders: {
    method: 'GET',
    url: `${backendApi}/api/order/getAllOrder`,
  },
  saveAddress: {
    url: `${backendApi}/signup/save-address`,
    method: "post"
  },


}

export default Api