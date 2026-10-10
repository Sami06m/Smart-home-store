import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

interface WishlistState {
  productIds: string[];
}

const initialState: WishlistState = {
  productIds: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    toggleWishlist: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      const index = state.productIds.indexOf(productId);

      if (index === -1) {
        state.productIds.push(productId);
      } else {
        state.productIds.splice(index, 1);
      }
    },
  },
});

export const { toggleWishlist } = wishlistSlice.actions;
export function selectIsInWishlist(productId: string) {
  return function (state: RootState): boolean {
    return state.wishlist.productIds.includes(productId);
  };
}
export default wishlistSlice.reducer;
