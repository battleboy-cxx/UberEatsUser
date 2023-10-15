import { View, FlatList, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import DishListItem from "../../components/DishListItem";
import RestaurantHeader from "./Header";
import styles from "./styles";
import { useRoute, useNavigation } from "@react-navigation/native";
import { API, graphqlOperation } from "aws-amplify";

const RestaurantDetailsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const getRestaurant = `
  query restaurantById($id: ID!) {
    getRestaurant(id: $id) {
      id
      name
      image
      deliveryFee
      minDeliveryTime
      maxDeliveryTime
      rating
      address
      Dishes {
        items {
          id
          name
          image
          description
          price
        }
      }
    }
  }
  `;

  const [restaurant, setRestaurant] = useState(null);
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    if (!route.params?.id) {
      return;
    }
    API.graphql(graphqlOperation(getRestaurant, { id: route.params?.id })).then((response) => {
      setRestaurant(response.data.getRestaurant);
      setDishes(response.data.getRestaurant.Dishes.items);
    });
    
  }, []);

  if (!restaurant) {
    return <ActivityIndicator size={"large"} />;
  }

  return (
    <View style={styles.page}>
      <FlatList
        ListHeaderComponent={<RestaurantHeader restaurant={restaurant} />}
        data={dishes}
        renderItem={({ item }) => <DishListItem dish={item} />}
      />
      <View style={styles.iconContainer}>
        <Ionicons
          onPress={() => navigation.goBack()}
          name="arrow-back-circle"
          size={30}
          color="white"
          style={styles.iconContainer}
        />
      </View>
    </View>
  );
};

export default RestaurantDetailsScreen;
