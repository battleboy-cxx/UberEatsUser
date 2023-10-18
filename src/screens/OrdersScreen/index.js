import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";

import OrderListItem from "../../components/OrderListItem";
import { useOrderContext } from "../../context/OrderContext";

const OrderScreen = () => {
  const { getUserOrders } = useOrderContext();
  const [orders, setOrders] = useState([]);
  
  useEffect(() => {
    getUserOrders().then((response) => {
      setOrders(response);
      console.log(response);
    });
  }, []);

  return (
    <View style={{ flex: 1, width: "100%" }}>
      <FlatList
        data={orders}
        renderItem={({ item }) => <OrderListItem order={item} />}
      />
    </View>
  );
};

export default OrderScreen;
