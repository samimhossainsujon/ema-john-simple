import React, { useContext, useState } from "react";
import "./SingUp.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../providers/AuthPorvider";

const SingUp = () => {
  const [error, setError] = useState("");

  const { createUser } = useContext(AuthContext);

  const handelSingUp = (event) => {
    event.preventDefault();

    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    const confirm = form.confirm.value;

    console.log(email, password, confirm);

    setError("");

    if (password !== confirm) {
      setError("your password din not match");
      return;
    } else if (password.length < 6) {
      setError("Password must be 6 characters or longer");
      return;
    }
    createUser(email, password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
      })
      .catch(error => {
        console.log(error);
        setError(error.message);
      });
  };

  return (
    <div>
      <div className="form-container">
        <h3 className="form-title">Sing Up</h3>
        <form onSubmit={handelSingUp}>
          <div className="form-control">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" required />
          </div>

          <div className="form-control">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" required />
          </div>
          <div className="form-control">
            <label htmlFor="confirm">Confirm Password</label>
            <input type="password" name="confirm" required />
          </div>
          <input className="btn-submit" type="submit" value="Sing Up" />
        </form>
        <p>
          <small>
            Already Have an Account ? <Link to="/login">Login</Link>{" "}
          </small>
        </p>
        <p className="text-error">{error}</p>
      </div>
    </div>
  );
};

export default SingUp;
