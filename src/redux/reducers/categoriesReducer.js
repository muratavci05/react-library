


const initialState = {
    start: false,
    success:false,
    categories:[],
    fail: false,
    errorMessage: "",

}

const categoriesReducer = (state = initialState,action) =>{
    switch(action.type){
        case "FETCH_CATEGORIES_START":
            return{
                ...state,
                start:true,
            }
        default:
        return state;
    }
};

export default categoriesReducer;

//özet açıklama

// categoriesReducer in başlangıç state initialState olsun, üst kısımda tanımlanan başlangıç state...
// switch case yapısı ile bir döngü oluşturarak, gelen "actionun" type na bakacak
// gelen type (case) fetch_categories_start ise
// (sprint operatör)...state ile üstte initialState olarak tanımlanan state tamamını alacak
//start:true olarak çekip değiştirecek...
//gelen type gelen case lerden hiç birine uymuyor ise default:state ile..gelen staten kendine döndürecek