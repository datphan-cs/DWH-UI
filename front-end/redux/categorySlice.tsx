import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface CategoryBasketState {
    items: Category[];
}

const initialState: CategoryBasketState = {
    items: [],
};

export const categorySlice = createSlice({
    name: "categorybasket",
    initialState,
    reducers: {
        addToCategoryBasket: (state: CategoryBasketState, action: PayloadAction<Category>) => {
            state.items = [...state.items, action.payload];
        },
        removeFromCategoryBasket: (
            state: CategoryBasketState,
            action: PayloadAction<{ id: string }>
        ) => {
            const index = state.items.findIndex(
                (item: Category) => item.subcategoryId === action.payload.subcategoryId
            );

            let newCategoryBasket = [...state.items];

            if (index >= 0) {
                newCategoryBasket.splice(index, 1);
            } else {
                console.log(
                    `Cant remove product (id: ${action.payload.subcategoryId}) as its not in basket!`
                );
            }

            state.items = newCategoryBasket;
        },
    },
});

// Action creators are generated for each case reducer function
export const { addToCategoryBasket, removeFromCategoryBasket } = categorySlice.actions;

// Selectors -> retrieving items in state to use in different components
export const selectCategoryBasketItems = (state: RootState) => state.categorybasket.items;
export const selectCategoryBasketItemsWithId = (state: RootState, id: string) => {
    state.categorybasket.items.filter((item: Category) => item.id === id);
};
export default categorySlice.reducer;