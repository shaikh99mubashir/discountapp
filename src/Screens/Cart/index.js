import React from 'react'
import { useLocation } from 'react-router-dom';

const Cart = () => {
    const location = useLocation();
    console.log('location',location);
    const cartItems = location.state?.cartItems || [];
  console.log('cartItems location   ',cartItems);
  return (
    <div>Cart</div>
  )
}

export default Cart