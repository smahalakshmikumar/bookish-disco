import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";

const RegisterForm = (props) => {
  const [passwordMismatchText, setPassText] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    password2: "",
    email: "",
  });
  const { name, password, password2, email } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const checkPass = (e) => {
    if (password !== password2) {
      console.log("wrong");
      setPassText("Password mismatch,Enter again");
    } else {
      setPassText("");
    }
  };

  const submitData = async (e) => {
    e.preventDefault();

    props.history.push({
      pathname: "/",
      formData,
    });
    // const newUser = { name, email, password };
    // try {
    //   const config = {
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   };

    //   const body = JSON.stringify(newUser);
    //   const res = await axios.post("api/users", body, config);

    //   console.log(res.data);
    // } catch (error) {
    //   console.log(error.response.data);
    // }
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form className="form" onSubmit={submitData}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            onChange={(e) => onChange(e)}
            value={name}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="username"
            onChange={(e) => onChange(e)}
            value={email}
            name="email"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            onChange={(e) => onChange(e)}
            value={password}
          />
        </div>
        <small className="form-text">{passwordMismatchText}</small>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            onBlur={(e) => checkPass(e)}
            value={password2}
            onChange={(e) => onChange(e)}
            minLength="6"
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/">Sign In</Link>
      </p>
    </Fragment>
  );
};
export default RegisterForm;
