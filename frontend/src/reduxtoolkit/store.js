import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "./api/apiSlice";
import authReducer from "./features/auth/authSlice";
import favoritesReducer from "../reduxtoolkit/features/favorites/favoriteSlice";
import cartSliceReducer from "../reduxtoolkit/features/cart/cartSlice";
import shopReducer from "../reduxtoolkit/features/shop/shopSlice";
import { getFavoritesFromLocalStorage } from "../Utils/localStorage";

const initialFavorites = getFavoritesFromLocalStorage() || [];

const store = configureStore({
	reducer: {
		[apiSlice.reducerPath]: apiSlice.reducer,
		auth: authReducer,
		favorites: favoritesReducer,
		cart: cartSliceReducer,
		shop: shopReducer,
	},

	preloadedState: {
		favorites: initialFavorites,
	},

	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
	devTools: true,
});

setupListeners(store.dispatch);
export default store;