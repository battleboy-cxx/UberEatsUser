import { View, Text, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

const OrderListItem = ({ order }) => {
  const navigation = useNavigation();

  const numberOfItems = order.dishes.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  const orderPrice = order.dishes.reduce(
    (acc, item) => acc + item.quantity * item.Dish.price,
    order.Restaurant.deliveryFee || 0
  ).toFixed(2);

  const daysAgo = Math.floor(
    // "createdAt": "2023-10-08T05:06:24.228Z"
    (new Date() - new Date(order.createdAt)) / 1000 / 60 / 60 / 24
  );


  return (
    <Pressable onPress={() => navigation.navigate("OrderDetails", {id: order.id})} style={{flexDirection: "row", margin: 10, alignItems: "center"}}>
      <Image
        source={{ uri: order.Restaurant.image }}
        style={{ width: 75, height: 75, marginRight: 5 }}
      />

      <View>
        <Text style={{fontWeight:"600", fontSize: 16}}>{order.Restaurant.name}</Text>
        <Text style={{marginVertical: 5}}>{numberOfItems} items $ {orderPrice}</Text>
        <Text>{daysAgo} days ago &#8226; {order.status}</Text>
      </View>
    </Pressable>
  );
};

export default OrderListItem;
