import { View, Text, StyleSheet, FlatList } from "react-native";

const BasketDishItem = ({ basketDish }) => {
  return (
    <View style={styles.row}>
      <View style={styles.quantityContainer}>
        <Text>{basketDish.quantity}</Text>
      </View>
      <Text style={{ fontWeight: "600" }}>{basketDish.Dish.name}</Text>
      <Text style={{ marginLeft: "auto" }}>$ {basketDish.Dish.price}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  quantityContainer: {
    backgroundColor: "lightgray",
    paddingHorizontal: 5,
    paddingVertical: 2,
    marginRight: 5,
    borderRadius: 2,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
  },
});

export default BasketDishItem;
