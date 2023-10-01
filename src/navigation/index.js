import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import HomeScreen from "../../src/screens/HomeScreen";
import RestaurantDetailsScreen from "../../src/screens/RestaurantDetailsScreen";
import DishDetailsScreen from "../../src/screens/DishDetailScreen";
import BasketScreen from "../../src/screens/BasketScreen";
import OrdersScreen from "../../src/screens/OrdersScreen";
import OrderDetailHeader from "../../src/screens/OrderDetailsScreen";

import { Foundation, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import OrderDetails from "../../src/screens/OrderDetailsScreen";

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="HomeTabs" component={HomeTabs} />
    </Stack.Navigator>
  );
};

const Tab = createMaterialBottomTabNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator barStyle={{ backgroundColor: "white" }}>
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
        component={OrdersScreen}
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
          name="Orders"
          component={OrdersScreen}
        ></OrdersStack.Screen>
        <OrdersStack.Screen
          name="Order"
          component={OrderDetails}
        ></OrdersStack.Screen>

      </OrdersStack.Navigator>
    );
  };

export default RootNavigator;
