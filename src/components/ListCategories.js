import React, { useEffect } from "react";
import { useSelector } from "react-redux"; //for subscribe 
import Loading from "./Loading";
import { Link } from "react-router-dom";

const ListCategories =()=>{
    const { categoriesState } = useSelector ((state)=> state);   //kategorileri çekmek için 
    console.log ("catState",categoriesState);

    useEffect(()=> {
        document.title = "Library - Kategoriler";
    });

    if(categoriesState.success !== true) {     // eğer kategori çekme işlemi esnasında bir durum olursa gecikme vs.. loading çalışsın
        return <Loading />
    };

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
                            onClick={()=>{
                               /*  setShowModal(true);  //modal kuralı.."buradaki modal'ı göster"
                                setBookToBeDelete(book.id) // hangi kitabı silecek, id si belli olan
                                //deleteBook(book.id)
                                setDeleteBookName(book.name); //modal da silinecek kitap ismi çıkması için */
                            }}>
                        Delete</button>

                        { <Link to={`edit-category/${category.id}`} 
                        className="btn btn-sm btn-outline-secondary">
                            Edit</Link>
                             }
                            </div>
                        </td>
                    </tr>
                );
            })}
  </tbody>
</table>{/* 

{
     showModal === true && (
    
    <Modal 
    //aciklama={`${deleteBookName} "- Are you sure you want to delete?"`} 
    aciklama="Are you sure you want to delete?"
    title={deleteBookName}
    //title={"Deletion Process"}
    onConfirm={()=>deleteBook(bookToBeDelete)} 
    onCancel= {()=> setShowModal(false)}/>  // generic bir modal..istenilen yerde kullanılabilir
)}

 */}
</div>

    );
};

export default ListCategories;