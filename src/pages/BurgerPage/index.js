import React, { Component } from "react";
import Burger from "../../components/Burger";
import BuildControls from "../../components/BuildControls";
import Modal from "../../General/modal";
import OrderSummary from "../../components/OrderSummary";
import Spinner from "../../General/spinner";

class BurgerPage extends Component {
  state = {
    confirmOrder: false,
  };

  componentDidMount = () => {};

  continueOrder = () => {
    const params = [];
    for (let orts in this.props.burgeriinOrts) {
      params.push(orts + "=" + this.props.burgeriinOrts[orts]);
    }
    params.push("dun=" + this.props.niitUne);

    this.props.history.push({
      pathname: "/ship",
      search: params.join("&"),
    });
    this.closeConfirmModal();
  };

  showConfirmModal = () => {
    this.setState({ confirmOrder: true });
  };

  closeConfirmModal = () => {
    this.setState({ confirmOrder: false });
  };

  render() {
    return (
      <div>
        <Modal
          CloseConfirmModal={this.closeConfirmModal}
          show={this.state.confirmOrder}
        >
          {this.state.loading ? (
            <Spinner />
          ) : (
            <OrderSummary
              onCancel={this.closeConfirmModal}
              onContinue={this.continueOrder}
            />
          )}
        </Modal>

        <Burger />
        <BuildControls
          showConfirmModal={this.showConfirmModal}
          ortsHasah={this.props.burgereesOrtsHas}
          ortsNemeh={this.props.burgertOrtsNem}
        />
      </div>
    );
  }
}

export default BurgerPage;
