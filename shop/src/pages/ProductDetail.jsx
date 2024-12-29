
import { useLocation, useNavigate } from "react-router-dom"
import './Detail.css';
import { useState } from "react";
import {useAuthContext } from "../context/AuthContext"
import { addCart } from "../api/firebase";
export default function ProductDetail() {
  const {uid} = useAuthContext();
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  const {
    state: {
      product: { id, image, title, description, price}
    },
  } = useLocation();
  const plusClick = () => {
    setCount(count  +1 )
  }
  const minusClick = () => {
    setCount(count - 1);
  }
  const handleClick  = () => {
    const product = {id, image, title, price, description};
    addCart(uid, product);
    navigate('/carts');
  }

  return (
    <div className="detail">
      <div className="detail-container">
    <div className="detail-product">
      <img src={image} alt="" />
    </div>
    <form action="" className="buy-market">
      <ul className="product-lists bg-blue-400 text-center">
        <li><span className="detail-title" >{title}</span></li>
        <li><div className="border-solid border-white h-60 overflow-auto bg-white rounded-xl" id = "descript">{description}</div></li>
        <li className="">Price: ${price}</li>
      </ul>
      <div className="item-cal">
        <div className="cal-btn">
        <button type="button" onClick = {plusClick}>+</button>
        <p className="count">item:{count}</p>
        <button type = "button" onClick = {minusClick}>-</button>
        </div>
        <div className="detail-submit">
      <button type = "button" onClick = {handleClick}>buy</button>
      </div>
      </div>
    </form>
    </div>
    </div>
  )
}
