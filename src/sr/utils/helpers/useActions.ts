// src/hooks/useActions.ts
import {useDispatch} from 'react-redux'
import {bindActionCreators} from 'redux'
import {fetchUserData} from '../../redux/action/userActions'
import {fetchBusinessType} from 'sr/redux/action/businessTypeActions'
import {fetchCategoryType} from 'sr/redux/action/categoryActions'
import {fetchOrderData} from 'sr/redux/action/orderAction'
import {fetchTransactionData} from 'sr/redux/action/transactionAction'
// import {fetchProduct} from '../api/fetchProduct'
import {fetchProductData} from 'sr/redux/action/productActions'
import {fetchSubCatData} from 'sr/redux/action/subCatActions'
import {fetch86Action} from 'sr/redux/action/eightySixAction'
import {fetchRewardPlanMap} from 'sr/redux/action/rewardPlanActions'
import {fetchRewardPointMap} from 'sr/redux/action/rewardPointActions'
import {fetchCompanyData} from 'sr/redux/action/companyActions'
import {fetchCustomersData} from 'sr/redux/action/customerActions'
import {fetchChecklistData} from 'sr/redux/action/checklistActions'

export const useActions = () => {
  const dispatch = useDispatch()
  return bindActionCreators(
    {
      fetchUserData,
      fetchBusinessType,
      fetchCategoryType,
      fetchOrderData,
      fetchTransactionData,
      fetchProductData,
      fetchSubCatData,
      fetch86Action,
      fetchRewardPlanMap,
      fetchRewardPointMap,
      fetchCompanyData,
      fetchCustomersData,
      fetchChecklistData,
    },
    dispatch
  )
}
