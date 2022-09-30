import React,{useState,useEffect} from "react";
import axios from "axios";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";



const AddCategoryForm = (props)=>{
    const dispatch=useDispatch();
    const navigate = useNavigate();
    const [categoryName,setCategoryName]=useState("");
    
    
                                //categoryId için benzersiz id tanımlaması yapıldı

    const categoryId=new Date().getTime();
    //const categoryId2=new Date().getTime();
    const categorySubmit =(event)=>{
        event.preventDefault();
        
    //console.log("new category", categoryName)


                                //newCategory ile category id ve name yapısını oluşturdum
    const newCategory ={
    //id:categoryId1+categoryId2,
    id: categoryId-1600000000000,
    name: categoryName,
    };
    console.log(newCategory);

                                //kategori kısmına boş kaydet denildğinde uyarı  vermesi için
    if (categoryName === ""){
        alert ("Boş Kategori Oluşturulamaz");
        return ;
    };


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

    

    if (categoryName === setCategoryName.res){
        alert ("Bu Kategori Tanımlanmış, Tekrar Oluşturulamaz");
        return;
    }

    

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