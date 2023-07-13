import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './assets/Layout/Layout'
import Home from './assets/Pages/Home'
import Cart from './assets/Pages/Cart'
import { ProductDetails } from './assets/Pages/ProductDetails'
import CheckOut from './assets/Pages/CheckOut'

const MyRoute = () => {
  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Layout/>}>
                    <Route index element={<Home/>}/>
                    <Route path='/cart' element={<Cart/>}/>
                    <Route path='/product/:id' element={<ProductDetails/>}/>
                    <Route path='/checkout' element={<CheckOut/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default MyRoute