import React, { useEffect,useState } from "react";
import { useSelector, useDispatch } from "react-redux"; //for subscribe 
import Loading from "./Loading";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";


const ListCategories =(props)=>{
    const dispatch=useDispatch();
    const { categoriesState, booksState } = useSelector ((state)=> state);   //kategorileri çekmek için 
    console.log ("catState",categoriesState);
    console.log ("booksState", booksState);
    
    const [catUpdate,setCatUpdate]=useState(false);
    const navigate=useNavigate();

    const [showDeleteModal,setShowDeleteModal] = useState (false);
    const [delCategory,setDelCategory]=useState(null);
    const [delCategoryName,setDelCategoryName]=useState("");

    useEffect(()=> {
        document.title = "Library - Kategoriler";
    },[catUpdate]); 

 
    const deleteCategory = (id) => {
        console.log(`http://localhost:3004/categories/${id}`);
        axios
        .delete(`http://localhost:3004/categories/${id}`)
        .then((res)=>{
            console.log("delete res", res.data);
            dispatch({type: "DELETE_CATEGORIES",payload:id})
            const booksHasCategory = booksState.books.filter(
                (item) => item.categoryId == id  );
                console.log("booksHasCategory", booksHasCategory)
                booksHasCategory.map((item)=>dispatch({type:"DELETE_BOOK",payload:item.id}));
          
            navigate("/categories");
            


        })
        .catch((err)=>console.log("deleteCategoryErr", err));
        };
        
        if(categoriesState.success !== true) {     // eğer kategori çekme işlemi esnasında bir durum olursa gecikme vs.. loading çalışsın
            return <Loading />;
    }

    
   

    return(
        <div className="container my-5">
   
    
    <div className="my-3 d-flex justify-content-end">  
        <Link to="/add-category" className="btn btn-primary">Kategori Ekle</Link>
    </div>

    


<table className="table">
  


  <thead> 
    <tr >
      <th scope="col">Kategori Adı</th>
      <th className="text-center"scope="col">Islem</th>

    </tr>
  </thead>
  
  <tbody>
        
        {categoriesState.categories.map((category) => {
           
                return(
                    <tr key={category.id}>
                        <td>{category.name}</td>
                        
                        
                        <td className="text-center">
                            <div className="btn-group" role="group" >

                            <button type="button" 
                            className="btn btn-outline-danger btn-sm" 
                            onClick={()=>{/* deleteCategory(category.id) */
                               setShowDeleteModal(true);
                               setDelCategory(category.id);
                               setDelCategoryName(category.name);

                            }}>
                        Delete</button>

                        { <Link to={`/edit-category/${category.id}`} 
                        className="btn btn-sm btn-outline-secondary">
                            Edit</Link>
                             }
                            </div>
                        </td>
                    </tr>
                );
            })}
  </tbody>
</table>
{showDeleteModal === true && (
<Modal
            aciklama={`Are you sure you want to delete?`}
            title={delCategoryName}
            onConfirm={()=> deleteCategory (delCategory)}
            onCancel={()=> setShowDeleteModal(false)}
        />)}
        
</div>

    );
};

export default ListCategories;