import { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import restarurants from "../../../assets/data/restaurants.json";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const dish = restarurants[0].dishes[0];

const DishDetailsScreen = () => {
  const [quantity, setQuantity] = useState(1);
  const getTotal = () => {
    return (dish.price * quantity).toFixed(2);
  };

  const navigation = useNavigation();

  return (
    <View style={styles.page}>
      <Text style={styles.name}>{dish.name}</Text>
      <Text style={styles.description}>{dish.description}</Text>
      <View style={styles.separator} />

      <View style={styles.row}>
        <AntDesign
          name="minuscircleo"
          size={60}
          color="black"
          onPress={() => {
            setQuantity(Math.max(0, quantity - 1));
          }}
        />
        <Text style={styles.quantity}>{quantity}</Text>
        <AntDesign
          name="pluscircleo"
          size={60}
          color="black"
          onPress={() => {
            setQuantity(quantity + 1);
          }}
        />
      </View>

      <Pressable onPress={()=>navigation.navigate("Basket")} style={styles.button}>
        <Text style={styles.buttonText}>
          Add {quantity} to basket &#8226; ${getTotal()}
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
  name :{
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
