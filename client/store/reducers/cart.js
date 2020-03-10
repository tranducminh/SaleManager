import {updateObject} from '../../ultility';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
  quantity: 0,
  arrayID: [],
  total: 0,
};

const addToCart = (state, action) => {
  return updateObject(state, {
    quantity: state.quantity + 1,
    arrayID: [...state.arrayID, action.productID],
    total: state.total + action.price,
  });
};

const removeFromCart = (state, action) => {
  let tempArrayID = state.arrayID;
  let index = tempArrayID.indexOf(action.productID);
  if (index > -1) {
    tempArrayID.splice(index, 1);
  }
  return updateObject(state, {
    quantity: state.quantity - 1,
    arrayID: tempArrayID,
    total: state.total - action.price,
  });
};
export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      return addToCart(state, action);
    case actionTypes.REMOVE_FROM_CART:
      return removeFromCart(state, action);
    default: {
      return {...state};
    }
  }
};
