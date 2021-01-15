import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import css from "./style.module.css";
import { connect } from "react-redux";
import Toolbar from "../../components/Toolbar";
import BurgerPage from "../BurgerPage";
import SideBar from "../../components/SideBar";
import OrderPage from "../OrderPage";
import { Route, Switch } from "react-router-dom";
import ShippingPage from "../ShippingPage";
import LoginPage from "../LoginPage";
import Signup from "../signUpPage";
import Logout from "../../components/logout";
import * as actions from "../../redux/action/loginActions";
import * as signupActions from "../../redux/action/signupActions";

class App extends Component {
  state = {
    showSideBar: false,
  };

  toggleSideBar = () => {
    this.setState((prevState) => {
      return { showSideBar: !prevState.showSideBar };
    });
  };
  componentDidMount = () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const expireDate = new Date(localStorage.getItem("expireDate"));
    const refreshToken = localStorage.getItem("refreshToken");
    if (token) {
      if (expireDate > new Date()) {
        this.props.autologin(token, userId);
      } else {
        //token hugatsaa duussan logout hine
        this.props.logout();
        //token huchingui bolohod uldej baiga hugatsaag tootsoloh
        this.props.autologoutAfter(expireDate.getTime() - new Date().getTime());
      }
    }
  };

  render() {
    return (
      <div>
        <Toolbar toggleSideBar={this.toggleSideBar} />
        <SideBar
          showSideBar={this.state.showSideBar}
          toggleSideBar={this.toggleSideBar}
        />
        <main className={css.content}>
          {this.props.userId ? (
            <Switch>
              <Route path="/logout" component={Logout} />
              <Route path="/orders" component={OrderPage} />
              <Route path="/ship" component={ShippingPage} />
              <Route path="/" component={BurgerPage} />
            </Switch>
          ) : (
            <Switch>
              <Route path="/login" component={LoginPage} />
              <Route path="/signup" component={Signup} />
              <Redirect to="login" />
            </Switch>
          )}
        </main>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    userId: state.signupReducer.userId,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    autologin: (token, userId) =>
      dispatch(actions.loginUserSuccess(token, userId)),
    logout: dispatch(signupActions.logout()),
    autologoutAfter: dispatch(signupActions.autologoutAfter()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
