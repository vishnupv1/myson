/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

// Base URL (optional, if you're using a proxy in React or making calls to the same server)
const API_URL = "http://localhost:5000/api/products";

// Fetch all products
export const getProducts = async () => {
  try {
    const res = await axios.get(API_URL);
    return res.data; // Return the response data
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error; // Re-throw error so it can be handled by calling function
  }
};

// Add a new product
export const addProduct = async (product:any) => {
  try {
    const res = await axios.post(API_URL, product);
    return res.data;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};

export const editProduct = async (updatedProduct: any,id: string) => {
  try {
    const res = await axios.put(`${API_URL}/${id}`, updatedProduct);
    return res.data; // Return the updated category data if needed
  } catch (error) {
    console.error("Error editing product:", error);
    throw error; // Re-throw error to handle it in the calling function
  }
};

// Delete a category by ID
export const deleteProduct = async (id: string) => {
  try {
    const res = await axios.delete(`${API_URL}/${id}`);
    return res.data; // Return the response data if needed
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error; // Re-throw error to handle it in the calling function
  }
};
