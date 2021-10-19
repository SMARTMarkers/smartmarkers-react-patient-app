import { applyMiddleware, createStore } from "redux";

import rootReducer from "./rootReducer";

const middlewares: any = [];

if (process.env.NODE_ENV === `development`) {
  const { logger } = require(`redux-logger`);
  middlewares.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));
