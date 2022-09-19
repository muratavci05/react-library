import React from "react";

const Modal = (props)=>{
    const {onCancel,onConfirm,title,aciklama}=props

    return(
        <button onClick={onCancel} //onclick kısmı sadece modal ekrana tıkladığında kaybolsun diye eklendi
        style={{
            position:"absolute",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor:"rgba(0,0,0,0.3)",
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            cursor: "default",  //ana kapsayıcı div den buttona çevirince ekrandaki cursoru default yaptık, onclick işleminin devamına ait
            }}>
                 <div style={{
                    width: "50%",
                    padding: "20px",
                    backgroundColor:"#fff",
                    borderRadius:"5px",
                    
                    }}> 
                    <h1 className="text-center">{title} </h1>

                    <p className="text-center">{aciklama}</p>

                    <div className="d-flex justify-content-center">
                        <button onClick={onCancel} 
                        className="btn btn-sm btn-outline-danger mx-3">Close</button>
                        <button onClick={onConfirm} //tanımlanan fonksiyon workToBeDone
                        className="btn btn-sm btn-outline-primary">Confirm</button>
                    </div>
                </div>
            </button> // dilersen button kısmını div de yapabilirsin, onclick ve cursoru: defaultu kaldır
        

    );
};

export default Modal;