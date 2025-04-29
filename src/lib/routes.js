import { createBrowserRouter, useParams } from "react-router-dom";
import React from "react";


import Home from "../components/Layout/Home.jsx";
import Contact from "../components/Contact/Contact.jsx";

import Error404 from "../components/Error404/Error404.jsx";

import Login from "../components/Auth/Login.jsx";
import RegisterStore from "../components/Auth/RegisterStore.jsx";
import AdminIndex from "../components/Admin/AdminIndex.jsx";
import ReceiveInventory from "../components/Inventory/ReceiveInventory.jsx";
import ViewInventory from "../components/Inventory/ViewInventory.jsx";
import Auth from "../components/Auth/Auth.jsx";

export const ROOT = "/";
export const AUTH = "/auth";
export const CONTACT = "/contact";
export const LOGIN = "/auth/login";
export const REGISTER = "/auth/register";
export const ADMIN = "/admin";
export const RECEIVING = "/receiving/:store_id"; // Define the new route for receiving with store_id
export const VIEW_INVENTORY = "/inventory/:store_id"; // Define the new route for receiving with store_id


// Protected route
export const PROTECTED = "/protected";



// create routes
export const router = createBrowserRouter([
    { 
      path: ROOT,
      element: <Home />,
      children: [
       
        
      ]
    },
    { 
      path: AUTH,
      element: <Auth />,
      children: [
        {
          path: LOGIN,
          element: <Login />
        },
        {
          path: REGISTER,
          element: <RegisterStore />
        },
      ]
    },
    { path: ADMIN, element: <AdminIndex /> },
    { path: RECEIVING, element: <ReceiveInventory /> },
    { path: VIEW_INVENTORY, element: <ViewInventory /> },
    { path: CONTACT, element: <Contact /> },
    { path: "*", element: <Error404 /> }
  ]);

  
  
  export default router;


  
