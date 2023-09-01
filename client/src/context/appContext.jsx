import React from "react";
import { useContext, useReducer } from "react";
import reducer from "./reducer";
import { toast } from "react-toastify";
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  HANDLE_CHANGE,
  REGISTER_USER_BEGINS,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGOUT_USER,
  VERIFICATION_BEGINS,
  VERIFICATION_SUCCESS,
  VERIFICATION_ERROR,
  LOGIN_USER_BEGINS,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  UPLOAD_IMAGE_BEGINS,
  UPLOAD_IMAGE_SUCCESS,
  UPLOAD_IMAGE_ERROR,
  CREATE_PRODUCT_BEGINS,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_ERROR,
  GET_ALL_PRODUCTS_BEGINS,
  GET_ALL_PRODUCTS_SUCCESS,
  GET_ALL_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGINS,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
  SET_EDIT_ID,
  DELETE_PRODUCT_BEGIN,
  DELETE_PRODUCT_ERROR,
  DELETE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_BEGINS,
  UPDATE_PRODUCT_ERROR,
  UPDATE_PRODUCT_SUCCESS,
  ADD_TO_CART,
  UPDATE_ITEM_QUANTITY_IN_CART,
  UPDATE_TOTAL_AMOUNT,
  REMOVE_ITEM_FROM_CART,
  UPDATE_ORDER_BEGINS,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_ERROR,
  CREATE_ORDER_BEGINS,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_ERROR,
  RESET_CART,
  FETCH_ORDERED_ITEM_BEGINS,
  FETCH_ORDERED_ITEM_SUCCESS,
  FETCH_ORDERED_ITEM_ERROR,
  FETCH_SINGLE_ORDER_BEGINS,
  FETCH_SINGLE_ORDER_SUCCESS,
  FETCH_SINGLE_ORDER_ERROR,
  CANCEL_ORDER_BEGINS,
  CANCEL_ORDER_SUCCESS,
  CANCEL_ORDER_ERROR,
  CREATE_REVIEW_ERROR,
  CREATE_REVIEW_BEGINS,
  CREATE_REVIEW_SUCCESS,
  GET_SINGLE_PRODUCT_REVIEW_BEGINS,
  GET_SINGLE_PRODUCT_REVIEW_ERROR,
  GET_SINGLE_PRODUCT_REVIEW_SUCCESS,
  DELETE_REVIEW_BEGINS,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_ERROR,
  SET_EDIT_REVIEW,
  EDIT_REVIEW_BEGINS,
  EDIT_REVIEW_SUCCESS,
  EDIT_REVIEW_ERROR,
  CHANGE_PAGE,
  TOGGLE_MENU,
} from "./action";
import axios from "axios";

const AppContext = React.createContext();

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");
const cartItems = localStorage.getItem("cartItems");

const initialState = {
  user: user ? JSON.parse(user) : null,
  token: token,
  isLoading: false,
  showAlert: false,
  isEdit: false,
  editId: "",
  items: "",
  alertText: "",
  alertType: "",
  isError: false,
  products: [],
  product: {},
  totalProducts: 0,
  name: "",
  price: "",
  description: "",
  flavour: "",
  image: "",
  typeOptions: ["all", "cake", "milkshake"],
  type: "all",
  categoryOptions: [
    "general",
    "birthday-cake",
    "anniversary-cake",
    "kids-cake",
    "milkshake",
  ],
  category: "general",
  freeDeliveryOptions: ["true", "false"],
  freeDelivery: "false",
  inventory: "",
  averageRating: "",
  cartItems: cartItems ? JSON.parse(cartItems) : [],
  totalQuantity: 0,
  totalAmount: 0,
  orderId: "",
  orderedItemsArray: [],
  order: {},
  isModalOpen: false,
  search: "",
  title: "",
  comment: "",
  rating: 1,
  totalPages: 1,
  page: 1,
  reviews: [],
  reviewEditId: "",
  isToggleMenu: false,
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  /* axios.defaults.headers["Authorization"] = `Bearer ${state.token}`; */
  const authFetch = axios.create({
    baseURL: "http://localhost:5000/api/v1",
  });

  authFetch.interceptors.request.use(
    (config) => {
      config.headers["Authorization"] = `Bearer ${state.token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        console.log(error);
        logoutUser();
      }
      return Promise.reject(error);
    }
  );
  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };
  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };
  const addUserToLocalStoage = ({ user, token }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };
  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };
  const handleInputChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
  };
  const registerUser = async (currentUser) => {
    dispatch({ type: REGISTER_USER_BEGINS });
    try {
      await axios.post(
        `http://localhost:5000/api/v1/auth/register`,
        currentUser
      );
      dispatch({ type: REGISTER_USER_SUCCESS });
      clearAlert();
    } catch (error) {
      dispatch({
        type: REGISTER_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
      clearAlert();
    }
  };
  const loginUser = async (currentUser) => {
    dispatch({ type: LOGIN_USER_BEGINS });
    try {
      const { data } = await axios.post(
        `http://localhost:5000/api/v1/auth/login`,
        currentUser
      );
      const { user, token } = data;
      dispatch({ type: LOGIN_USER_SUCCESS, payload: { user, token } });
      clearAlert();
      addUserToLocalStoage({ user, token });
    } catch (error) {
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
  };
  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  };
  const verifyEmail = async ({ verificationCode, email }) => {
    dispatch({ type: VERIFICATION_BEGINS });
    try {
      await axios.post(`http://localhost:5000/api/v1/auth/verify-email`, {
        verificationCode,
        email,
      });
      dispatch({ type: VERIFICATION_SUCCESS });
      clearAlert();
    } catch (error) {
      dispatch({ type: VERIFICATION_ERROR });
      clearAlert();
    }
  };
  const getAllProducts = async () => {
    dispatch({ type: GET_ALL_PRODUCTS_BEGINS });
    const { search, page, category, type } = state;
    let url = `/products?page=${page}&category=${category}&type=${type}`;
    if (search) {
      url = url + `&search=${search}`;
      console.log(url);
    }
    try {
      const { data } = await authFetch.get(url);
      const { products, totalProducts, totalPages } = data;
      dispatch({
        type: GET_ALL_PRODUCTS_SUCCESS,
        payload: { products, totalProducts, totalPages },
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_PRODUCTS_ERROR,
        payload: { msg: error.response.data.msg },
      });
      clearAlert();
    }
  };
  const uploadImage = async (formData) => {
    dispatch({ type: UPLOAD_IMAGE_BEGINS });
    try {
      const {
        data: {
          image: { src },
        },
      } = await axios.post(
        "http://localhost:5000/api/v1/products/upload-image",

        formData,

        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      dispatch({ type: UPLOAD_IMAGE_SUCCESS, payload: { src } });
      clearAlert();
    } catch (error) {
      dispatch({
        type: UPLOAD_IMAGE_ERROR,
        payload: { msg: error.response.data.msg },
      });
      clearAlert();
    }
  };
  const createProduct = async (product) => {
    dispatch({ type: CREATE_PRODUCT_BEGINS });
    try {
      await authFetch.post("/products", product);
      dispatch({ type: CREATE_PRODUCT_SUCCESS });
      clearAlert();
    } catch (error) {
      dispatch({
        type: CREATE_PRODUCT_ERROR,
        payload: { msg: error.response.data.msg },
      });
      console.log(error);
      clearAlert();
    }
  };
  const getSingleProduct = async (productId) => {
    dispatch({ type: GET_SINGLE_PRODUCT_BEGINS });
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/products/${productId}`
      );
      const { product } = data;
      dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: { product } });
    } catch (error) {
      dispatch({
        type: GET_ALL_PRODUCTS_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
  };
  const setEditId = (id) => {
    dispatch({ type: SET_EDIT_ID, payload: { id } });
  };
  const updateProduct = async (product) => {
    dispatch({ type: UPDATE_PRODUCT_BEGINS });
    try {
      await authFetch.patch(`/products/${state.editId}`, product);
      dispatch({ type: UPDATE_PRODUCT_SUCCESS });
      clearAlert();
    } catch (error) {
      dispatch({
        type: UPDATE_PRODUCT_ERROR,
        payload: { msg: error.response.data.msg },
      });
      console.log(error);
      clearAlert();
    }
  };
  const deleteProduct = async (id) => {
    dispatch({ type: DELETE_PRODUCT_BEGIN });
    try {
      await authFetch.delete(`/products/${id}`);
      dispatch({ type: DELETE_PRODUCT_SUCCESS });
      getAllProducts();
      clearAlert();
    } catch (error) {
      dispatch({
        type: DELETE_PRODUCT_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
  };
  const addToCart = (productId) => {
    const isDuplicate = duplicateElementInCart(productId);
    if (isDuplicate) {
      toast.success("Item already in cart", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    dispatch({ type: ADD_TO_CART, payload: { productId } });
    toast.success("Item Added to Cart", {
      position: toast.POSITION.TOP_RIGHT,
    });
    clearAlert();
  };
  const duplicateElementInCart = (productId) => {
    const item = state.cartItems.find((cartitem) => cartitem._id === productId);
    if (item) {
      return true;
    }
    return false;
  };
  const updatecartitemquantity = (productId, operation) => {
    dispatch({
      type: UPDATE_ITEM_QUANTITY_IN_CART,
      payload: { productId, operation },
    });
  };
  const updateTotalAmount = () => {
    let totalAmount;
    let totalQuantity;
    const singleItemTotalPrice = state?.cartItems?.map((item) => {
      const { price, quantity } = item;
      return price * quantity;
    });

    totalAmount = singleItemTotalPrice?.reduce(
      (accumulator, currentValue) => accumulator + currentValue
    );

    const singleItemtotalQuantity = state.cartItems?.map(({ quantity }) => {
      return quantity;
    });

    totalQuantity = singleItemtotalQuantity?.reduce(
      (accumulator, currentValue) => accumulator + currentValue
    );

    dispatch({
      type: UPDATE_TOTAL_AMOUNT,
      payload: { totalAmount, totalQuantity },
    });
  };
  const removeItemFromCart = (id) => {
    const newCartItems = state.cartItems.filter((item) => item._id !== id);
    dispatch({ type: REMOVE_ITEM_FROM_CART, payload: { newCartItems } });
  };
  const resetCart = () => {
    dispatch({ type: RESET_CART });
  };
  const createOrder = async () => {
    dispatch({ type: CREATE_ORDER_BEGINS });
    try {
      const { data } = await authFetch.post("/orders", {
        cartItems: state.cartItems,
      });
      const { clientSecret, orderId } = data;
      localStorage.setItem("orderId", orderId);
      dispatch({ type: CREATE_ORDER_SUCCESS, payload: { orderId } });
      return clientSecret;
    } catch (error) {
      dispatch({ type: CREATE_ORDER_ERROR });
    }
  };
  const updateOrder = async (paymentIntentId) => {
    dispatch({ type: UPDATE_ORDER_BEGINS });
    const orderId = localStorage.getItem("orderId");
    try {
      await authFetch.patch(`/orders/${orderId}`, { paymentIntentId });
      dispatch({ type: UPDATE_ORDER_SUCCESS });
      resetCart();
    } catch (error) {
      dispatch({ type: UPDATE_ORDER_ERROR });
    }
  };
  const orderedItems = async () => {
    dispatch({ type: FETCH_ORDERED_ITEM_BEGINS });
    try {
      const { data } = await authFetch("/orders/showAllMyOrders");
      const { orders } = data;
      dispatch({
        type: FETCH_ORDERED_ITEM_SUCCESS,
        payload: { orders },
      });
    } catch (error) {
      dispatch({
        type: FETCH_ORDERED_ITEM_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
  };
  const getSingleOrder = async (orderId) => {
    dispatch({ type: FETCH_SINGLE_ORDER_BEGINS });
    try {
      const {
        data: { order },
      } = await authFetch.get(`/orders/${orderId}`);
      dispatch({ type: FETCH_SINGLE_ORDER_SUCCESS, payload: { order } });
    } catch (error) {
      dispatch({
        type: FETCH_SINGLE_ORDER_ERROR,
        payload: { msg: error.response.data.msg },
      });
      clearAlert();
    }
  };
  const cancelOrder = async (orderId) => {
    dispatch({ type: CANCEL_ORDER_BEGINS });
    try {
      await authFetch.patch(`/orders/cancelOrder/${orderId}`);
      await getSingleOrder();
      dispatch({ type: CANCEL_ORDER_SUCCESS });
      clearAlert();
    } catch (error) {
      dispatch({ type: CANCEL_ORDER_ERROR });
      clearAlert();
    }
  };
  const createReview = async (productId) => {
    dispatch({ type: CREATE_REVIEW_BEGINS });
    const { title, comment, rating } = state;
    try {
      await authFetch.post("/reviews", {
        title,
        comment,
        rating,
        product: productId,
      });
      dispatch({ type: CREATE_REVIEW_SUCCESS });
      toast.success("Review submitted", {
        position: toast.POSITION.TOP_RIGHT,
      });
      getSingleProductReview(productId);
      clearAlert();
    } catch (error) {
      dispatch({ type: CREATE_REVIEW_ERROR });
      const msg = error.response.data.msg;
      toast.error(msg, {
        position: toast.POSITION.TOP_RIGHT,
      });
      clearAlert();
    }
  };
  const getSingleProductReview = async (productId) => {
    dispatch({ type: GET_SINGLE_PRODUCT_REVIEW_BEGINS });
    try {
      const { data: reviews } = await authFetch.get(
        `/products/${productId}/reviews`
      );
      dispatch({
        type: GET_SINGLE_PRODUCT_REVIEW_SUCCESS,
        payload: { reviews },
      });
    } catch (error) {
      dispatch({ type: GET_SINGLE_PRODUCT_REVIEW_ERROR });
    }
  };
  const setEditReview = (id) => {
    dispatch({ type: SET_EDIT_REVIEW, payload: { id } });
  };
  const editReview = async (reviewId) => {
    dispatch({ type: EDIT_REVIEW_BEGINS });
    const { title, comment, rating, product } = state;
    try {
      await authFetch.patch(`/reviews/${reviewId}`, { title, comment, rating });
      dispatch({ type: EDIT_REVIEW_SUCCESS });
      getSingleProductReview(product._id);
      toast.success("Review edited", {
        position: toast.POSITION.TOP_RIGHT,
      });
      clearAlert();
    } catch (error) {
      dispatch({ type: EDIT_REVIEW_ERROR });
      console.log(error);
      const msg = error.response.data.msg;
      toast.error(msg, {
        position: toast.POSITION.TOP_RIGHT,
      });
      clearAlert();
    }
  };
  const deleteReview = async (reviewId) => {
    dispatch({ type: DELETE_REVIEW_BEGINS });
    try {
      await authFetch.delete(`/reviews/${reviewId}`);
      dispatch({ type: DELETE_REVIEW_SUCCESS, payload: { reviewId } });
      toast.success("Review removed", {
        position: toast.POSITION.TOP_RIGHT,
      });
      clearAlert();
    } catch (error) {
      dispatch({ type: DELETE_REVIEW_ERROR });
      const msg = error.response.data.msg;
      toast.error(msg, {
        position: toast.POSITION.TOP_RIGHT,
      });
      clearAlert();
    }
  };
  const changePage = (page) => {
    dispatch({ type: CHANGE_PAGE, payload: { page } });
  };
  const toggleMenu = () => {
    dispatch({ type: TOGGLE_MENU });
  };
  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        registerUser,
        loginUser,
        verifyEmail,
        handleInputChange,
        logoutUser,
        uploadImage,
        updateProduct,
        deleteProduct,
        createProduct,
        getAllProducts,
        getSingleProduct,
        setEditId,
        addToCart,
        updatecartitemquantity,
        updateTotalAmount,
        removeItemFromCart,
        createOrder,
        updateOrder,
        orderedItems,
        getSingleOrder,
        cancelOrder,
        createReview,
        getSingleProductReview,
        editReview,
        deleteReview,
        setEditReview,
        changePage,
        toggleMenu
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useAppContext, initialState };
