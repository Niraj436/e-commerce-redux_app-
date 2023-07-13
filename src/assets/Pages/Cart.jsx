import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import Swal from 'sweetalert2'
import 'react-toastify/dist/ReactToastify.css';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

const Cart = () => {

  const {cart_items} = useSelector(store=>store.cartStore)
  let dispatch = useDispatch()
  console.log(cart_items)
  let navigate = useNavigate()

  const deleteItem = cart_id =>e =>{
      Swal.fire({
        title: "Alert",
        text: "are you sure, you want to remove this item from cart?",
        icon: 'question',
        showCancelButton: true,
        cancelButtonText:"Go to cart",
        cancelButtonColor:"#dd111"


      })
      .then(result=>{
        if(result.isConfirmed){
          dispatch({type:"Remove_item", payload:cart_id})
          toast.warning("Your item has been removed from cart")

        }
      })
  }

  const decreaseQuantity = item => e =>{
    e.preventDefault()
    let new_quantity = item.quantity - 1
    if(new_quantity <= 0){
      Swal.fire({
        title: "warning",
        text: "Minimum quantity reached. Do you want to remove this from cart",
        showCancelButton:true,
        cancelButtonColor: "#dd1111"
      })
      .then(result=>{
        if(result.isConfirmed){
          dispatch({type:"Remove_item", payload: item.cart_id})
          toast.warning("Your item has been removed from cart")
        }
      })
    }
    else{
      let updated_item = {...item, quantity: new_quantity}
      dispatch({type:"update_item", payload: updated_item})
      toast.warning("Quantity has been decreased")
    }
  }

  const increaseQuantity = item => e =>{
    let new_quantity = item.quantity + 1
    if(new_quantity> item.stock){
      Swal.fire('Warning',"Item is out of stock")
    }
    else{
      let updated_item = {...item, quantity: new_quantity}
      dispatch({type:"update_item", payload: updated_item})
      toast.success("Quantity has been increased")
    }
  }

  const handleCheckout = (e) =>{
    e.preventDefault()
    let individual_totals = cart_items.map(item=>item.quantity * item.price)
    let totalPrice = individual_totals.reduce((a,c) => a+c)
    sessionStorage.setItem("total_price", totalPrice)
    return navigate("/checkout")
  }

  return (
    <>
   <ToastContainer position='top-right' theme='colored'/>
      <h4 className='text-center'>Cart items</h4>
      {
        cart_items.length> 0 ?
      <>
        <table className='table w-75 text-center table-bordered table-hover table-striped mx-auto'>
          <thead className='table-dark'>
            <tr>
              <td>S.N</td>
              <td>Product Image</td>
              <td>Product Name</td>
              <td>Unit price</td>
              <td>Quantity Price</td>
              <td>Total price</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {
              cart_items.length>0 &&
              cart_items.map((item,i)=>{
                return <tr key={item.cart_id}>
                  <td>{i+1}</td>
                  <td>
                    <img src={item.images[0]} alt=""  style={{height:'75px'}}/>
                  </td>
                  <td>{item.title}</td>
                  <td>{item.price}</td>
                  <td>
                    <div className='btn-group'>
                      <button className='btn btn-warning' onClick={decreaseQuantity(item)}>-</button>
                      <input type="text" className='text-center' value={item.quantity}  disabled style={{width:'2.5rem'}}/>
                      <button className='btn btn-success' onClick={increaseQuantity(item)}>+</button>
                    </div>
                    </td>
                  <td>${(item.quantity*item.price)}</td>
                  <td>
                    <button className='btn btn-danger' onClick={deleteItem(item.cart_id)}>
                      <i className='bi bi-trash-fill'></i>
                    </button>
                  </td>
                </tr>
                
              })
            }
          </tbody>
        </table>
        <button className='btn btn-warning' onClick={handleCheckout}>Procced to checkOut</button>
      </>
      :
      <div className='alert alert-danger text-center p-5 my-5 h2 w-75 mx-auto'>No items in cart</div>
      }

    </>
  )
}

export default Cart