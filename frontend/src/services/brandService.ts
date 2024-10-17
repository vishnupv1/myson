/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

// Base URL (optional, if you're using a proxy in React or making calls to the same server)
const API_URL = "http://localhost:5000/api/brands";

// Fetch all categories
export const getBrands = async () => {
  try {
    const res = await axios.get(API_URL);
    return res.data; // Return the response data
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error; // Re-throw error so it can be handled by calling function
  }
};

// Add a new Brand
export const addBrand = async (Brand: any) => {
  try {
    const res = await axios.post(API_URL, Brand);
    return res.data;
  } catch (error) {
    console.error("Error adding Brand:", error);
    throw error;
  }
};

// Edit a Brand by ID
export const editBrand = async ( updatedBrand: any,id: string) => {
  try {
    const res = await axios.put(`${API_URL}/${id}`, updatedBrand);
    return res.data; // Return the updated Brand data if needed
  } catch (error) {
    console.error("Error editing Brand:", error);
    throw error; // Re-throw error to handle it in the calling function
  }
};

// Delete a Brand by ID
export const deleteBrand = async (id: string) => {
  try {
    const res = await axios.delete(`${API_URL}/${id}`);
    return res.data; // Return the response data if needed
  } catch (error) {
    console.error("Error deleting Brand:", error);
    throw error; // Re-throw error to handle it in the calling function
  }
};
