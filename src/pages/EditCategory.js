import React,{useEffect,useState} from "react";
import Header from "../components/Header";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";
import { useDispatch, useSelector } from "react-redux";


const EditCategory = (props)=>{

    const [categoryName,setCategoryName]=useState("");

    const params=useParams();
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const {categoriesState} = useSelector ((state)=>state);
    console.log(categoriesState);  


    useEffect(()=>{
         console.log(categoriesState.categories,params.categoryId);
        const searchCategory = categoriesState.categories.find(
            (item) => item.id == params.categoryId);
           if (searchCategory === undefined){
                navigate("/categories");
                return;
            }
            console.log(searchCategory);
            setCategoryName(searchCategory.name);

        /* axios
             .get(`http://localhost:3004/categories/${params.categoryId}`)
             .then((res)=>{
                console.log("params", res.data);
                setCategoryName(res.data.name)
             })
             .catch((err) => console.log(err)); */

             document.title = `Library - Edit Category - ${searchCategory.name}`;
    },[]);



    const categorySubmit=(event)=>{
       event.preventDefault();

       
       if(categoryName === ""){
        alert ("Kategori Alanı Boş Olarak Güncellenemez !!!");
        return;
       }
       //var olan kategori isminde bir güncelleme yapılamaz >>
       const hasCategory = categoriesState.categories.find(
        (item) => item.name.toLowerCase() === categoryName.toLowerCase());
         console.log(hasCategory);

        if(hasCategory !== undefined){
        alert("Böyle Bir *** Kategori İsmi *** Tanımlanmış");
        setCategoryName("");

        return;
         }
         //<<<

       const updateCategory={
            id: Number(params.categoryId),
            name:categoryName[0].toUpperCase()+categoryName.substring(1),   // ilk harfi büyük yazılması için 
       };
       console.log("updateCategory", updateCategory);
       axios
            .put(`http://localhost:3004/categories/${params.categoryId}`,updateCategory)
            .then((res)=>{
                console.log(res.data);
                
                dispatch ({type: "EDIT_CATEGORIES", payload: updateCategory});
                setCategoryName("");
                navigate("/categories");
            })
            .catch((err) => console.log("Category Edit Error", err));
    };

    if (categoriesState === null){
        return <Loading />;
    }

    

    return(
        <div>
            <Header/>
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
                            Güncelle</button>
                    </div>
               
            </form>
        </div>
        </div>    
    )
};

export default EditCategory;