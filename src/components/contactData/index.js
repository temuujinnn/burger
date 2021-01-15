import React, { Component } from "react";
import Button from "../../General/Button";
import Spinner from "../../General/spinner";
import css from "./style.module.css";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../redux/action/orderAction";
class ContactData extends Component {
  state = {
    hayag: {
      dun: 0,
      name: null,
      city: null,
      street: null,
    },
  };
  changeName = (e) => {
    this.setState({ name: e.target.value });
  };
  changeStreet = (e) => {
    this.setState({ street: e.target.value });
  };
  changeCity = (e) => {
    this.setState({ city: e.target.value });
  };

  componentDidUpdate() {
    if (
      this.props.newOrderStatus.finished &&
      !this.props.newOrderStatus.error
    ) {
      this.props.history.replace("/orders");
    }
  }
  saveOrder = () => {
    const newOrder = {
      userId: this.props.userId,
      orts: this.props.ingredients,
      dun: this.props.price,
      hayag: {
        name: this.state.name,
        city: this.state.city,
        street: this.state.street,
      },
    };
    this.props.saveOrderAction(newOrder);
  };
  render() {
    return (
      <div className={css.ContactData}>
        ДҮН: {this.props.price}₮
        <div>
          {this.props.newOrderStatus.error &&
            `zahialgiig hadgalah ywtsad aldaa garlaaa : ${this.props.newOrderStatus.error}`}
        </div>
        {this.props.newOrderStatus.saving ? (
          <Spinner />
        ) : (
          <div>
            <input
              onChange={this.changeName}
              type="text"
              name="name"
              placeholder=" Тэны нэр"
            />
            <input
              onChange={this.changeStreet}
              type="text"
              name="street"
              placeholder="Таны гэрийн хаяг "
            />
            <input
              onChange={this.changeCity}
              type="text"
              name="city"
              placeholder=" Таны хат"
            />
          </div>
        )}
        <Button text="Илгээх" buttonType="Success" clicked={this.saveOrder} />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    price: state.burgerReducer.totalPrice,
    ingredients: state.burgerReducer.ingredients,
    newOrderStatus: state.orderReducer.newOrder,
    userId: state.signupReducer.userId,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    saveOrderAction: (newOrder) => dispatch(actions.saveOrder(newOrder)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ContactData));
