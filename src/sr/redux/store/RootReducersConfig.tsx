import sendOtpReducer from '../slice/sendOtp'
import otpReducer from '../slice/validateOtp'
import uploadFileReducer from '../upload/uploadFileReducer'
import {combineReducers} from 'redux'
import userReducer from '../slice/userSlice'
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
import companyTypeReducer from '../slice/companySlice'
import customerTypeReducer from '../slice/customerSlice'
import checklistTypeReducer from '../slice/checklistSlice'
export const rootReducer = combineReducers({
  sendOtp: sendOtpReducer,
  otp: otpReducer,
  file: uploadFileReducer,
  user: userReducer,
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
  company: companyTypeReducer,
  customer: customerTypeReducer,
  checklist: checklistTypeReducer,
})
