import axios from "axios";
import React, { useReducer, useState } from "react";
import { api } from "../helpers/const";

export const adminContext = React.createContext();

const initState = {
  sneakers: [],
  productToEdit: null,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_PRODUCT":
      return { ...state, sneakers: action.payload };
    case "GET_PRODUCT_TO_EDIT":
      return { ...state, productToEdit: action.payload };
    default:
      return state;
  }
};

const AdminContext = (props) => {
  const [state, dispatch] = useReducer(reducer, initState);

  const addProduct = async (newProduct) => {
    await axios.post(api, newProduct);
  };

  const getProduct = async () => {
    console.log(window.location);
    const response = await axios(`${api}${window.location.search}`);
    const action = {
      type: "GET_PRODUCT",
      payload: response.data,
    };
    dispatch(action);
  };

  const getProductToEdit = async (id) => {
    const response = await axios(`${api}/${id}`);
    const action = {
      type: "GET_PRODUCT_TO_EDIT",
      payload: response.data,
    };
    dispatch(action);
  };

  const saveEditedProduct = async (editedProduct) => {
    await axios.patch(`${api}/${editedProduct.id}`, editedProduct);
  };

  const deleteProduct = async (id) => {
    await axios.delete(`${api}/${id}`);
    getProduct();
  };

  const productsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const products = state.sneakers.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalCount = state.sneakers.length;

  const handlePagination = (page) => {
    console.log(page);
    setCurrentPage(page);
  };

  return (
    <adminContext.Provider
      value={{
        addProduct,
        getProduct,
        getProductToEdit,
        saveEditedProduct,
        deleteProduct,
        handlePagination,
        products,
        totalCount: totalCount,
        productsPerPage: productsPerPage,
        sneakers: state.sneakers,
        productToEdit: state.productToEdit,
      }}
    >
      {props.children}
    </adminContext.Provider>
  );
};

export default AdminContext;
