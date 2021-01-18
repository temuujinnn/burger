import React, { useEffect, useContext } from "react";
import Spinner from "../../General/spinner";
import Order from "../../components/Order";
import OrderContext from "../../context/OrderContext";
const OrderPage = (props) => {
  useEffect(() => {
    orderContext.loadOrders("props.userId");
  }, []);
  const orderContext = useContext(OrderContext);
  return (
    <div>
      {orderContext.state.loading ? (
        <Spinner />
      ) : (
        orderContext.state.orders.map((el) => (
          <Order key={el[0]} order={el[1]} />
        ))
      )}
    </div>
  );
};

export default OrderPage;
