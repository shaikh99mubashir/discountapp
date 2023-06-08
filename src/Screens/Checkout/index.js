import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { BaseUrl } from "../../BaseUrl";
const Checkout = (props) => {
    
  const location = useLocation();
  console.log("locatio", location);
  const e = location.state;
  console.log(e);
  const [quantity,setQuantity] = useState(1)
  let totalamount = e.product_price * quantity
  const [cardInfo, setCardInfo] = useState({
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvc: "",
    amount: totalamount
  });

  console.log('cardInfo',cardInfo);
  const minusQty = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const plusQty = () => {
    setQuantity(quantity + 1);
  };
  const navigate = useNavigate()
  const chargeThePayment = () => {
    axios
    .post(`${BaseUrl}doPayment`, cardInfo)
    .then((res) => {
        console.log(res.data);
          alert(`${res.data.message}`)
          navigate('/Resturant')
    })
    .catch((error) => {
      console.log("error==>", error);
    });
  }
  return (
    <div className="container">
      <h1 style={{ textAlign: "center", color: "grey", marginBottom: 50 }}>
        Checkout
      </h1>

      <div class="row">
        <div class="col">
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
                <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                <div
                style={{flexDirection: 'row', gap: 10, alignItems: 'center',display:'flex'}}>
                <div onClick={() => minusQty()}>
                  <img
                    src={require('../../Images/MINUS.png')}
                    style={{width: 20, height: 20}}
                  />
                </div>
                <div
                  style={{
                    fontSize: 18,
                    color:'balck',
                    fontFamily: 'Poppins-SemiBold',
                  }}>
                  {quantity}
                </div>
                <div onClick={() => plusQty()}>
                  <img
                    src={require('../../Images/PLUS.png')}
                    style={{width: 20, height: 20}}
                  />
                </div>
              </div>
              <div>
                <h4>Total.{totalamount}/-</h4>
              </div>
              </div>
                <p style={{fontSize:12,textAlign:'center', marginTop:10}}>get Fastest Delivery</p>
              </div>
            </div>
          </div>
        </div>
        <div class="col">
          <h6>Enter Card Details</h6>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <input
              className="form__input"
              type="email"
              value={cardInfo.cardNumber}
              placeholder="Card Number"
              onChange={(e) =>
                setCardInfo({ ...cardInfo, cardNumber: e.target.value })
              }
            />
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <input
              className="form__input"
              type="email"
              value={cardInfo.expiryMonth}
              placeholder="exp month"
              onChange={(e) =>
                setCardInfo({ ...cardInfo, expiryMonth: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <input
              className="form__input"
              type="email"
              value={cardInfo.expiryYear}
              placeholder="exp year"
              onChange={(e) =>
                setCardInfo({ ...cardInfo, expiryYear: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <input
              className="form__input"
              type="email"
              value={cardInfo.cvc}
              placeholder="CVC"
              onChange={(e) =>
                setCardInfo({ ...cardInfo, cvc: e.target.value })
              }
            />
          </Form.Group>
          <button
        className="button-sub px-4"
        type="submit"
        onClick={chargeThePayment}
      >
        Payment
      </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
