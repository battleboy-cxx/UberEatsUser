import {
  View,
  FlatList,
  ActivityIndicator,
  Pressable,
  Text,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import DishListItem from "../../components/DishListItem";
import RestaurantHeader from "./Header";
import styles from "./styles";
import { useRoute, useNavigation } from "@react-navigation/native";
import { API, graphqlOperation } from "aws-amplify";
import { useBasketContext } from "../../context/BasketContext";
import { getRestaurant } from "../../graphql/queries";

const RestaurantDetailsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const [restaurant, setRestaurant] = useState(null);
  const [dishes, setDishes] = useState([]);

  const {
    setRestaurant: setBasketRestaurant,
    basket,
    basketDishes,
  } = useBasketContext();

  useEffect(() => {
    if (!route.params?.id) {
      return;
    }
    setBasketRestaurant(null);
    API.graphql(graphqlOperation(getRestaurant, { id: route.params.id })).then(
      (response) => {
        setRestaurant(response.data.getRestaurant);
        setDishes(response.data.getRestaurant.Dishes.items);
      }
    );
  }, []);

  useEffect(() => {
    if (restaurant) {
      setBasketRestaurant(restaurant);
    }
  }, [restaurant]);

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
      <Ionicons
        onPress={() => navigation.goBack()}
        name="arrow-back-circle"
        size={30}
        color="white"
        style={styles.iconContainer}
      />
      {basket && (
        <Pressable
          onPress={() => navigation.navigate("Basket")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>
            Open Basket ({basketDishes.length})
          </Text>
        </Pressable>
      )}
    </View>
  );
};

export default RestaurantDetailsScreen;
