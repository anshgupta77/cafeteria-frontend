import React, { useState } from "react";
import { Link } from "react-router-dom";
import EditCounterModal from "../Modals/EditCounter";
import editImage from "../../assets/editImage.png";
import deleteImage from "../../assets/delete.png";
import { useDispatch } from "react-redux";
// import {setLoading, removeLoading } from "../../Slices/UserSlice";
import axios from "axios";
import { deleteCounter } from "../../Slices/CounterSlice";
import { useRequestCall } from "../../hook";
import { notifySuccess } from "../../App";

const ManageCounterCard = ({ counterData }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCounter, setSelectedCounter] = useState(null);
  const [callingRequest] = useRequestCall("delete");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const handleEditClick = (counter) => {
    setSelectedCounter(counter);
    setShowEditModal(true);
  };

  const handleDeleteClick = (counter) => {
    setLoading(true);
    callingRequest(`${VITE_BACKEND_URL}/counter/${counter._id}`)
    .then(response => {
        console.log(response?.data);
        dispatch(deleteCounter(response?.data?.counter || {}));
        notifySuccess("Counter deleted successfully");
        }
    ).catch(error => {
        console.error("Error deleting counter:", error);
    }).finally(() => {
        setLoading(false);
    });
}

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {counterData.map((counter) => (
        <div
          key={counter._id}
          className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition flex flex-col gap-4"
        >
          {/* Top section with title and actions */}
          <div className="flex justify-between items-center">
            {/* Counter Name */}
              <h2 className="text-xl font-bold text-gray-800 hover:underline">
                {counter.name}
              </h2>
    

            {/* Edit & Delete Buttons */}
            <div className="flex items-center space-x-3">
              <img
                src={editImage}
                alt="Edit"
                onClick={() => handleEditClick(counter)}
                className="w-5 h-5 cursor-pointer hover:opacity-75"
              />
              <img
                src={deleteImage}
                alt="Delete"
                onClick={() => handleDeleteClick(counter)}
                className="w-5 h-5 cursor-pointer hover:opacity-75"
              />
            </div>
          </div>

          {/* Owned By Section */}
          <div className="mt-2">
            
              <h3 className="text-lg font-semibold text-gray-700">Owned by:</h3>

            <ol className="list-disc list-inside mt-2 space-y-1">
              {counter.merchants && counter.merchants.length > 0 ? (
                counter.merchants.map((merchant) => (
                  <li
                    key={merchant._id}
                    className="text-gray-600 text-sm font-medium"
                  >
                    {merchant.username}
                  </li>
                ))
              ) : (
                <li className="text-gray-500 text-sm">No merchants assigned</li>
              )}
            </ol>
          </div>
        </div>
      ))}

      {/* Edit Counter Modal */}
      {showEditModal && selectedCounter && (
        <EditCounterModal
          counter={selectedCounter}
          onClose={() => setShowEditModal(false)}
          setLoading={setLoading}
        />
      )}
    </div>
  );
};

export default ManageCounterCard;
