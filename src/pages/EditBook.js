import React,{useEffect,useState} from "react";

import Header from "../components/Header";

import { useParams } from "react-router-dom";
import axios from "axios";

const EditBook = (props)=> {
    const params = useParams();
    console.log("param", params);

    useEffect(()=>{
        axios
        .get(`http://localhost:3004/books/${params.bookId}`)
        .then(res=>{
            console.log(res)
        })
        .catch(err=>console.log(err));
    },[]);

    return(
        <div>
            <Header/>
            <h1>Edit Book</h1>


        </div>
    );
};

export default EditBook;