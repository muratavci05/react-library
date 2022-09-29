
// Reducer 2 parametre alır, 1 tanesi "state", diğeri "action" 
//aşağıda initialState...başlangıç state'dir
// aşağıdaki başlangıç statenin yapısını ben belirliyorum.

const initialState = {
    start: false,
    success:false,
    categories:[],
    fail: false,
    errorMessage: "",

}

//categoriesReducer şeklinde sabir değişken tanımlayıp, 
//başlangıç statenin yapısını ben belirleyip belirlediğim state eşitliyorum(state=initialState ile)

//sonrasında gönderdiğim actionun yapısına göre süzgeç yapması için switch case kullandım...ŞU ŞEKİLDE....

const categoriesReducer = (state = initialState,action) =>{
    switch(action.type){
        case "FETCH_CATEGORIES_START":      //actionun type startsa state bu şekilde değişsin
            return{
                ...state,
                start:true,
            };
        case "FETCH_CATEGORIES_SUCCESS":    //success ise state mde şunlar olsun...
            return{
                ...state,
                start: false,
                success: true,
                categories: action.payload,

            };
        case "FETCH_CATEGORIES_FAIL":   // fail ise state mde bunlar olsun.
            return{
                ...state,
                start: false,
                fail: true,
                errorMessage: action.payload,
            };

        case "ADD_CATEGORIES":
            return{
                ...state,
                categories:[...state.categories, action.payload]

            };

        case "DELETE_CATEGORIES":
            
                
                const filteredCategories = state.categories.filter((item)=>item.id !== action.payload)

                return{
                    ...state,
                    categories: filteredCategories
            
            };

        
            

        default:
        return state;
    } 

    // if ile de şu şekilde yazılır
    // if yapısında çalışınca sırayla tek tek kontrol ederek ilerler bu nedenle daha fazla vakit kaybı ve yavaştır (switch case göre)

    /* if (action.type === "FETCH_CATEGORIES_START"){
        return {
            ...state,
            start: true,
        };
    }
    if (action.type === "FETCH_CATEGORIES_SUCCESS"){
        return{
            ...state,
            start: false,
            success: true,
            categories: action.payload,
        };
    }
    if (action.type === "FETCH_CATEGORIES_FAIL"){
        return{
            ...state,
            start: false,
            fail: true,
            errorMessage: action.payload,

        };
    }
    return state;  */
};



//özet açıklama

// categoriesReducer in başlangıç state initialState olsun, üst kısımda tanımlanan başlangıç state...
// switch case yapısı ile bir döngü oluşturarak, gelen "actionun" type na bakacak
// gelen type (case) fetch_categories_start ise
// (sprint operatör)...state ile üstte initialState olarak tanımlanan state tamamını alacak
//start:true olarak çekip değiştirecek...
//gelen type gelen case lerden hiç birine uymuyor ise default:state ile..gelen staten kendine döndürecek

export default categoriesReducer;