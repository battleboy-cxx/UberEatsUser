import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { API, graphqlOperation } from "aws-amplify";
import { useBasketContext } from "../../context/BasketContext";
import { getDish } from "../../graphql/queries";

const DishDetailsScreen = () => {
  const [dish, setDish] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const route = useRoute();
  const id = route.params?.id;
  const { addDishToBasket } = useBasketContext();

  useEffect(() => {
    if (id) {
      API.graphql(graphqlOperation(getDish, { id: id })).then((response) => {
        console.log("response", response);
        setDish(response.data.getDish);
      });
    }
  }, [id]);

  const navigation = useNavigation();

  if (!dish) {
    return <ActivityIndicator size={"large"} color="gray" />;
  }

  const onAddToBasket = async () => {
    await addDishToBasket(dish, quantity);
    navigation.goBack();
  };

  return (
    <View style={styles.page}>
      <Text style={styles.name}>{dish.name}</Text>
      <Text style={styles.description}>{dish.description}</Text>
      <View style={styles.separator} />

      <View style={styles.row}>
        <AntDesign
          name="minuscircleo"
          size={60}
          marginHorizontal={10}
          color="black"
          onPress={() => {
            setQuantity(Math.max(0, quantity - 1));
          }}
        />
        <Text style={styles.quantity}>{quantity}</Text>
        <AntDesign
          name="pluscircleo"
          size={60}
          marginHorizontal={10}
          color="black"
          onPress={() => {
            setQuantity(quantity + 1);
          }}
        />
      </View>

      <Pressable onPress={onAddToBasket} style={styles.button}>
        <Text style={styles.buttonText}>
          Add {quantity} to basket &#8226; ${(dish.price * quantity).toFixed(2)}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    width: "100%",
    paddingVertical: 40,
    padding: 10,
  },
  name: {
    fontSize: 30,
    fontWeight: "600",
    marginVertical: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: "600",
  },
  separator: {
    height: 1,
    backgroundColor: "lightgray",
    marginVertical: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  quantity: {
    fontSize: 30,
    marginHorizontal: 10,
  },
  button: {
    backgroundColor: "black",
    marginTop: "auto",
    padding: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default DishDetailsScreen;
