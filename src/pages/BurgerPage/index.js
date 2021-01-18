import React, { useState } from "react";
import Burger from "../../components/Burger";
import BuildControls from "../../components/BuildControls";
import Modal from "../../General/modal";
import OrderSummary from "../../components/OrderSummary";

const BurgerPage = (props) => {
  const [confirmOrder, setConfirmOrder] = useState(false);

  const continueOrder = () => {
    const params = [];
    for (let orts in props.burgeriinOrts) {
      params.push(orts + "=" + props.burgeriinOrts[orts]);
    }
    params.push("dun=" + props.niitUne);

    props.history.push({
      pathname: "/ship",
      search: params.join("&"),
    });
    closeConfirmModal();
  };

  const showConfirmModal = () => {
    setConfirmOrder(true);
  };

  const closeConfirmModal = () => {
    setConfirmOrder(false);
  };

  return (
    <div>
      <Modal CloseConfirmModal={closeConfirmModal} show={confirmOrder}>
        <OrderSummary onCancel={closeConfirmModal} onContinue={continueOrder} />
      </Modal>

      <Burger />
      <BuildControls showConfirmModal={showConfirmModal} />
    </div>
  );
};

export default BurgerPage;
