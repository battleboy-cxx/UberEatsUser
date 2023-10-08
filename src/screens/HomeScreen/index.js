import { StyleSheet, FlatList, View } from "react-native";
import RestaurantItem from "../../components/RestaurantItem";
import React, { useState, useEffect } from "react";
import { API, graphqlOperation } from "aws-amplify";

export default function HomeScreen() {
  const [restaurant, setRestaurant] = useState([]);
  const listRestaurantsBasic = `
  query list{
    listRestaurants {
      items{
        id name image deliveryFee minDeliveryTime maxDeliveryTime rating address lat lng
      }
    }
  }`;
  // add lifecycle method
  useEffect(() => {
    API.graphql(graphqlOperation(listRestaurantsBasic)).then((response) => {
      setRestaurant(response.data.listRestaurants.items);
    });
  }, []);

  return (
    <View style={styles.page}>
      <FlatList
        data={restaurant}
        renderItem={({ item }) => <RestaurantItem restaurant={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    padding: 10,
  },
});
