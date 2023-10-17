import { createContext, useContext, useState, useEffect } from "react";
import { Text } from "react-native";
import { API, graphqlOperation } from "aws-amplify";
import { useAuthContext } from "./AuthContext";
import { useBasketContext } from "./BasketContext";
import {
  createOrder,
  createOrderDish,
  deleteBasket,
} from "../graphql/mutations";
import { listOrders, getOrder, listOrderDishes } from "../graphql/queries";
import { useNavigation } from "@react-navigation/native";

const OrderContext = createContext({});

const OrderContextProvider = ({ children }) => {
  const { dbUser } = useAuthContext();
  const { restaurant, totalPrice, basketDishes, basket } = useBasketContext();
  const navigation = useNavigation();

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    API.graphql(
      graphqlOperation(listOrders, {
        userID: dbUser?.id,
      })
    ).then((response) => {
      setOrders(response.data.listOrders.items);
    });
  }, [dbUser]);

  const createNewOrder = async () => {
    const newOrder = await API.graphql(
      graphqlOperation(createOrder, {
        input: {
          userID: dbUser.id,
          orderRestaurantId: restaurant.id,
          status: "NEW",
          total: totalPrice,
        },
      })
    );

    // add all basketDishes to order
    await Promise.all(
      basketDishes.map((basketDish) => {
        API.graphql(
          graphqlOperation(createOrderDish, {
            input: {
              quantity: basketDish.quantity,
              orderID: newOrder.data.createOrder.id,
              orderDishDishId: basketDish.Dish.id,
            },
          })
        );
      })
    );

    // delete basket
    await API.graphql(
      graphqlOperation(deleteBasket, { input: { id: basket.id } })
    );
    setOrders([...orders, newOrder.data.createOrder]);
    navigation.goBack();
  };

  const getOrderById = async (id) => {
    const order = await API.graphql(
      graphqlOperation(getOrder, {
        id: id,
      })
    );
    const orderDishes = await API.graphql(
      graphqlOperation(listOrderDishes, {
        filter: {
          orderID: {
            eq: id,
          },
        },
      })
    );
    return { ...order.data.getOrder, dishes: orderDishes };
  };

  return (
    <OrderContext.Provider value={{ createNewOrder, orders, getOrderById }}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContextProvider;

export const useOrderContext = () => useContext(OrderContext);
