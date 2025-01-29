// import React from "react";
// import { Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
// const ManageCounterCard = ({ counterData }) => {
//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
//       {/* Iterate through each counter */}
//       {counterData.map((counter) => (
//         <div
//           key={counter._id}
//           className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition"
//         >
//           {/* Counter Name */}
//           <Link to={`/dish/counter/${counter._id}`}>
//             <h2 className="text-xl font-bold text-gray-800 mb-4 hover:underline">
//               {counter.name}
//             </h2>
//           </Link>

//           {/* Merchants Section */}
//           <div className="mt-4 ">
//             <h3 className="text-lg font-semibold text-gray-700">Owned by:</h3>
//             <ol className="list-disc list-inside mt-2 space-y-1" type="1">
//               {counter.merchants && counter.merchants.length > 0 ? (
//                 counter.merchants.map((merchant) => (
//                   <li
//                     key={merchant._id}
//                     className="text-gray-600 text-sm font-medium "
//                   >
//                     {merchant.username}
//                   </li>
//                 ))
//               ) : (
//                 <li className="text-gray-500 text-sm">No merchants assigned</li>
//               )}
//             </ol>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ManageCounterCard;



import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import EditCounterModal from "./EditCounterModal";
import { Icon } from "lucide-react";
import editImage from "../assets/editImage.png";
const ManageCounterCard = ({ counterData }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCounter, setSelectedCounter] = useState(null);

  const handleEditClick = (counter) => {
    setSelectedCounter(counter);
    setShowEditModal(true);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {counterData.map((counter) => (
        <div
          key={counter._id}
          className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition flex justify-between"
        >
            <div>
          <Link to={`/dish/counter/${counter._id}`}>
            <h2 className="text-xl font-bold text-gray-800 mb-4 hover:underline">
              {counter.name}
            </h2>
          </Link>

          <div className="mt-4 ">
            <h3 className="text-lg font-semibold text-gray-700">Owned by:</h3>
            <ol className="list-disc list-inside mt-2 space-y-1" type="1">
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

          <div className="mt-4">
            <img src={editImage} alt="" onClick={() => handleEditClick(counter)} className="w-5 h-5 hover:border-2" />
          </div>
        </div>
      ))}

      {/* Edit Counter Modal */}
      {showEditModal && selectedCounter && (
        <EditCounterModal
          counter={selectedCounter}
          onClose={() => setShowEditModal(false)}
        />
      )}
    </div>
  );
};

export default ManageCounterCard;

