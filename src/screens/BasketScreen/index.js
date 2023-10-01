import { View, Text, StyleSheet, FlatList } from "react-native";
import BasketDishItem from "../../components/BasketDishItem";

import restarurants from "../../../assets/data/restaurants.json";


const restarurant = restarurants[0];

const BasketScreen = () => {
  return (
    <View style={styles.page}>
      <Text style={styles.name}>{restarurant.name}</Text>

      <Text style={{fontWeight: "bold", marginTop: 20, fontSize: 19}}>Your items</Text>
      <FlatList
        data={restarurant.dishes}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => <BasketDishItem basketDish={item} />
        }
      />
      <View style={styles.separator} />

      <View style={styles.button}>
        <Text style={styles.buttonText}>Create order</Text>
      </View>
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
  name:{
    fontSize: 24,
    fontWeight: "600",
    marginVertical: 10,
  },
  quantityContainer: {
    backgroundColor: "lightgray",
    paddingHorizontal: 5,
    paddingVertical: 2,
    marginRight: 5,
    borderRadius: 2,
  },
  name: {
    fontSize: 24,
    fontWeight: "600",
    marginVertical: 10,
  },
  title: {
    fontSize: 15,
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
    marginVertical: 15,
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

export default BasketScreen;
