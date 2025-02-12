import {statusColors} from 'sr/constants/common'
import {WalletDetails} from './walletInterfaces'
import {getStatusName} from 'sr/helpers/globalHelpers'

export const WalletTableColumns = [
  {
    label: 'Type',
    key: 'type' as keyof WalletDetails,
  },
  {
    label: 'Onwer Type',
    key: 'owner_type' as keyof WalletDetails,
  },
  {
    label: 'Owner Id',
    key: 'owner_id' as keyof WalletDetails,
  },
  {
    label: 'Status',
    key: 'status' as keyof WalletDetails,
    statusColors: statusColors,
    getStatusName,
  },
]

export const WalletSkeletonTableColumns = ['Type', 'Owner Type', 'Owner Id', 'Status', 'Actions']
