import {configureStore} from '@reduxjs/toolkit'
import sendOtpReducer from '../slice/sendOtp'
import otpReducer from '../slice/validateOtp'
import uploadFileReducer from '../upload/uploadFileReducer'
import {combineReducers} from 'redux'
import userReducer from '../slice/userSlice' // Import the new user slice
import businessTypeReducer from '../slice/buninessTypeSlice'
import categoryTypeReducer from '../slice/categorySlice'
import orderTypeReducer from '../slice/orderSlice'
import transactionTypeReducer from '../slice/transactionSlice'
import productTypeReducer from '../slice/productSlice'
import subCatTypeReducer from '../slice/subCatSlice'
import loginUserSlice from '../slice/loginUserSlice'
import eightySixTypeReducer from '../slice/eightySixSlice'
import rewardPlanMapTypeReducer from '../slice/rewardPlanMapSlice'
import rewardPointMapTypeReducer from '../slice/rewardPointMapSlice'
const rootReducer = combineReducers({
  sendOtp: sendOtpReducer,
  otp: otpReducer,
  file: uploadFileReducer,
  user: userReducer, // Add the user slice to the root reducer
  businessType: businessTypeReducer,
  categoryType: categoryTypeReducer,
  order: orderTypeReducer,
  transaction: transactionTypeReducer,
  product: productTypeReducer,
  subCat: subCatTypeReducer,
  loginUser: loginUserSlice,
  eightySix: eightySixTypeReducer,
  rewardPlanMap: rewardPlanMapTypeReducer,
  rewardPointMap: rewardPointMapTypeReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(), // .concat(logger),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
