
import { useNavigate } from "react-router-dom";
import "./ProductCard.css"
function ProductCard({product}) {
const {id, image, title, price, description} = product;
 const navigate = useNavigate();
  return (
    <>
        
    <div className="item">
        <div className="imgs">
            <img src={image} alt="" />
        </div>
        <div className="item-name">
          <ul className="flex justify-between p-3">
            <li>{title}</li>
            <li><button type = "button" onClick ={() => {
              navigate(`/products/${id}`, {state: {product}})
            }} className="rouded  p-2 bg-blue-700 text-white rounded-lg hover:bg-blue-400 hover:text-black transition duration-300">Buy</button></li>
          </ul>
          <ul className="bg-blue-50 h-full">
            <li>${price}</li>
            <li>{description}</li>
          </ul>
        </div>
    </div>
    
    </>
  )
}

export default ProductCard;
