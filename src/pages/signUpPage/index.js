import React, { useState, useEffect } from "react";
import css from "./style.module.css";
import Button from "../../General/Button";
import * as actions from "../../redux/action/signupActions";
import { connect } from "react-redux";
import Spinner from "../../General/spinner";
import { Redirect } from "react-router-dom";
const Signup = (props) => {
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");

  const Signup = () => {
    if (password1 === password2) {
      props.signupUser(email, password1);
    } else {
      setError("nuuts ug taaraxq bn");
    }
  };

  return (
    <div className={css.signUp}>
      {password2}
      {props.userId && <Redirect to="/orders" />}
      <h1>Бүртгэлийн форм</h1>
      <input
        onChange={(e) => setEmail(e.target.value)}
        type="text"
        placeholder="e-mail хаяг"
      />
      <input
        onChange={(e) => setPassword1(e.target.value)}
        type="password"
        placeholder="password"
      />
      <input
        onChange={(e) => setPassword2(e.target.value)}
        type="password"
        placeholder="password давтан оруул"
      />
      {error && <div style={{ color: "red" }}>{error}</div>}
      {props.firebaseError && (
        <div style={{ color: "red" }}>{props.firebaseError}</div>
      )}
      {props.saving && <Spinner />}
      <Button text="Sign Up" buttonType="Success" clicked={Signup} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    saving: state.signupReducer.saving,
    firebaseError: state.signupReducer.firebaseError,
    userId: state.signupReducer.userId,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    signupUser: (email, password) =>
      dispatch(actions.signupUser(email, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
