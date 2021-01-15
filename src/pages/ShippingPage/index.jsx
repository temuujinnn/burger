import React from "react";
import { Route } from "react-router-dom";
import Burger from "../../components/Burger";
import ContactData from "../../components/contactData";
import Button from "../../General/Button";
import css from "./style.module.css";
import { connect } from "react-redux";
class ShippingPage extends React.Component {
  state = {
    ingredients: null,
    price: 0,
  };
  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = 0;
    for (let param of query.entries()) {
      if (param[0] !== "dun") ingredients[param[0]] = param[1];
      else price = param[1];
    }
    this.setState({ ingredients, price });
  }
  goBack = () => {
    this.props.history.goBack();
  };
  CancelOrder = () => {
    this.props.history.goBack("/");
  };
  showContactData = () => {
    this.props.history.replace("/ship/contact");
  };
  render() {
    return (
      <div className={css.ShippingPage}>
        <p style={{ fontSize: "20px" }}>
          <strong>Таны захиалга амттай байх болно гэж найдаж байна...</strong>
        </p>
        <p style={{ fontSize: "20px" }}>
          <strong> Дүн: {this.props.price}</strong>
        </p>
        <Burger orts={this.state.ingredients} />
        <Button
          clicked={this.CancelOrder}
          buttonType="Danger"
          text="Захийлгыг цуцлах"
        />
        <Button
          clicked={this.showContactData}
          buttonType="Success"
          text="Хүргэлтийн мэдээлэл оруулах"
        />
        <Route path="/ship/contact">
          <ContactData
            ingredients={this.state.ingredients}
            price={this.state.price}
          />
        </Route>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    price: state.burgerReducer.totalPrice,
  };
};

export default connect(mapStateToProps)(ShippingPage);
