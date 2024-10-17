/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

// Base URL (optional, if you're using a proxy in React or making calls to the same server)
const API_URL = "http://localhost:5000/api/category";

// Fetch all categories
export const getCategory = async () => {
  try {
    const res = await axios.get(API_URL);
    return res.data; // Return the response data
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error; // Re-throw error so it can be handled by calling function
  }
};

// Add a new category
export const addCategory = async (category: any) => {
  try {
    const res = await axios.post(API_URL, category);
    return res.data;
  } catch (error) {
    console.error("Error adding category:", error);
    throw error;
  }
};

// Edit a category by ID
export const editCategory = async (id: string, updatedCategory: any) => {
  try {
    const res = await axios.put(`${API_URL}/${id}`, updatedCategory);
    return res.data; // Return the updated category data if needed
  } catch (error) {
    console.error("Error editing category:", error);
    throw error; // Re-throw error to handle it in the calling function
  }
};

// Delete a category by ID
export const deleteCategory = async (id: string) => {
  try {
    const res = await axios.delete(`${API_URL}/${id}`);
    return res.data; // Return the response data if needed
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error; // Re-throw error to handle it in the calling function
  }
};
