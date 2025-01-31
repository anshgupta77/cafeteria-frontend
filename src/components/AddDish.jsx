import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setLoading, removeLoading } from "../Slices/AuthSlice";
import { addDish } from "../Slices/DishSlice";
import { CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";

const AddDish = ({ onClose }) => {
  const dispatch = useDispatch();
  const counterId = useParams().id;
  const [newDish, setNewDish] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    counter: counterId,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDish({ ...newDish, [name]: value });
  };

  const handleAddDish = () => {
    dispatch(setLoading());
    axios
      .post("http://localhost:3000/dish", newDish)
      .then((response) => {
        console.log("New dish added:", response.data);
        dispatch(addDish(response.data.dish)); // Update the Redux store with new dishes
         // Close the modal
      })
      .catch((error) => {
        console.error("Error adding dish:", error);
      })
      .finally(() => {
        onClose();
        dispatch(removeLoading());
      });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Darkened Background */}
      <div
        className="absolute inset-0 bg-gray-400 opacity-50"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="fixed bg-white p-6 rounded-lg shadow-lg w-96 z-10">
        <h2 className="text-xl font-bold mb-4">Add New Dish</h2>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={newDish.name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={newDish.description}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Price
          </label>
          <input
            type="number"
            name="price"
            value={newDish.price}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

         <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
            Image
        </label>
        <input
            type="text"
            name="image"
            value={newDish.imageUrl}
            onChange={(e) => setNewDish({ ...newDish, image: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Category
          </label>
          <input
            type="text"
            name="category"
            value={newDish.category}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleAddDish}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};


export default AddDish;