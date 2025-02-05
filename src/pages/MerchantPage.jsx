import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCounter } from "../Slices/CounterSlice";
import MerchantCounterCard from "../components/Cards/MerchantCounterCard";
// import { setLoading, removeLoading } from "../Slices/UserSlice";
import { CircularProgress } from "@mui/material";
import AddCounter from "../components/Modals/AddCounter";
import { useRequestCall } from "../hook"; // Import the AddCounter component

const MerchantPage = () => {
    const dispatch = useDispatch();
    const counter = useSelector(state => state.counter.items);
    const loading = useSelector(state => state.user.loading);
    const merchant = useSelector(state => state.auth.currentUser);
    const [isAddCounterOpen, setIsAddCounterOpen] = useState(false);
   const [callingRequest] = useRequestCall("get");  // State to control AddCounter modal
    const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    useEffect(() => {
        callingRequest(`${VITE_BACKEND_URL}/counter/merchantpanel`)
            .then(response => {
                console.log(response);
                dispatch(setCounter(response?.data?.counters || []));
            })
            return () => {
                dispatch(setCounter([]));
            }
    }, []);

    return (
        <div className="p-6 min-h-[80vh] bg-gray-100">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 text-center flex-grow">
                    Merchant panel
                </h1>
            </div>

            {/* Add Counter Modal */}
           

            {/* <ManageCounterCard counterData={counter} /> */}
            {loading ? (
                <div className="absolute inset-0 flex justify-center items-center bg-opacity-50 z-50">
                    <CircularProgress />
                </div>
            ) : (
                <MerchantCounterCard counterData={counter} />
            )}
        </div>
    );
};

export default MerchantPage;
