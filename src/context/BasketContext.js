import React, { createContext, useState, useContext, useEffect } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { useAuthContext } from "./AuthContext";
import { listBasketDishes, listBaskets } from "../graphql/queries";
import { createBasketDish, createBasket } from "../graphql/mutations";

const BasketContext = createContext({});

const BasketContextProvider = ({ children }) => {
  const { dbUser } = useAuthContext();

  const [restaurant, setRestaurant] = useState(null);
  const [basket, setBasket] = useState(null);
  const [basketDishes, setBasketDishes] = useState([]);

  const totalPrice = basketDishes
    .reduce(
      (total, basketDish) =>
        total + basketDish.quantity * basketDish.Dish.price,
      restaurant?.deliveryFee || 0
    )
    .toFixed(2);

  useEffect(() => {
    if (basket) {
      API.graphql(
        graphqlOperation(listBasketDishes, {
          filter: {
            basketID: {
              eq: basket.id,
            },
          },
        })
      ).then((response) => {
        setBasketDishes(response.data?.listBasketDishes?.items);
      });
    }
  }, [basket]);

  useEffect(() => {
    if (!restaurant) {
      return;
    }

    API.graphql(
      graphqlOperation(listBaskets, {
        filter: {
          userID: {
            eq: dbUser?.id,
          },
          restaurantID: {
            eq: restaurant?.id,
          },
        },
      })
    ).then((baskets) => {
      setBasket(baskets.data.listBaskets.items[0]);
    });
  }, [dbUser, restaurant]);

  const addDishToBasket = async (dish, quantity) => {
    let theBasket = basket || (await createNewBasket());

    const newDish = await API.graphql(
      graphqlOperation(createBasketDish, {
        input: {
          basketID: theBasket?.id,
          basketDishDishId: dish?.id,
          quantity,
        },
      })
    );

    setBasketDishes([...basketDishes, newDish.data.createBasketDish]);
  };

  const createNewBasket = async () => {
    const newBasket = await API.graphql(
      graphqlOperation(createBasket, {
        input: {
          userID: dbUser.id,
          restaurantID: restaurant.id,
        },
      })
    );

    setBasket(newBasket.data.createBasket);
    return newBasket.data.createBasket;
  };

  return (
    <BasketContext.Provider
      value={{
        addDishToBasket,
        setRestaurant,
        basket,
        basketDishes,
        restaurant,
        totalPrice,
      }}
    >
      {children}
    </BasketContext.Provider>
  );
};

export default BasketContextProvider;

export const useBasketContext = () => useContext(BasketContext);
