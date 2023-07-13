import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Card from '../../Components/Card'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

export const ProductDetails = () => {

    let items = useSelector(store=>store.itemStore.items)
    let [product, setProduct] = useState({})

    let[relatedProduct, setRelated] = useState([])

    let [quantity, setQuantity] =useState(1)

    let {id} = useParams() 

    let dispatch = useDispatch()

    let navigate = useNavigate()

    useEffect(()=>{
        let item = items.find(i=> {return i.id == id})
        setProduct(item)
        let filteredItems = items.filter(i=>(i.category == item.category && i.id != item.id))
        setRelated(filteredItems.slice(0,4))
    },[id])

    const add_to_cart = () =>{
        let cart_item = {
            cart_id : Date.now() + "_" + Math.round(Math.random()*1E9),
            ...product,
            quantity
        }
      
        
        // Swal.fire('congrts',"your item hs as been added to cart",'success')
        Swal.fire({
            title:'Confirm',
            text:"your item has been added to your cart",
            icon:'question',
            showCancelButton: true
        })

      
        .then(result=>{
            if(result.isConfirmed){
                dispatch({type:"add_to_cart", payload: cart_item})
                toast.success("your item has been added to cart")

                Swal.fire({
                    title: "Congrats",
                    text: 'Your item has been added to cart',
                    icon: "success",
                    confirmButtonText:"Continue shopping",
                    showCancelButton:true,
                    cancelButtonText:"Go to cart",
                    cancelButtonColor:"#dd1111"
                        
                })
                .then(result=>{
                    if(result.isConfirmed){
                        navigate('/')
                    }
                    else{
                        navigate('/cart')
                    }
                })

            }
        })
        
    }
  return (
    <>
    <ToastContainer position='top-right' theme='colored'/>
        <div className="container my-4">
            <div className="alert alert-primary">
            <h2 className='text-center'>{product.title}</h2>
            </div>
             <div className="d-flex align-items-center">
                <div className="w-50 px-3 text-center">
                    {product && product.images &&
                    <img src={product.images[0]} alt={product.title} style={{height:'400px', width:'100%'}}/>
                    
                    }

                </div>
                <div className='w-50 p-3 bg-dark-subtle'>
                    <h4 className='text-danger '>Description: </h4>
                    <h4> {product.description}</h4>
                    <h4 className=''>Price: $ {product.price}</h4>
                    <h4>In stock: {product.stock}</h4>
                    <h4>Quantity:</h4>
                    <input type="number" min={1} max={product.stock} value={quantity}  className='form-control w-25' onChange={e=>setQuantity(e.target.value)}/>
                    <hr />
                    <button className='btn btn-warning mx-2 w-25'>Buy now</button>
                    <button className='btn btn-danger w-25' onClick={add_to_cart}>Add to cart</button>

                </div>
             </div>
                    <h3  className='mt-4 text-center'>Similar Posts:</h3>
            <div className="row row-cols-1 row-cols-md-3 row-cols-sm-2 row-cols-lg-4 g-4 mt-2">

                    {
                        relatedProduct.length > 0 && relatedProduct.map(item=>{
                            return <Card item={item} key={item.id}/>
                        })
                    }
            </div>

                    

            
        </div>
    </>
  )
}
