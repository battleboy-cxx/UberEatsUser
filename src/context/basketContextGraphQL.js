



export const getBasketDishes = `
    query getBasketDishes($basketID: ID!) {
      getBasket(id: $basketID) {
        id
        BasketDishes {
          items {
            id
            quantity
            basketID
            Dish {
              id
              name
              description
              price
            }
          }
        }
      }
    }
    `;

export const listBaskets = `
query listBaskets($userID: ID!, $restaurantID: ID!) {
  listBaskets(filter: {userID: {eq: $userID}, restaurantID: {eq: $restaurantID}}) {
    items {
      id
      BasketDishes {
        items {
          id
          quantity
          basketID
          Dish {
            id
            name
              description
            price
          }
        }
      }
      userID
      restaurantID
    }
  }
}
`;


export const createBasketDish = `
mutation CreateBasketDish($input: CreateBasketDishInput!) {
  createBasketDish(input: $input) {
    id
    quantity
    Dish {
      id
      name
      description
      price
      restaurantID
    }
    basketID
  }
}
`;

export const createBasket = `
    mutation CreateBasket($userID: ID!, $restaurantID: ID!) {
      createBasket(input: { userID: $userID, restaurantID: $restaurantID }) {
        id
        userID
        restaurantID
        BasketDishes {
          items {
            id
            quantity
            basketID
            Dish {
              id
              name
              description
              price
            }
          }
        }
      }
    }
    `;