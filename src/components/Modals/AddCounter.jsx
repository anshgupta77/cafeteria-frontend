import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../Slices/UserSlice";
import { addCounter } from "../../Slices/CounterSlice";
import { useSelect } from "@chakra-ui/react";
import { useRequestCall } from "../../hook";
import { notifySuccess } from "../../App";

const AddCounter = ({ onClose, setLoading }) => {
    const [name, setName] = useState("");
    const [merchant, setMerchant] = useState("");
    // const [search, setSearch] = useState("");
    const users = useSelector(state => state.user.items);
    const [callingGetRequest] = useRequestCall("get");
    const [callingPostRequest] = useRequestCall("post");
    const [showDropdown, setShowDropdown] = useState(false);
    const dispatch = useDispatch();
    const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        setLoading(true);
        callingGetRequest(`${VITE_BACKEND_URL}/user`) 
            .then(response => {
                console.log(response);
                console.log(response?.data?.users || []);
                dispatch(setUser(response.data.users)); // Assuming the response contains users data
            }).catch(error => {
                console.error("Error fetching users:", error);
            }).finally(() => {
                setLoading(false);
            });

            return () => {  
                dispatch(setUser([]));
            }
    }, []);




    const handleSubmit = (e) => {
        e.preventDefault();
        callingPostRequest(`${VITE_BACKEND_URL}/counter`, { name : name, merchants: [merchant._id]})
            .then(response => {
                console.log("Counter added:", response?.data?.counter || {});
                dispatch(addCounter( response?.data?.counter))
                notifySuccess("Counter added successfully");
            })
            .catch(error => {
                console.error("Error adding counter:", error);
            }).finally(() => {
                onClose();
            });
    };

    return (
        <div className="fixed inset-0 flex justify-center items-center z-50">
            {/* Light transparent background */}
            <div className="absolute inset-0 bg-gray-200 opacity-50" onClick={onClose}></div>

            {/* White Form */}
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
                <h2 className="text-xl font-bold mb-4">Add New Counter</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Counter Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                            required
                        />
                    </div>
                    <div className="mb-4 relative">
                        <label className="block text-gray-700">Merchant</label>
                        <input
                            type="text"
                            value={merchant.username}
                            onClick={(e) => {
                                // setSearch(e.target.value);
                                setShowDropdown(true);
                            }}
                            onChange={(e) => {
                                setMerchant(e.target.value);
                                // setSearch(e.target.value);
                                setShowDropdown(true);
                            }}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                            required
                            placeholder="Search Merchant..."
                        />
                        {/* Dropdown for search results */}
                        {showDropdown && users.length > 0 && (
                            <ul className="absolute w-full border bg-white rounded-lg shadow-lg mt-1 max-h-40 overflow-y-auto">
                                {users.map((user) => (
                                    <li
                                        key={user._id}
                                        className="px-3 py-2 cursor-pointer bg-white text-black hover:bg-gray-100"
                                        onClick={() => {
                                            console.log("User in the dropdown", user)
                                            setMerchant(user);
                                            setShowDropdown(false);
                                        }}
                                    >
                                        {user.username}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div className="flex justify-between">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-[#0a830a] text-white rounded-lg hover:bg-green-700"
                        >
                            Add Counter
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddCounter;
