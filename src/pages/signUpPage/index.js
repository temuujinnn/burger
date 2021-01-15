import React, { Component } from "react";
import css from "./style.module.css";
import Button from "../../General/Button";
import * as actions from "../../redux/action/signupActions";
import { connect } from "react-redux";
import Spinner from "../../General/spinner";
import { Redirect } from "react-router-dom";
class Signup extends Component {
  state = {
    email: " ",
    password1: " ",
    password2: " ",
    error: " ",
  };
  changeEmail = (event) => {
    this.setState({ email: event.target.value });
  };
  changePassword1 = (event) => {
    this.setState({ password1: event.target.value });
  };
  changePassword2 = (event) => {
    this.setState({ password2: event.target.value });
  };
  Signup = () => {
    if (this.state.password1 === this.state.password2) {
      this.props.signupUser(this.state.email, this.state.password1);
    } else {
      this.setState({ error: "nuuts ug taaraxq bn" });
    }
  };
  render() {
    return (
      <div className={css.signUp}>
        {this.props.userId && <Redirect to="/orders" />}
        <h1>Бүртгэлийн форм</h1>
        <input
          onChange={this.changeEmail}
          type="text"
          placeholder="e-mail хаяг"
        />
        <input
          onChange={this.changePassword1}
          type="password"
          placeholder="password"
        />
        <input
          onChange={this.changePassword2}
          type="password"
          placeholder="password давтан оруул"
        />
        {this.state.error && (
          <div style={{ color: "red" }}>{this.state.error}</div>
        )}
        {this.props.firebaseError && (
          <div style={{ color: "red" }}>{this.props.firebaseError}</div>
        )}
        {this.props.saving && <Spinner />}
        <Button text="Sign Up" buttonType="Success" clicked={this.Signup} />
      </div>
    );
  }
}
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
