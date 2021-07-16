import React, { useState, useEffect } from "react";
//import '../../src/components/loginPages/loginForm.css';
import { useHistory, BrowserRouter as Router, Route } from "react-router-dom";
import NavigationBar from "./NavigationBar";

const LoginForm = (props) => {
  const [formData, setFormData] = useState({
    password: "",
    email: "",
  });
  const { password, email } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const submitData = async (e) => {
    e.preventDefault();
    console.log(formData);

    fetch(
      `https://onlinecoursedb-9241d-default-rtdb.firebaseio.com/users.json`,

      {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      }
    ).then((response) => {
      props.history.push({
        pathname: "/CourseList",
        formData,
      });
      return response.json();
    });
  };
  return (
    <>
      <NavigationBar isLogin={true} />

      <form className="form" onSubmit={submitData}>
        <div class="container">
          <div class="row">
            <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
              <div class="card card-signin my-5">
                <div class="card-body">
                  <h5 class="card-title text-center">Sign In</h5>
                  <form class="form-signin">
                    <div class="form-label-group">
                      <input
                        type="name"
                        id="inputEmail"
                        class="form-control"
                        value={email}
                        placeholder="username"
                        onChange={(e) => onChange(e)}
                        name="email"
                        required
                        autofocus
                      />
                      <label for="inputEmail">UserName</label>
                    </div>

                    <div class="form-label-group">
                      <input
                        type="password"
                        id="inputPassword"
                        class="form-control"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={(e) => onChange(e)}
                        required
                      />
                      <label for="inputPassword">Password</label>
                    </div>

                    <div class="custom-control custom-checkbox mb-3">
                      <input
                        type="checkbox"
                        class="custom-control-input"
                        id="customCheck1"
                      />
                      <label class="custom-control-label" for="customCheck1">
                        Remember password
                      </label>
                    </div>
                    <button
                      class="btn btn-lg btn-primary btn-block text-uppercase"
                      type="submit"
                      onClick={submitData}
                    >
                      Sign in
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};
export default LoginForm;
