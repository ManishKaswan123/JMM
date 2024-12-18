// src/hooks/useActions.ts
import {useDispatch} from 'react-redux'
import {bindActionCreators} from 'redux'
import {fetchUserData} from '../../redux/action/userActions'
import {fetchCategoryType} from 'sr/redux/action/categoryActions'
import {fetchOrderData} from 'sr/redux/action/orderAction'
import {fetchTransactionData} from 'sr/redux/action/transactionAction'
import {fetchProductData} from 'sr/redux/action/productActions'
import {fetchSubCatData} from 'sr/redux/action/subCatActions'
import {fetch86Action} from 'sr/redux/action/eightySixAction'
import {fetchRewardPlanMap} from 'sr/redux/action/rewardPlanActions'
import {fetchRewardPointMap} from 'sr/redux/action/rewardPointActions'
import {fetchCompanyData} from 'sr/redux/action/companyActions'
import {fetchCustomersData} from 'sr/redux/action/customerActions'
import {fetchChecklistData} from 'sr/redux/action/checklistActions'
import {fetchBusinessTypeData} from 'sr/redux/action/businessTypeActions'

export const useActions = () => {
  const dispatch = useDispatch()
  return bindActionCreators(
    {
      fetchUserData,
      fetchBusinessTypeData,
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
