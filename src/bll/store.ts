import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import { mainReducer } from "./mainReducer";

const rootReducer = combineReducers({
    main: mainReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type AppRootReducer = ReturnType<typeof rootReducer>;