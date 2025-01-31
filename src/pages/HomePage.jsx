import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCounter } from "../Slices/CounterSlice";
import CounterCard from "../components/CounterCard";
import { Link } from "react-router-dom";
import Carousel from "../components/Carousel";
import Scope from "../components/Scope";
import Brand from "../components/Brand";
import WeOffer from "../components/WeOffer";
// import { CircularProgress } from "@mui/material";
const HomePage = () => {
    return ( 
        <div className="" style={{ fontFamily: "'Poppins', sans-serif" }}>
            {/* <CircularProgress /> */}
            <Carousel />
            <Scope />
            <Brand/>
            <WeOffer/>
        </div>
     );
}
 
export default HomePage;
