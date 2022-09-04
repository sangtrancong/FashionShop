import { configureStore } from "@reduxjs/toolkit";

import homeSlice from "./homeSlice";
import shopSlice from "./shopSlice";
import userSlice from "./userSlice";
import cartSlice from "./cartSlice";
import orderSlice from "./orderSlice";
import querySlice from "./querySlice";

export default configureStore({
    reducer:{
        home: homeSlice,
        shop: shopSlice,
        user: userSlice,
        cart: cartSlice,
        order: orderSlice,
        query: querySlice,
    }
});
