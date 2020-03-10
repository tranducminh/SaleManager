import * as actionsTypes from './actionTypes';

export const addToCart = (productID, price) => ({
  type: actionsTypes.ADD_TO_CART,
  productID,
  price,
});

export const removeFromCart = (productID, price) => ({
  type: actionsTypes.REMOVE_FROM_CART,
  productID,
  price,
});
