import React, { useContext } from "react";
import "./Header.css";
import logo from "../../images/Logo.svg";
import { Link } from "react-router-dom";
import { AuthContext } from "../providers/AuthPorvider";

const Header = () => {
  const { user, LogOut } = useContext(AuthContext);
  // console.log(user);

  const HandelLogOut = () => {
    LogOut()
      .then((result) => {})
      .catch((error) => console.error(error));
  };
  return (
    <nav className="header">
      <img src={logo} alt="" />
      <div>
        <Link to="/shop">Shop</Link>
        <Link to="/orders">Order</Link>
        <Link to="/inventory">Inventory</Link>
        <Link to="/Login">Login</Link>
        <Link to="/signup">Sing Up</Link>
        {user && (
          <span className="text-white">
            Welcome {user.email}{" "}
            <button onClick={HandelLogOut}>Log Out</button>
          </span>
        )}
      </div>
    </nav>
  );
};

export default Header;
