import {
  CLEAR_ALERT,
  DISPLAY_ALERT,
  HANDLE_CHANGE,
  LOGOUT_USER,
  REGISTER_USER_BEGINS,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
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
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_ERROR,
  UPDATE_PRODUCT_BEGINS,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_ERROR,
  ADD_TO_CART,
  UPDATE_ITEM_QUANTITY_IN_CART,
  UPDATE_TOTAL_AMOUNT,
  REMOVE_ITEM_FROM_CART,
  CREATE_ORDER_BEGINS,
  CREATE_ORDER_ERROR,
  CREATE_ORDER_SUCCESS,
  UPDATE_ORDER_SUCCESS,
  RESET_CART,
  FETCH_ORDERED_ITEM_BEGINS,
  FETCH_ORDERED_ITEM_SUCCESS,
  FETCH_SINGLE_ORDER_BEGINS,
  FETCH_SINGLE_ORDER_SUCCESS,
  FETCH_SINGLE_ORDER_ERROR,
  CANCEL_ORDER_BEGINS,
  CANCEL_ORDER_SUCCESS,
  CANCEL_ORDER_ERROR,
  CREATE_REVIEW_BEGINS,
  CREATE_REVIEW_SUCCESS,
  CREATE_REVIEW_ERROR,
  GET_SINGLE_PRODUCT_REVIEW_BEGINS,
  GET_SINGLE_PRODUCT_REVIEW_SUCCESS,
  GET_SINGLE_PRODUCT_REVIEW_ERROR,
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
import { initialState } from "./appContext";

const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertText: "Please Provide all the values",
      alertType: "danger",
    };
  }
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertText: "",
      alertType: "",
    };
  }
  if (action.type === HANDLE_CHANGE) {
    return {
      ...state,
      [action.payload.name]: action.payload.value,
    };
  }
  if (action.type === LOGOUT_USER) {
    return {
      ...initialState,
      user: null,
      token: null,
    };
  }
  if (action.type === REGISTER_USER_BEGINS) {
    return {
      ...state,
      isLoading: true,
      showAlert: false,
    };
  }
  if (action.type === REGISTER_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertText: "Verification link sent to registered mail Id",
      alertType: "success",
    };
  }
  if (action.type === REGISTER_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertText: action.payload.msg,
      alertType: "danger",
    };
  }
  if (action.type === VERIFICATION_BEGINS) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === VERIFICATION_SUCCESS) {
    return {
      ...state,
      isLoading: false,
    };
  }
  if (action.type === VERIFICATION_ERROR) {
    return {
      ...state,
      isLoading: false,
      isError: true,
      alertType: "danger",
      alertText: "Verfication failed , Please try again later",
    };
  }
  if (action.type === LOGIN_USER_BEGINS) {
    return {
      ...state,
      isLoading: true,
      showAlert: false,
    };
  }
  if (action.type === LOGIN_USER_SUCCESS) {
    return {
      ...state,
      user: action.payload.user,
      token: action.payload.token,
      isLoading: false,
      showAlert: true,
      alertText: "Login Successful Redirecting....",
      alertType: "success",
    };
  }
  if (action.type === LOGIN_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertText: action.payload.msg,
      alertType: "danger",
    };
  }
  if (action.type === UPLOAD_IMAGE_BEGINS) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === UPLOAD_IMAGE_SUCCESS) {
    return {
      ...state,
      image: action.payload.src,
      isLoading: false,
      showAlert: true,
      alertText: "File uploaded",
      alertType: "success",
    };
  }
  if (action.type === UPLOAD_IMAGE_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertText: action.payload.msg,
      alertType: "danger",
    };
  }
  if (action.type === CREATE_PRODUCT_BEGINS) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === CREATE_PRODUCT_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertText: "Successful",
      alertType: "success",
      name: "",
      price: "",
      description: "",
      flavour: "",
      image: "",
      type: "cake",
      category: "general",
      freeDelivery: "false",
      inventory: "",
    };
  }
  if (action.type === CREATE_PRODUCT_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertText: action.payload.msg,
      alertType: "danger",
    };
  }
  if (action.type === GET_ALL_PRODUCTS_BEGINS) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === GET_ALL_PRODUCTS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: false,
      products: [...action.payload.products],
      totalProducts: action.payload.totalProducts,
      totalPages: action.payload.totalPages,
    };
  }
  if (action.type === GET_ALL_PRODUCTS_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertText: action.payload.msg,
      alertType: "danger",
    };
  }
  if (action.type === GET_SINGLE_PRODUCT_BEGINS) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === GET_SINGLE_PRODUCT_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: false,
      product: action.payload.product,
    };
  }
  if (action.type === GET_SINGLE_PRODUCT_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertText: action.payload.msg,
      alertType: "danger",
    };
  }
  if (action.type === SET_EDIT_ID) {
    const productId = action.payload.id;
    const product = state.products.find((item) => item._id === productId);
    return {
      ...state,
      isEdit: true,
      editId: productId,
      name: product.name,
      price: product.price,
      description: product.description,
      flavour: product.flavour,
      image: product.image,
      type: product.type,
      category: product.category,
      freeDelivery: product.freeDelivery,
      inventory: product.inventory,
    };
  }
  if (action.type === DELETE_PRODUCT_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === DELETE_PRODUCT_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertText: "deleted successfully",
      alertType: "success",
    };
  }
  if (action.type === DELETE_PRODUCT_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertText: "Something went wrong! Please try again later",
      alertType: "success",
    };
  }
  if (action.type === UPDATE_PRODUCT_BEGINS) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === UPDATE_PRODUCT_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertText: "Successful",
      alertType: "success",
      name: "",
      price: "",
      description: "",
      flavour: "",
      image: "",
      type: "all",
      category: "general",
      freeDelivery: "false",
      inventory: "",
    };
  }
  if (action.type === UPDATE_PRODUCT_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertText: action.payload.msg,
      alertType: "danger",
    };
  }
  if (action.type === ADD_TO_CART) {
    const productId = action.payload.productId;
    const singleItem = state.products.find((item) => item._id === productId);
    singleItem.quantity = 1;
    const cartItems = [...state.cartItems, singleItem];
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    return {
      ...state,
      cartItems,
    };
  }
  if (action.type === UPDATE_ITEM_QUANTITY_IN_CART) {
    const productId = action.payload.productId;
    const operation = action.payload.operation;
    const cartItems = state.cartItems;
    const updatedCartItems = cartItems.map((item) => {
      const singleItem = { ...item };
      if (singleItem._id === productId) {
        if (operation === "increment") {
          singleItem.quantity += 1;
        } else {
          if (singleItem.quantity === 1) {
            return singleItem;
          } else {
            singleItem.quantity -= 1;
          }
        }
      }
      return singleItem;
    });
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    return {
      ...state,
      cartItems: updatedCartItems,
    };
  }
  if (action.type === UPDATE_TOTAL_AMOUNT) {
    return {
      ...state,
      totalAmount: action.payload.totalAmount,
      totalQuantity: action.payload.totalQuantity,
    };
  }
  if (action.type === REMOVE_ITEM_FROM_CART) {
    const newCartItems = action.payload.newCartItems;
    localStorage.setItem("cartItems", JSON.stringify(newCartItems));
    return {
      ...state,
      cartItems: newCartItems,
    };
  }
  if (action.type === RESET_CART) {
    localStorage.removeItem("cartItems");
    return {
      ...state,
      cartItems: [],
    };
  }
  if (action.type === CREATE_ORDER_BEGINS) {
    return {
      ...state,
      isLoading: true,
      isError: false,
    };
  }
  if (action.type === CREATE_ORDER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      orderId: action.payload.orderId,
      isError: false,
    };
  }
  if (action.type === CREATE_ORDER_ERROR) {
    return {
      ...state,
      isLoading: false,
      isError: true,
    };
  }
  if (action.type === UPDATE_PRODUCT_BEGINS) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === UPDATE_ORDER_SUCCESS) {
    localStorage.removeItem("orderId");
    return {
      ...state,
      isLoading: false,
    };
  }
  if (action.type === UPDATE_PRODUCT_ERROR) {
    localStorage.removeItem("orderId");
    return {
      ...state,
      isLoading: false,
    };
  }
  if (action.type === FETCH_ORDERED_ITEM_BEGINS) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === FETCH_ORDERED_ITEM_SUCCESS) {
    return {
      ...state,
      isLoading: true,
      orderedItemsArray: [...action.payload.orders],
    };
  }
  if (action.type === FETCH_SINGLE_ORDER_BEGINS) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === FETCH_SINGLE_ORDER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      order: action.payload.order,
    };
  }
  if (action.type === FETCH_SINGLE_ORDER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertText: action.payload.msg,
      alertType: "danger",
    };
  }
  if (action.type === CANCEL_ORDER_BEGINS) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === CANCEL_ORDER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertText: "Order canceled Successfully",
      alertType: "success",
    };
  }
  if (action.type === CANCEL_ORDER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertText: "Order canceled Successfully",
      alertType: "success",
    };
  }
  if (action.type === CREATE_REVIEW_BEGINS) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === CREATE_REVIEW_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      title: "",
      comment: "",
      rating: 1,
      showAlert: true,
    };
  }
  if (action.type === CREATE_REVIEW_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
    };
  }
  if (action.type === GET_SINGLE_PRODUCT_REVIEW_BEGINS) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === GET_SINGLE_PRODUCT_REVIEW_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      reviews: action.payload.reviews.reviews,
    };
  }
  if (action.type === GET_SINGLE_PRODUCT_REVIEW_ERROR) {
    return {
      ...state,
      isLoading: false,
    };
  }
  if (action.type === DELETE_REVIEW_BEGINS) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === DELETE_REVIEW_SUCCESS) {
    const deletedReview = action.payload.reviewId;
    const reviews = state.reviews.filter(
      (review) => review._id !== deletedReview
    );
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      reviews,
    };
  }
  if (action.type === DELETE_REVIEW_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
    };
  }
  if (action.type === SET_EDIT_REVIEW) {
    const id = action.payload.id;
    const review = state.reviews.find((review) => id === review._id);
    return {
      ...state,
      isEdit: true,
      title: review.title,
      comment: review.comment,
      rating: review.rating,
      reviewEditId: review._id,
    };
  }
  if (action.type === EDIT_REVIEW_BEGINS) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === EDIT_REVIEW_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      isEdit: false,
      reviewEditId: "",
    };
  }
  if (action.type === EDIT_REVIEW_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      isEdit: false,
      reviewEditId: "",
    };
  }
  if (action.type === CHANGE_PAGE) {
    return {
      ...state,
      page: action.payload.page,
    };
  }
  if (action.type === TOGGLE_MENU) {
    return {
      ...state,
      isToggleMenu: !state.isToggleMenu,
    };
  }
};
export default reducer;
