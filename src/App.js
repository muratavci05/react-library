import React, { useEffect } from "react";
import Home from "./pages/Home";
import {
  BrowserRouter,  //sayfalama ile genel yetenekleri sağlıyor
  Routes,         //içerisine routerları (yolları) yazmamızı sağlıyor
  Route,          //hangi grupta hangi component render olacak şeklinde sistem sağlıyor
} from "react-router-dom";

import AddBook from "./pages/AddBook";
import AddBookForm from "./components/AddBookForm";
import EditBook from "./pages/EditBook";
import CategoriesList from "./pages/CategoriesList";
import AddCategory from "./pages/AddCategory";

import {useDispatch} from "react-redux";   // 1.aşama react-redux fonksiyonu import ediyoruz 
import axios from "axios";

function App() {

  // categoriesReducer e ait dispatch kısmı başlangıç
  const dispatch = useDispatch();
  useEffect(()=>{ 

    //categories
    dispatch({
          type:"FETCH_CATEGORIES_START"});
    axios
      .get("http://localhost:3004/categories")
      .then((res)=>{
        dispatch({ 
          type: "FETCH_CATEGORIES_SUCCESS",
          payload: res.data});
      })
      .catch ((err)=>{
        dispatch({
          type: "FETCH_CATEGORIES_FAIL",
          payload: "Kategorileri cekerken bir hata olustu",
        });
       
      });
      //books
      dispatch({
        type: "FETCH_BOOKS_START"});
      axios
        .get("http://localhost:3004/books")
        .then ((res)=>{
          dispatch({
            type:"FETCH_BOOKS_SUCCESS", 
            payload: res.data});
        })
        .catch((err)=>{
          dispatch ({
            type: "FETCH_BOOKS_FAIL", 
            payload: "Kitapları Çekerken Bir Hata Oluştu",
          })
        });

  },[]);

  // categoriesReducer'e ait dispatch kısmı bitiş
//yukarının özeti:
//categorileri dispatch ediyoruz.
//axios'tan categorileri çekiyor dataları istiyoruz.
//eğer datalar gelirse then kısmı çalışıyor...
// dataların gelmesinde problem var ise catch kısmı çalışıyor dispatch error mesaj kısmı devreye giriyor.
// veri çekme işlemi çekilmiştir.useSelector (listBooks.js de gibi) ile kategorilerin hep güncel halini kullanacağım.


return(
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/add-book" element={<AddBook />} />
          <Route path="/edit-book/:bookId" element={<EditBook />} />
          <Route path="/AddBookform" element={<AddBookForm />} />
          <Route path="/categories" element={<CategoriesList />} />
          <Route path="/add-category" element={<AddCategory />} />
      </Routes>
  </BrowserRouter>
  );
};
 
export default App;
