import React,{useEffect,useState} from "react";

import Header from "../components/Header";

import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";
import Modal from "../components/Modal";
import { useSelector,useDispatch } from "react-redux";   //to be subscribe




const EditBook = (props)=> {

    const dispatch = useDispatch();

    const {categoriesState,booksState}=useSelector((state)=>state); 
    console.log(booksState);    //to be subcribe
    
    const params = useParams();
    const navigate=useNavigate();
    console.log("param", params);

const [bookname,setBookname]=useState("");
const [author,setAuthor]=useState("");
const [isbn,setIsbn]=useState("");
const [category,setCategory]=useState("");
//const [categories,setCategories]=useState(null);
const [showModal,setShowModal]=useState(false);


    useEffect(()=>{
        console.log(booksState.books, params.bookId);
        const searchBook = booksState.books.find(
            (item) => item.id == params.bookId);

            if (searchBook === undefined) {
                navigate("/");
                return;
                
            }

            console.log(searchBook);
            setBookname(searchBook.name);
            setAuthor(searchBook.author);
            setIsbn(searchBook.isbn);
            setCategory(searchBook.categoryId);

        /* axios
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
        .catch(err=>console.log(err)); */
    document.title = `Library - Edit Library - ${searchBook.name}`;    
    },[]);

  //update için boş bırakılamaz olan yerlerin uyarısı
  //id,nam,author,categoryId,isbn nin update için dahil edilmesi  

const handleSubmit=(event)=>{
    event.preventDefault();
    setShowModal(true); //modal aç demek 
    

};


//handdlesubmite bu modal işlemi show etmek ve kayıt işlemi başlangıç

const editBook=()=>{

    if (bookname === "" || author === "" || category === ""){
        alert("Kitap Adı, Kitap Yazarı ve Kategori alanları boş bırakılamaz")
        return;
    }
const updateBook={
    id: Number(params.bookId),
    //id: params.bookId,
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
    dispatch({type: "EDIT_BOOK", payload: updateBook});  //EDIT_BOOK isimli bir durum çalışsın, oraya "updateBook" bir parametre gönderdim, 
                                                        //bu parametreyi statenin içinde ki kitaplardan çıkar güncel halini yerine yaz..
    
    setShowModal(false);  //anasayfaya yönlendirme işlemi öncesi modal kapanması için
    navigate("/");  //anasayfaya yönlendirme işlemi
    
})
.catch((err)=>console.log("edit err", err));
}

//show ve kayıt işlemi bitiş

if (categoriesState.success !== true || booksState.success !== true){
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

                        {categoriesState.categories.map((cat) => {
                                return (<option key={cat.id} value={cat.id}>
                                    {cat.name}
                                
                                </option>
                                );
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
        
            { 
                showModal === true && (                //edit kısmının modal eklenmesi işlemi
                    <Modal 
                    title="Book Update"
                    aciklama={`${bookname} "Confirm to update your book"`}
                    //aciklama="Kaydetmek için onaylayın"
                    onCancel={()=>setShowModal(false)}  //iptal et derse buraya gelecek
                    onConfirm={()=>editBook()}/> //confirm'e tıklayında onaylayıp anasayfaya yönlendirme bu fonksiyon çalışsın 
                )
            }

        </div>
    );
};

export default EditBook;