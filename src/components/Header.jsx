import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { login, logout, onUserStateChange } from "../api/firebase";
import User from "./User";
import Button from "../ui/Button";
import "./Header.css"
import "../App.css";
import MenuBar from "./MenuBar";

export default function Header() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onUserStateChange((user) => {
      console.log("User state changed:", user);
      setUser(user);
    });
  }, []);

  const handleLogin = () => {
    login();
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <>    
      <MenuBar user={user} onClick={user ? handleLogout : handleLogin} />
      <header className="fixed bg-white w-full flex p-2 justify-between items-center border-b-gray-500 border-solid border" id="header-guide">
        <ul className="w-1/4 flex justify-between text-xl" id="product-select">
          <li className="text-blue-300">
            <h1>Coffe Orico</h1>
          </li>
          
          {/* Product 링크는 로그인 상태에 관계없이 항상 표시됩니다. */}
          <li>
            <Link to="/products">Product</Link>
          </li>
          <li>
            <Link to="/carts">Carts</Link>
          </li>
        </ul>
        <ul className="flex space justify-between items-center text-xl hover: " id="admins">
          <li>
            {user && user.isAdmin && (
              <Link id="upload" to="/products/new" className="text-2xl transition duration-300 hover:text-blue-950 hover:text-3xl hover:transition duration-300">
                <FaPencilAlt />
              </Link>
            )}
          </li>
          <li>{user && <User user={user} />}</li>
          <li>
            {user ? (
              <Button onClick={handleLogout} text={'LogOut'}>LogOut</Button>
            ) : (
              <Button onClick={handleLogin} text={'LogIn'}>Login</Button>
            )}
          </li>
        </ul>
      </header>
    </>
  );
}
