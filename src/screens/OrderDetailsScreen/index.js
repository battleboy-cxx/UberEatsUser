import { View, Text, Image, FlatList, ActivityIndicator } from "react-native";
import restarurants from "../../../assets/data/restaurants.json";
import styles from "./styles";
import BasketDishItem from "../../components/BasketDishItem";
import { useRoute } from "@react-navigation/native";
import { useOrderContext } from "../../context/OrderContext";
import { useEffect, useState } from "react";

const OrderDetailHeader = ({ order }) => {
  const { daysAgo } = useOrderContext();
  const days = daysAgo(order.createdAt);

  return (
    <View style={styles.page}>
      <Image source={{ uri: order.Restaurant.image }} style={styles.image} />

      <View style={styles.container}>
        <Text style={styles.title}>{order.Restaurant.name}</Text>
        <Text style={styles.subtitle}>
          {" "}
          {order.status} &#8226; {days} days ago
        </Text>
        <Text style={styles.menuTitle}>Your order</Text>
      </View>
    </View>
  );
};

const OrderDetails = () => {
  const route = useRoute();
  const [order, setOrder] = useState(null);
  const { getOrderById } = useOrderContext();
  const id = route.params?.id;

  useEffect(() => {
    getOrderById(id).then((response) => {
      setOrder(response);
    });
  }, []);

  if (!order) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <FlatList
      ListHeaderComponent={() => <OrderDetailHeader order={order} />}
      data={order.dishes.data.listOrderDishes.items}
      renderItem={({ item }) => <BasketDishItem basketDish={item} />}
    />
  );
};

export default OrderDetails;
