const initialState={
    start: false,
    success: false,
    books:[],
    fail: false,
    errorMessage: "",

}

const booksReducer = (state=initialState,action)=>{
    switch (action.type) {
        case "FETCH_BOOKS_START":
            return{
                ...state,
                start: true,

            };

        case "FETCH_BOOKS_SUCCESS":
            return{
                ...state,
                start: false,
                success: true,
                books: action.payload,

            };

        case "FETCH_BOOKS_FAIL":
            return{
                ...state,
                start: false,
                fail: true,
                errorMessage: action.payload,
            };

        case "ADD_BOOK":
            return{
                ...state,
                books:[...state.books, action.payload],
            }; 
        
        case "DELETE_BOOK":
            const filteredBooks = state.books.filter((item)=>item.id !== action.payload)

            return{
                ...state,
                books: filteredBooks
            };

        case "EDIT_BOOK":
        // 1. güncellenecek kitabın o anki halini diziden çıkart
        // 2. güncel halini diziye ekle,
        // not: filteredBooks yazınca yukarda da olduğu için kızdı (hata verdi), demekki bu case ler birbirini görüyorlar, buna skorp denir.
        // not devamı...o nedenle filteredBookEdit olarak adını değiştirdim.
        // aşağıdaki kodun açıklaması:
        // a. öncelikle filtreleme işlemi yapmak için (delete olduğu gibi)
        // b. filteredBooksEdit "bu statenin içinde ki bookstan bir filter işlemi yapacağız"
        // c. ve bu itemin id si  eşit olmayanları filtreleyip bu dizininin içine koy...payload içinde ki id nin tanımlı olan kitapları
        // d. action.payload'nda gönderdiğim kitabın "ID" göre bir filtreleme yaptım, onu bu dizinden çıkartmış oldum.

        const filteredBooksEdit = state.books.filter((item) => item.id !== action.payload.id);

        return{
            ...state, //bütün state yi geç
            books:[...filteredBooksEdit, action.payload],  //ve bunun içindeki kitaplar şu şekilde olsun, ve action'un payload'ında gelen kitabı ekle
        };

           
    
        default:
            return state;
    }

};

export default booksReducer;
