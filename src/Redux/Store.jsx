import { combineReducers, createStore } from "redux";
import itemReducer from "./Itemreducer";
import cartReducer from "./CartReducer";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

 

const rootReducer = combineReducers({
    itemStore: itemReducer,
    cartStore: cartReducer
})

const persistConfig = {
    key: 'root',
    storage,
  }

const myPersistedReducer = persistReducer(persistConfig, rootReducer)

export const mystore = createStore(myPersistedReducer)
export const myPersistor = persistStore(mystore)
