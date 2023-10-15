import React, { createContext, useContext } from "react";
import { API, graphqlOperation } from "aws-amplify";

const BasketContext = createContext({});

const BasketContextProvider = ({ children }) => {
    const addDishToBasket = (dish, quantity) => {
        
    };

  return <BasketContext.Provider value={{addDishToBasket}}>{children}</BasketContext.Provider>;
};

export default BasketContextProvider;

export const useBasketContext = () => useContext(BasketContext);