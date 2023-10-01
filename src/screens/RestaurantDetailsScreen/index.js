import { View, FlatList, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DishListItem from "../../components/DishListItem";
import restaurants from "../../../assets/data/restaurants.json";
import RestaurantHeader from "./Header";
import styles from "./styles";
import { useRoute, useNavigation } from "@react-navigation/native";

const RestaurantDetailsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const id = route.params?.id;
  const restaurant = restaurants[id - 1];

  return (
    <View style={styles.page}>
      <FlatList
        ListHeaderComponent={<RestaurantHeader restaurant={restaurant} />}
        data={restaurant.dishes}
        renderItem={({ item }) => <DishListItem dish={item} />}
      />
      <View style={styles.iconContainer}>
        <Ionicons
          onPress={() => navigation.goBack()}
          name="arrow-back-circle"
          size={45}
          color="white"
          style={styles.iconContainer}
        />
      </View>
    </View>
  );
};

export default RestaurantDetailsScreen;


