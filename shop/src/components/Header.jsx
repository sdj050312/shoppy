import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { login, logout, onUserStateChange } from "../api/firebase";
import User from "./User";
import Button from "../ui/Button";
import "./Header.css"
import "../App.css";
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
    
    <header className="fixed bg-white w-full flex p-2 justify-between items-center border-b-gray-500 border-solid border">
      <ul className="w-1/4 flex justify-between text-xl" id="product-select">
        <li className="text-2xl text-blue-300">Orico</li>
        <li>
          <Link to="/" className="text-col">
            Home
          </Link>
        </li>
        <li>
          <Link to="/products">Product</Link>
        </li>
        <li>
          <Link to="/carts">Carts</Link>
        </li>
      </ul>
      <ul className="flex space w-1/6 justify-between items-center text-xl hover: " id="admins">
        <li>
          {user && user.isAdmin && (
          <Link id ="upload" to="/products/new" className="text-2xl transition duration-300 hover:text-blue-950 hover:text-3xl hover :transition duration-300">
          <FaPencilAlt/>
           </Link>
          )}
        </li>
        <li>{user && <User user={user} />}</li>
        <li>
          {user ? (
            <Button onClick={handleLogout} text = {'logOut'}>LogOut</Button>
          ) : (
            <Button onClick={handleLogin} text = {'logIn'}>Login</Button>
          )}
        </li>
      </ul>
    </header>
  );
}
