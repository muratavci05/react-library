import categoriesReducer from "./reducers/categoriesReducer";
import {createStore,combineReducers} from "redux"

const rootReducer=combineReducers({
    categoriesState:categoriesReducer    
                                         
    
});


const store=createStore(rootReducer);

export default store;


//açıklama notlar
//categoriesState isimli bir statem var bununla iletişime geçecek olan da "categoriesReducer"
// bu işlemleri yapmak için de iki tane fonksiyonum var "createStore,combineReducers"
