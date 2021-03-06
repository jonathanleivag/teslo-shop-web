import { configureStore } from '@reduxjs/toolkit'
import {
  menuReducer,
  cartReducer,
  productReducer,
  userReducer,
  addressReducer,
  orderReducer
} from './features'

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    cart: cartReducer,
    product: productReducer,
    user: userReducer,
    address: addressReducer,
    order: orderReducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
