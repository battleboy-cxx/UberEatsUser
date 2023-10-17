import { StyleSheet, FlatList, View } from "react-native";
import RestaurantItem from "../../components/RestaurantItem";
import React, { useState, useEffect } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { listRestaurants } from "../../graphql/queries";

export default function HomeScreen() {
  const [restaurant, setRestaurant] = useState([]);
  // add lifecycle method
  useEffect(() => {
    API.graphql(graphqlOperation(
      listRestaurants
    )).then((response) => {
      console.log("response", response);
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
