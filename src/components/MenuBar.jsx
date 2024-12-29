import "./MenuBar.css";
import "./Header.css"
import { FaShoppingCart } from "react-icons/fa";
import { MdProductionQuantityLimits } from "react-icons/md";
import { Link } from "react-router-dom";
function MenuBar({user, onClick}) {

  return (
    <div className="w-full h-10 bg-white relative" id = "menu-bar">
        <input type="checkbox" name = "tab-menu" id ="tab-menu" />
      <label htmlFor="tab-menu" className=" w-10 h-10 absolute top-1 left-1">
        <span></span><span></span><span></span>
      </label>
      <div className="menu-tab-box">
        <ul>
            <li><Link to = "/carts">carts <FaShoppingCart/></Link></li>
            <li><Link to = "/products">product<MdProductionQuantityLimits /></Link></li>
            <li>
                {user? (<button type = "button" onClick={onClick}>LogOut</button>
                    ):(
                        <button type = "button" onClick={onClick}>Login</button>
                    )}
            </li>
        </ul>
      </div>
    </div>
  )
}

export default MenuBar
