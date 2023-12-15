import { createStore } from "redux";

// Initial state
const initialState = {
  userId: null,
  idCategory: null,
  idProduct: null,
  changeCart: false,
  idGroup: null,
  
};

// Reducer function
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER_ID":
      return {
        ...state,
        userId: action.payload,
      };
    case "SET_GROUP_ID":
      return {
        ...state,
        idGroup: action.payload,
      };
    case "SET_CATEGORY_ID":
      return {
        ...state,
        idCategory: action.payload,
      };
    case "SET_PRODUCT_ID":
      return {
        ...state,
        idProduct: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        userId: null,
      };
    case "UPDATE_CART":
      return {
        ...state,
        changeCart: true,
      };
    default:
      return state;
  }
};

// Create store
const store = createStore(reducer);

export default store;
