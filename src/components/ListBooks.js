import React,{useEffect,useState} from "react";
import axios, { Axios } from "axios";
import Loading from "./Loading";
import { Link } from "react-router-dom";

import Modal from "./Modal";



const ListBooks=(props)=>{
    const [books,setBooks]=useState(null);
    const [categories,setCategories]=useState(null);
    const [didUpdate,setDidUpdate]=useState(false);
    const [showModal,setShowModal]=useState(false);  //başlangıç olarak modal gözükmesin diye 
    const [bookToBeDelete,setBookToBeDelete]=useState(null);  //silinecek kitabı tutan state
    const [deleteBookName,setDeleteBookName]=useState("");

    useEffect(()=>{
        axios
        .get("http://localhost:3004/books")
        .then((resBook) => {
            console.log(resBook);
            setBooks(resBook.data);
            setShowModal(false); //modal işlemi confirm olunca kendiliğinden kapatmak için
            
            axios
            .get("http://localhost:3004/categories")
            .then((resCat) => {
                setTimeout(() =>{
                    setCategories(resCat.data);
                }, 300);
                
            })
            .catch((err) => console.log("categories err", err));
        })
        .catch((err)=> console.log("books err", err));

    },[didUpdate]);

    const deleteBook=(id)=>{
        console.log(`http://localhost:3004/books/${id}`);
        axios.delete(`http://localhost:3004/books/${id}`)
        .then((res) => {
            console.log("delete res", res);
            setDidUpdate(!didUpdate);
        })
        .catch((err) => console.log(err));
    };


    if (books === null || categories === null) {
        return (
            <div><Loading /></div>
        );
    }

    return(

<div className="container my-5">
   
    
    <div className="my-3 d-flex justify-content-end">  
        <Link to="/add-book" className="btn btn-primary">Kitap Ekle</Link>
    </div>


<table className="table">
  


  <thead> 
    <tr>
      <th scope="col">Kitap Adı</th>
      <th scope="col">Yazar</th>
      <th scope="col">Kategori</th>
      <th className="text-center" scope="col">ISBN</th>
      <th scope="col">Islem</th>

    </tr>
  </thead>
  
  <tbody>
        
        {books.map((book) => {
           const category = categories.find(
            (cat) =>
           cat.id === book.categoryId);
           
                return(
                    <tr key={book.id}>
                        <td>{book.name}</td>
                        <td>{book.author}</td>
                        <td>{category?.name}</td>
                        <td className="text-center">{book.isbn === "" ? "-": book.isbn}</td>
                        <td>
                            <div className="btn-group" role="group" >
                            <button type="button" 
                            className="btn btn-outline btn-danger btn-sm" 
                            onClick={()=>{
                                setShowModal(true);  //modal kuralı.."buradaki modal'ı göster"
                                setBookToBeDelete(book.id) // hangi kitabı silecek, id si belli olan
                                //deleteBook(book.id)
                                setDeleteBookName(book.name); //modal da silinecek kitap ismi çıkması için
                            }}>
                        Delete</button>

                        <Link to={`edit-book/${book.id}`} 
                        className="btn btn-sm btn-outline-secondary">
                            Edit</Link>
                            
                            </div>
                        </td>
                    </tr>
                );
            })}
  </tbody>
</table>

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


</div>
    );
};

export default ListBooks;