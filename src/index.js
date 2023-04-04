import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter,RouterProvider,} from "react-router-dom";
import Shop from './components/Shop/Shop';
import Home from './components/Layout/Home';
import Orders from './components/Orders/Orders';
import Inventory from './components/Inventory/Inventory';
import Login from './components/Login/Login';
import cartProductsLoader from './Loaders/cardProductsLoader';
import Checkout from './components/Checkout/Checkout';

const router =createBrowserRouter([
  {
    path:'/',
    element: <Home/>,
    children:[
      {
        path:'/shop',
        element:<Shop></Shop>
      },
      {
        path:'orders',
        element:<Orders></Orders>,
        loader:cartProductsLoader
      },
      {
        path:'inventory',
        element:<Inventory></Inventory>
      },
      {
        path:'checkout',
        element:<Checkout></Checkout>
      },

      {
        path: 'login',
        element:<Login></Login>
      },
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
