import React from "react";
import Home from "./pages/Home";
import {
  BrowserRouter,  //sayfalama ile genel yetenekleri sağlıyor
  Routes,         //içerisine routerları (yolları) yazmamızı sağlıyor
  Route,          //hangi grupta hangi component render olacak şeklinde sistem sağlıyor
} from "react-router-dom";

import AddBook from "./pages/AddBook";
import AddBookForm from "./components/AddBookForm";





function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/add-book" element={<AddBook />}/>
          <Route path="/AddBookform" element={<AddBookForm/>}/>
      </Routes>
  </BrowserRouter>
  );
}

export default App;
