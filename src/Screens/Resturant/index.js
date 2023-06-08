// import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
// import { BaseUrl } from '../../BaseUrl';
// import axios from 'axios';
// import { useHistory } from 'react-router-dom';
// const Resturant = () => {
//     const [product, setProduct] = useState([]);
//     console.log('product',product);
//     const getProduct = () => {
//       axios
//         .get(`${BaseUrl}getproduct`)
//         .then((response) => {
//           const productData = response.data.data;
//           setProduct(productData);
//         })
//         .catch((error) => {
//           console.log("error==>", error);
//         });
//     };

//     useEffect(() => {
//       getProduct();
//     }, []);
//   return (
//     <div className="container">
//     <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between', alignItems:'center'}}>
//         <div>
//         <img
//               src={require('../../Images/rlogo.jpg')}
//               style={{width:100,height:100}}
//               alt="logo"
//             />
//         </div>
//         <div><h3>Restaurant</h3></div>
//         <Link to="/Cart" style={{ textDecoration: "none" }}>
//         <div style={{flexDirection:'row',display:'flex'}}>
//         <img
//               src={require('../../Images/cart.png')}
//               style={{width:60,height:60}}
//               alt="logo"
//             />
//             <p style={{backgroundColor:'red',padding:2,marginTop:-10,fontSize:15,fontWeight:'bold' ,width:20,height:20,textAlign:'center',borderRadius:50, color:'white'}}>1</p>
//         </div>
//         </Link>
//     </div>
//         <div className="mt-5"></div>
//         <div style={{display:'flex',flexDirection:'row', flexWrap:'wrap', gap:20}}>
//         {product && product.map((e,i)=>{
//             return(
//         <div className="gridContainer2 d-flex">
//           <div
//             className="card"
//             style={{
//               width: "18rem",
//               border: "none",
//               boxShadow:
//                 "0 4px 8px 0 rgba(0, 0, 0, 0.5), 0 6px 20px 0 rgba(0, 0, 0, 0.29)",
//             }}
//           >
//             <img
//               className="card-img-top"
//               src={require('../../Images/biryani.jpg')}
//               alt="Card image cap"
//             />
//             <div className="card-body">
//               <h5 className="card-title">{e.product_name}</h5>
//               <h5 className="card-title">Rs.{e.product_price}/-</h5>
//               <p className="card-text">
//                 {e.product_description}
//               </p>
//               <button className="btn btn-primary">
//                 Add to Cart
//               </button>
//             </div>
//           </div>

//         </div>
//         )
//         })}
//         </div>
//       </div>
//   )
// }

// export default Resturant
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BaseUrl } from "../../BaseUrl";
import axios from "axios";

const Resturant = () => {
  const [product, setProduct] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const location = useLocation();

  console.log("cartItems", cartItems);
  const navigate = useNavigate()

  const getProduct = () => {
    axios
      .get(`${BaseUrl}getproduct`)
      .then((response) => {
        const productData = response.data.data;
        setProduct(productData);
      })
      .catch((error) => {
        console.log("error==>", error);
      });
  };

  useEffect(() => {
    getProduct();
  }, []);

  const addToCart = (item) => {
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1, // Increment the quantity of existing item
      };

      const updatedCartItems = cartItems.map((cartItem) =>
        cartItem.id === updatedItem.id ? updatedItem : cartItem
      );

      setCartItems(updatedCartItems);
    } else {
      const newItem = { ...item, quantity: 1 }; // Add quantity property to the item
      const updatedCartItems = [...cartItems, newItem];
      setCartItems(updatedCartItems);
    }

    setCartCount((prevCount) => prevCount + 1);
  };

  return (
    <div className="container">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <img
            src={require("../../Images/rlogo.jpg")}
            style={{ width: 100, height: 100 }}
            alt="logo"
          />
        </div>
        <div>
          <h3>Restaurant</h3>
        </div>
        <Link
          to={{
            pathname: "/Cart",
            state: { cartItems: cartItems },
          }}
          style={{ textDecoration: "none" }}
        >
          <div style={{ flexDirection: "row", display: "flex" }}>
            <img
              src={require("../../Images/cart.png")}
              style={{ width: 60, height: 60 }}
              alt="logo"
            />
            <p
              style={{
                backgroundColor: "red",
                padding: 2,
                marginTop: -10,
                fontSize: 15,
                fontWeight: "bold",
                width: 20,
                height: 20,
                textAlign: "center",
                borderRadius: 50,
                color: "white",
              }}
            >
              {cartCount && cartCount}
            </p>
          </div>
        </Link>
      </div>
      <div className="mt-5"></div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 20,
        }}
      >
        {product &&
          product.map((e, i) => {
            return (
              <div className="gridContainer2 d-flex">
                <div
                  className="card"
                  style={{
                    width: "18rem",
                    border: "none",
                    boxShadow:
                      "0 4px 8px 0 rgba(0, 0, 0, 0.5), 0 6px 20px 0 rgba(0, 0, 0, 0.29)",
                  }}
                >
                  <img
                    className="card-img-top"
                    src={require("../../Images/biryani.jpg")}
                    alt="Card image cap"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{e.product_name}</h5>
                    <h5 className="card-title">USD.{e.product_price}/-</h5>
                    <p className="card-text">{e.product_description}</p>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <div
                        //   className="btn btn-primary"
                        // onClick={() => handleAddToCart(e.product_id)}
                        onClick={() => addToCart(e)}
                      >
                        <img
                          src={require("../../Images/cart.png")}
                          style={{ width: 30, height: 30 }}
                          alt="logo"
                        />
                      </div>
                      {/* <Link to={{ pathname: '/Checkout', state: { e } }}> */}
                      <Link to='/Checkout' state={e} style={{ textDecoration: "none" }}>

                      <button
                        className="btn btn-primary"
                      >
                        Checkout
                      </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Resturant;
