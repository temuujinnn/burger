import React, { useState, useEffect } from "react";
import css from "./style.module.css";
import Spinner from "../../General/spinner";
import Button from "../../General/Button";
import { connect } from "react-redux";
import * as actions from "../../redux/action/loginActions";
import { Redirect } from "react-router-dom";
const Login = (props) => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const changeEmail = (event) => {
    const newEmail = event.target.value;
    setForm((formBefore) => ({
      email: newEmail,
      password: formBefore.password,
    }));
  };
  const passwordlogin = (event) => {
    const newPassword = event.target.value;
    setForm((formBefore) => ({
      email: formBefore.email,
      password: newPassword,
    }));
  };
  const login = () => {
    props.login(form.email, form.password);
  };

  return (
    <div className={css.Login}>
      {props.userId && <Redirect to="orders" />}
      <input onChange={changeEmail} type="text" placeholder="e-mail хаяг" />
      <input onChange={passwordlogin} type="password" placeholder="password" />
      {props.logginIn && <Spinner />}
      {props.firebaseError && (
        <div style={{ color: "red" }}>
          {props.firebaseError} kod: {props.firebaseErrorCode}
        </div>
      )}
      <Button text="Login" buttonType="Success" clicked={login} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    logginIn: state.signupReducer.logginIn,
    firebaseError: state.signupReducer.firebaseError,
    firebaseErrorCode: state.signupReducer.firebaseErrorCode,
    userId: state.signupReducer.userId,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, password) => dispatch(actions.loginUser(email, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
