import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

//react-redux kütüphanesi içinde özel yetenekli bir compnent var "provider" 
// görevi bu storu bütün uygulamaya sarabilmek

import { Provider } from 'react-redux';
import store from './redux/store';  //provider ile saracağı storum...

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>  
      <App />
    </Provider>
    
  </React.StrictMode>
);


//* provider "store" isimli bir props alıyor onuda kullanacağımız store veriyoruz.
// artık istediğimiz componentten burada ki state ulaşabiliriz.
//redux un reacta entegrasyonu bu şekilde (subscribe olmak)
