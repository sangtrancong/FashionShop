import { configureStore } from "@reduxjs/toolkit";

import productSlice from "./productSlice";
import categorySlice from "./categorySlice";
import brandSlice from "./brandSlice";
import promotionSlice from "./promotionSlice";
import commentSlice from "./commentSlice";
import ratingSlice from "./ratingSlice";
import orderSlice from "./orderSlice";
import userSlice from "./userSlice";
import accountSlice from "./accountSlice";
import dashboardSlice from "./dashboardSlice";

export default configureStore({
    reducer:{
        products: productSlice,
        categorys: categorySlice,
        brands: brandSlice,
        promotions: promotionSlice,
        comments: commentSlice,
        ratings: ratingSlice,
        orders: orderSlice,
        user: userSlice,
        accounts: accountSlice,
        dashboards: dashboardSlice,
    }
});
