import axios from "axios";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import React, { useEffect, useReducer } from "react";
import { auth } from "../firebase";
import { api, newApi } from "../helpers/const";

export const clientContext = React.createContext();

const initState = {
  sneakers: [],
  user: null,
  mens: [],
  womens: [],
  sneakersDetails: null,

  cartCount: JSON.parse(localStorage.getItem("cart"))
    ? JSON.parse(localStorage.getItem("cart")).products.length
    : 0,
  myCart: null,
  favoritesCount: JSON.parse(localStorage.getItem("favorites"))
    ? JSON.parse(localStorage.getItem("favorites")).products.length
    : 0,
  myFavorites: null,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case "CHECK_USER":
      return { ...state, user: action.payload };
    case "GET_PRODUCT":
      return { ...state, sneakers: action.payload };
    case "GET_MENS":
      return { ...state, mens: action.payload };
    case "GET_WOMEN":
      return { ...state, womens: action.payload };
    case "GET_SNEAKERS_DETAILS":
      return { ...state, sneakersDetails: action.payload };

    case "ADD_PRODUCT_TO_CART":
      return { ...state, cartCount: action.payload };
    case "DELETE_PRODUCT_IN_CART":
      return { ...state, cartCount: action.payload };
    case "GET_PRODUCTS_FROM_CART":
      return { ...state, myCart: action.payload };
    case "ADD_PRODUCT_TO_FAVORITES":
      return { ...state, favoritesCount: action.payload };
    case "DELETE_PRODUCT_IN_FAVORITES":
      return { ...state, favoritesCount: action.payload };
    case "GET_PRODUCTS_FROM_FAVORITES":
      return { ...state, myFavorites: action.payload };

    default:
      return state;
  }
};

const ClientContext = (props) => {
  const [state, dispatch] = useReducer(reducer, initState);

  const authWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      const action = {
        type: "CHECK_USER",
        payload: user,
      };
      dispatch(action);
    });
  }, []);

  const logOut = () => {
    signOut(auth);
  };

  const getProduct = async () => {
    const response = await axios(`${api}${window.location.search}`);
    const action = {
      type: "GET_PRODUCT",
      payload: response.data,
    };
    dispatch(action);
  };

  const getMens = async () => {
    const response = await axios(`${api}?menOrWomen=Men`);
    const action = {
      type: "GET_MENS",
      payload: response.data,
    };
    dispatch(action);
  };
  const getWomen = async () => {
    const response = await axios(`${api}?menOrWomen=Women`);
    const action = {
      type: "GET_WOMEN",
      payload: response.data,
    };
    dispatch(action);
  };
  const addProductToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart) {
      cart = {
        products: [],
        totalPrice: 0,
      };
    }
    const newProduct = {
      product: product,
      count: 1,
      subPrice: 0,
    };
    newProduct.subPrice = product.price * newProduct.count;
    cart.products.push(newProduct);
    cart.totalPrice = cart.products.reduce((prev, next) => {
      return prev + next.subPrice;
    }, 0);
    console.log(cart.products.length);
    localStorage.setItem("cart", JSON.stringify(cart));
    const action = {
      type: "ADD_PRODUCT_TO_CART",
      payload: cart.products.length,
    };
    dispatch(action);
  };

  const checkProductInCart = (id) => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart) {
      return false;
    }
    console.log(cart);
    let prod = cart.products.find((item) => {
      return item.product.id === id;
    });
    if (prod) {
      return true;
    } else {
      return false;
    }
  };

  const deleteProductInCart = (id) => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    let newProducts = cart.products.filter((item) => {
      return item.product.id !== id;
    });
    cart.products = newProducts;
    cart.totalPrice = cart.products.reduce((prev, next) => {
      return prev + next.subPrice;
    }, 0);
    localStorage.setItem("cart", JSON.stringify(cart));
    const action = {
      type: "DELETE_PRODUCT_IN_CART",
      payload: cart.products.length,
    };
    dispatch(action);
  };

  const getProductsFromCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || { products: [] };
    const action = {
      type: "GET_PRODUCTS_FROM_CART",
      payload: cart,
    };
    dispatch(action);
  };

  const changeCountProductInCart = (id, count) => {
    if (count < 1) {
      return;
    }
    const cart = JSON.parse(localStorage.getItem("cart"));
    cart.products = cart.products.map((item) => {
      if (item.product.id === id) {
        item.count = count;
        item.subPrice = item.count * item.product.price;
      }
      return item;
    });
    cart.totalPrice = cart.products.reduce((prev, next) => {
      return prev + next.subPrice;
    }, 0);
    localStorage.setItem("cart", JSON.stringify(cart));
    getProductsFromCart();
  };

  const addProductToFav = (product) => {
    let favorites = JSON.parse(localStorage.getItem("favorites"));
    if (!favorites) {
      favorites = {
        products: [],
      };
    }
    const newProduct = {
      product: product,
      count: 1,
    };
    favorites.products.push(newProduct);

    localStorage.setItem("favorites", JSON.stringify(favorites));
    const action = {
      type: "ADD_PRODUCT_TO_FAVORITES",
      payload: favorites.products.length,
    };
    dispatch(action);
  };

  const checkProductInFavorites = (id) => {
    let favorites = JSON.parse(localStorage.getItem("favorites"));
    if (!favorites) {
      return false;
    }
    let prod = favorites.products.find((item) => {
      return item.product.id === id;
    });
    if (prod) {
      return true;
    } else {
      return false;
    }
  };

  const deleteProductInFavorites = (id) => {
    let favorites = JSON.parse(localStorage.getItem("favorites"));
    let newProducts = favorites.products.filter((item) => {
      return item.product.id !== id;
    });
    favorites.products = newProducts;

    localStorage.setItem("favorites", JSON.stringify(favorites));
    const action = {
      type: "DELETE_PRODUCT_IN_FAVORITES",
      payload: favorites.products.length,
    };
    dispatch(action);
  };

  const getProductsFromFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || {
      products: [],
    };
    const action = {
      type: "GET_PRODUCTS_FROM_FAVORITES",
      payload: favorites,
    };
    dispatch(action);
  };

  const addCardInfo = async (cardInfo) => {
    await axios.post(newApi, cardInfo);
  };

  const addFeedback = async (newFeedback, product) => {
    if (product.feedback) {
      product.feedback.push(newFeedback);
      await axios.patch(`${api}/${product.id}`, product);
    } else {
      product.feedback = [newFeedback];
      await axios.patch(`${api}/${product.id}`, product);
    }
  };
  const getSneakersDetails = async (id) => {
    const response = await axios(`${api}/${id}`);
    const action = {
      type: "GET_SNEAKERS_DETAILS",
      payload: response.data,
    };
    dispatch(action);
  };

  return (
    <clientContext.Provider
      value={{
        authWithGoogle: authWithGoogle,
        logOut: logOut,
        getProduct,
        getMens,
        getWomen,
        addProductToCart,
        checkProductInCart,
        deleteProductInCart,
        getProductsFromCart,
        changeCountProductInCart,
        addCardInfo,
        addProductToFav,
        checkProductInFavorites,
        deleteProductInFavorites,
        getProductsFromFavorites,
        addFeedback,
        getSneakersDetails,
        sneakersDetails: state.sneakersDetails,
        myFavorites: state.myFavorites,
        favoritesCount: state.favoritesCount,
        myCart: state.myCart,
        cartCount: state.cartCount,
        mens: state.mens,
        womens: state.womens,
        sneakers: state.sneakers,
        user: state.user,
      }}
    >
      {props.children}
    </clientContext.Provider>
  );
};

export default ClientContext;
