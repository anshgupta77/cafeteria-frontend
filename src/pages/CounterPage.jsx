import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCounter } from "../Slices/CounterSlice";
import CounterCard from "../components/Cards/CounterCard";
import { setLoading, removeLoading } from "../Slices/UserSlice";
import { CircularProgress } from "@mui/material";
import { useRequestCall } from "../hook";
import { Link } from "react-router-dom";
const CounterPage = () => {
    const dispatch = useDispatch();
    const counter = useSelector(state => state.counter.items);
    const loading = useSelector(state => state.user.loading);
    const [callingRequest] = useRequestCall("get");
    console.log(counter);
    useEffect(() =>{
        callingRequest("http://localhost:3000/counter")
            .then(response => {
                console.log(response);
                dispatch(setCounter(response.data.counters))
            })
    }, [])

    return ( 
        <div>
            {loading && (
            <div className="absolute inset-0 flex justify-center items-center bg-opacity-50 z-50">
                <CircularProgress />
            </div>
            )}
            <CounterCard counterData={counter}/>
        </div>
     );
}
 
export default CounterPage;


