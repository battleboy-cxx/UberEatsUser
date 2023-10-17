import { ActivityIndicator } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../../src/screens/HomeScreen";
import RestaurantDetailsScreen from "../../src/screens/RestaurantDetailsScreen";
import DishDetailsScreen from "../../src/screens/DishDetailScreen";
import BasketScreen from "../../src/screens/BasketScreen";
import OrdersScreen from "../../src/screens/OrdersScreen";

import { Foundation, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import OrderDetails from "../../src/screens/OrderDetailsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { useAuthContext } from "../context/AuthContext";

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const { dbUser } = useAuthContext();

  // if (!dbUser) {
  //   return <ActivityIndicator size={"large"} color="gray" />;
  // }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {dbUser ? (
        <Stack.Screen name="HomeTabs" component={HomeTabs} />
      ) : (
        <Stack.Screen name="Profile" component={ProfileScreen} />
      )}
    </Stack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      barStyle={{ backgroundColor: "white" }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: (color) => (
            <Foundation name="home" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Orders"
        component={OrdersStackNavigator}
        options={{
          tabBarIcon: (color) => (
            <MaterialIcons name="list-alt" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: (color) => (
            <FontAwesome5 name="user-alt" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const HomeStack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Restaurants"
        component={HomeScreen}
      ></HomeStack.Screen>
      <HomeStack.Screen
        name="Restaurant"
        component={RestaurantDetailsScreen}
        options={{ headerShown: false }}
      ></HomeStack.Screen>
      <HomeStack.Screen
        name="Dish"
        component={DishDetailsScreen}
      ></HomeStack.Screen>
      <HomeStack.Screen
        name="Basket"
        component={BasketScreen}
      ></HomeStack.Screen>
    </HomeStack.Navigator>
  );
};

const OrdersStack = createNativeStackNavigator();

const OrdersStackNavigator = () => {
  return (
    <OrdersStack.Navigator>
      <OrdersStack.Screen
        name="OrdersList"
        component={OrdersScreen}
      ></OrdersStack.Screen>
      <OrdersStack.Screen
        name="OrderDetails"
        component={OrderDetails}
      ></OrdersStack.Screen>
    </OrdersStack.Navigator>
  );
};

export default RootNavigator;
