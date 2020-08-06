import { createStore, applyMiddleware } from 'redux';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import thunkMiddleware from 'redux-thunk';
import data from './data/data.json';

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension');
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
}

// initial state
const initialState = {
  cards: [],
};

//Actions
export const initialCards = () => ({
  type: 'INITIAL_CARDS',
  cards: data,
});

export const addItem = (item) => ({
  type: 'ADD',
  item,
});

// reducers
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      return {
        ...state,
        cards: action.payload.cards,
      };
    case 'INITIAL_CARDS':
      return {
        ...state,
        cards: action.cards,
      };
    case 'ADD':
      return {
        ...state,
        cards: [
          ...state.cards,
          action.item
        ],
      };
    default:
      return state;
  }
}

// create store
export const initStore = (initialState = initialState) => {
  return createStore(
    reducer,
    initialState,
    bindMiddleware([thunkMiddleware])
  );
}

// export an assembled wrapper
export const wrapper = createWrapper(initStore);
