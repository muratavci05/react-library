import React,{useEffect,useState} from "react";

import Header from "../components/Header";

import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";

const EditBook = (props)=> {
    const params = useParams();
    const navigate=useNavigate("");
    console.log("param", params);

const [bookname,setBookname]=useState();
const [author,setAuthor]=useState("");
const [isbn,setIsbn]=useState("");
const [category,setCategory]=useState("");
const [categories,setCategories]=useState(null);


    useEffect(()=>{
        axios
        .get(`http://localhost:3004/books/${params.bookId}`)
        .then(res=>{
            console.log(res.data);
            setBookname(res.data.name);
            setAuthor(res.data.author);
            setIsbn(res.data.isbn);
            setCategory(res.data.categoryId);
            axios
            .get("http://localhost:3004/categories")
            .then ((res) => {
                setCategories(res.data);
            })
            .catch((err) => console.log("categories err", err));
        })
        .catch(err=>console.log(err));
    },[]);

  //update için boş bırakılamaz olan yerlerin uyarısı
  //id,nam,author,categoryId,isbn nin update için dahil edilmesi  

const handleSubmit=(event)=>{
    event.preventDefault();
    if (bookname === "" || author === "" || category === ""){
        alert("itap Adı, Kitap Yazarı ve Kategori alanları boş bırakılamaz")
        return;
    }
const updateBook={
    id: params.kitapId,
    name: bookname,
    author: author,
    categoryId: category,
    isbn: isbn,
};
console.log("updateBook", updateBook);
axios
.put(`http://localhost:3004/books/${params.bookId}`,updateBook)
.then((res)=>{
    console.log(res);
    navigate("/");
})
.catch((err)=>console.log("edit err", err));

};

if (categories === null){
    return <Loading />;
}

    return(
        <div>
            <Header/>
            <div className="container my-5">
            <form onSubmit={handleSubmit} className="container my-5">
            <div className="row">
                <div className="col">
                    <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Kitap Adı" 
                    value={bookname}
                    onChange={(event)=>setBookname(event.target.value)}
                    />
                </div>
                <div className="col">
                    <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Kitap Yazarı" 
                    value={author}
                    onChange={(event)=>setAuthor(event.target.value)}
                    />
                </div>
            </div>    
               <div className="row my-5">
                    <div className="col">
                        <input 
                        type="text" 
                        className="form-control" 
                        placeholder="ISBN" 
                        value={isbn}
                        onChange={(event)=>setIsbn(event.target.value)}
                        />
                    </div>
                    
                     <div className="col" >                        
                        <select className="form-select"
                        value={category}
                        onChange={(event)=>setCategory(event.target.value)}> 
                        <option value={""} selected>Kategori Seçiniz</option>           
                        {
                            categories.map((cat) => {
                                return <option value={cat.id}>{cat.name}</option>
                            })}
                        </select>
                    </div>
                </div>
                
                         

                    <div className="d-flex justify-content-center">
                        <button onClick={()=> navigate("/")} 
                        type="button" 
                        className="btn btn-danger w-25 mx-2 ">
                           Vazgeç</button>
                   
                         <button type="submit" className="btn btn-primary w-25 ">
                            Kaydet</button>
                    </div>
               
            </form>
        </div>


        </div>
    );
};

export default EditBook;