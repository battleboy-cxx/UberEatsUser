import { View, Text, Image, FlatList } from "react-native";

import orders from "../../../assets/data/orders.json";
import restarurants from "../../../assets/data/restaurants.json";
import styles from "./styles";
import BasketDishItem from "../../components/BasketDishItem";
import {useRoute} from "@react-navigation/native";


const OrderDetailHeader = () => {
  const route = useRoute();

  const id = route.params?.id;
  const order = orders[id-1];

  return (
    <View style={styles.page}>
      <Image source={{ uri: order.Restaurant.image }} style={styles.image} />

      <View style={styles.container}>
        <Text style={styles.title}>{order.Restaurant.name}</Text>
        <Text style={styles.subtitle}>$ {order.status} &#8226; 2 days ago</Text>
        <Text style={styles.menuTitle}>Your order</Text>
      </View>
    </View>
  );
};

const OrderDetails = () => {
  return (
      <FlatList
      ListHeaderComponent={<OrderDetailHeader />}
        data={restarurants[0].dishes}
        renderItem={({ item }) => <BasketDishItem basketDish={item} />}
      />
  );
};

export default OrderDetails;
