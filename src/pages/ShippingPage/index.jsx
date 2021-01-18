import React, { useContext } from "react";
import Burger from "../../components/Burger";
import Button from "../../General/Button";
import { Route } from "react-router-dom";
import css from "./style.module.css";
import ContactData from "../../components/contactData";
import BurgerContext from "../../context/BurgerContext";
const ShippingPage = (props) => {
  const ctx = useContext(BurgerContext);
  const cancelOrder = () => {
    props.history.goBack();
  };

  const showContactData = () => {
    props.history.replace("/ship/contact");
  };

  return (
    <div className={css.ShippingPage}>
      <p style={{ fontSize: "24px" }}>
        <strong>Таны захиалга амттай байх болно гэж найдаж байна...</strong>
      </p>
      <p style={{ fontSize: "24px" }}>
        <strong>Дүн : {ctx.burger.totalPrice}₮</strong>
      </p>

      <Burger />

      <Button
        clicked={cancelOrder}
        buttonType="Danger"
        text="ЗАХИАЛГЫГ ЦУЦЛАХ"
      />

      <Button
        clicked={showContactData}
        buttonType="Success"
        text="ХҮРГЭЛТИЙН МЭДЭЭЛЭЛ ОРУУЛАХ"
      />

      <Route path="/ship/contact">
        <ContactData />
      </Route>
    </div>
  );
};

export default ShippingPage;
