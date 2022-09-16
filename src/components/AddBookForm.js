import React,{useEffect,useState} from "react";
import axios from "axios";
import Loading from "./Loading";


const AddBookForm =(props)=>{
    const [categories,setCategories]=useState(null);
    const [bookname,setBookname]=useState("");
    const [author,setAuthor]=useState("");
    const [isbn,setIsbn]=useState("");
    const [category,setCategory]=useState("");
    
    useEffect(()=>{
        axios
        .get("http://localhost:3004/categories")
        .then((res) => {
            console.log(res);
            setCategories(res.data);
        })
        .catch((err) => console.log(err));


    },[]);

    const handleSubmit=(event)=>{
        event.preventDefault();
        if (bookname === "" || author === "" || category === ""){
            alert("Kitap Adı, Kitap Yazarı ve Kategori alanları boş bırakılamaz");
        return;
        }
        const newBook ={
            id: new Date().getTime(),
            name: bookname,
            author: author,
            isbn: isbn,
            category: category
        }
        console.log(newBook);

    }

    if (categories === null ) {
        return <Loading />
    }


    return(
       //form & kaydet 
       <div classNameName="container my-5">
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
                    
                     <div className="col">
                        
                        <select 
                        class="form-select"
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
                         <button type="submit" className="btn btn-primary w-50 ">
                            Kaydet</button>
                    </div>
               
            </form>
        </div>
        
    );
};

export default AddBookForm;