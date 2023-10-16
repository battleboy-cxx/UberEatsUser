import React, { createContext, useState, useContext, useEffect } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { useAuthContext } from "./AuthContext";
import {
  getBasketDishes,
  listBaskets,
  createBasketDish,
  createBasket,
} from "./basketContextGraphQL";

const BasketContext = createContext({});

const BasketContextProvider = ({ children }) => {
  const { dbUser } = useAuthContext();

  const [restaurant, setRestaurant] = useState(null);
  const [basket, setBasket] = useState(null);
  const [basketDishes, setBasketDishes] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    console.log("Basket Dishes:", basketDishes); // Check if basketDishes is updating
    console.log("Restaurant:", restaurant); // Check if restaurant is updating
  
    let newTotalPrice = 0;
    basketDishes.forEach((basketDish) => {
      newTotalPrice += basketDish?.data?.createBasketDish?.Dish?.price * basketDish?.data?.createBasketDish?.quantity;
    });
    setTotalPrice(newTotalPrice.toFixed(2));
    console.log("New Total Price:", newTotalPrice);
  }, [basketDishes, restaurant]);
  

  useEffect(() => {
    if (basket) {
      API.graphql(
        graphqlOperation(getBasketDishes, {
          basketID: basket.id,
        })
      ).then((response) => {
        const basketDishes = response.data?.getBasketDishes?.items || [];
        setBasketDishes(basketDishes);
      });
    }
  }, [basket]);

  useEffect(() => {
    if (!restaurant) {
      return;
    }

    API.graphql(
      graphqlOperation(listBaskets, {
        userID: dbUser.id,
        restaurantID: restaurant?.id,
      })
    ).then((baskets) => setBasket(baskets?.data?.listBaskets?.items[0]));
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

    setBasketDishes([...basketDishes, newDish]);
  };

  const createNewBasket = async () => {
    const newBasket = await API.graphql(
      graphqlOperation(createBasket, {
        userID: dbUser.id,
        restaurantID: restaurant.id,
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
        totalPrice
      }}
    >
      {children}
    </BasketContext.Provider>
  );
};

export default BasketContextProvider;

export const useBasketContext = () => useContext(BasketContext);
