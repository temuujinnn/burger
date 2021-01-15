import React, { Component } from "react";
import css from "./style.module.css";
import Button from "../../General/Button";
import { connect } from "react-redux";
import * as actions from "../../redux/action/loginActions";
import Spinner from "../../General/spinner";
import { Redirect } from "react-router-dom";
class Login extends Component {
  state = {
    email: " ",
    password: " ",
  };
  changeEmail = (event) => {
    this.setState({ email: event.target.value });
  };
  password = (event) => {
    this.setState({ password: event.target.value });
  };
  login = () => {
    this.props.login(this.state.email, this.state.password);
  };

  render() {
    return (
      <div className={css.Login}>
        {this.props.userId && <Redirect to="orders" />}
        <input
          onChange={this.changeEmail}
          type="text"
          placeholder="e-mail хаяг"
        />
        <input
          onChange={this.password}
          type="password"
          placeholder="password"
        />
        {this.props.logginIn && <Spinner />}
        {this.props.firebaseError && (
          <div style={{ color: "red" }}>
            {this.props.firebaseError} kod: {this.props.firebaseErrorCode}
          </div>
        )}
        <Button text="Login" buttonType="Success" clicked={this.login} />
      </div>
    );
  }
}
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
