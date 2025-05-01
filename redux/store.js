import { combineReducers, configureStore } from "@reduxjs/toolkit";
import taskReducer from './taskslice';
import { persistReducer, persistStore } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

const persistConfig= {
    key : "root",
    storage :  AsyncStorage,
}

const rootReducer=combineReducers({
    tasks: taskReducer,
})

const persistedReducer = persistReducer(persistConfig,rootReducer)

const store = configureStore({
    reducer:persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
    }),
})

export const persistor = persistStore(store)
export default store

// export default configureStore({
//     reducer:{
//     },
// });