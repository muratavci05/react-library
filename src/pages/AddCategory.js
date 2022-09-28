import React, { useEffect } from "react";
import AddCategoryForm from "../components/AddCategoryForm";
import Header from "../components/Header";

const AddCategory = (props)=>{

    useEffect (()=>{
        document.title = "Library - Kategori Ekle";
    })

    return(
        <div>
            <Header />
            <h1>Kategori Ekle</h1>
            <AddCategoryForm />
            
        </div>
    );
};

export default AddCategory;