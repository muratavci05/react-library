import React,{useState,useEffect} from "react";
import axios from "axios";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";



const AddCategoryForm = (props)=>{
    const dispatch=useDispatch();
    const navigate = useNavigate();
    const [categoryName,setCategoryName]=useState("");
    const { categoriesState} = useSelector ((state) => state);
    console.log("Categories State", categoriesState);

    
    
                               //categoryId için benzersiz id tanımlaması yapıldı

    const categoryId=new Date().getTime();
    //const categoryId2=new Date().getTime();
    const categorySubmit =(event)=>{
        event.preventDefault();
        
    //console.log("new category", categoryName)


                                

                                //kategori kısmına boş kaydet denildğinde uyarı  vermesi için
    if (categoryName === ""){
        alert ("Boş Kategori Oluşturulamaz");
        return ;
    };

    const hasCategory = categoriesState.categories.find(
        (item) => item.name.toLowerCase() === categoryName.toLowerCase());
    console.log(hasCategory);

    if(hasCategory !== undefined){
        alert("Böyle Bir *** Kategori İsmi *** Tanımlanmış");
        setCategoryName("");

        return;
    }

    
    //newCategory ile category id ve name yapısını oluşturdum
    const newCategory ={
        //id:categoryId1+categoryId2,
        id: categoryId-1600000000000,
        name: categoryName[0].toUpperCase()+categoryName.substring(1),
        };
        console.log(newCategory);

                                // Yeni kategorinin veri tabanına (db.json) gönderilmesi (post edilmesi)

    axios
        .post("http://localhost:3004/categories", newCategory)
        .then((res)=>{
            console.log("New Categories res", res);
            dispatch({type: "ADD_CATEGORIES",payload: newCategory})
            setCategoryName("");
           
            navigate("/categories");


    })
        .catch((err)=>console.log(err))
    
    };    

    return(
        <div className="container my-5">
            <form  onSubmit={categorySubmit} className="container my-2">
            <div className="row">
                <div className="col">
                    <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Yeni Kategori Adı" 
                    value={categoryName}
                    onChange={(event)=>setCategoryName(event.target.value)}
                    />
                </div>               
                             
                     
                   
                </div>
                    <div className="d-flex justify-content-center my-3">
                         <button type="submit" className="btn btn-primary w-50 ">
                            Kaydet</button>
                    </div>
               
            </form>
        </div>
    );
};

export default AddCategoryForm;