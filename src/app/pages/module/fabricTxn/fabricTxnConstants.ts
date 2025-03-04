import {FabricTxnDetails} from './fabricTxnInterfaces'

export const fabricTxnTableColumns = [
  // {
  //   label: 'Workorder',
  //   key: 'workorder_id' as keyof FabricTxnDetails,
  //   linkProps: {
  //     isLink: true,
  //     linkPrefix: '/workorder',
  //     linkValueKey: 'title',
  //   },
  // },
  {
    label: 'Reciever',
    key: 'to' as keyof FabricTxnDetails,
  },
  {
    label: 'From',
    key: 'from' as keyof FabricTxnDetails,
  },
  {
    label: 'Amount',
    key: 'amount' as keyof FabricTxnDetails,
  },
  {
    label: 'Token',
    key: 'tokenId' as keyof FabricTxnDetails,
  },

  {
    label: 'Last 4',
    key: 'last4' as keyof FabricTxnDetails,
  },
  {
    label: 'Brand',
    key: 'brand' as keyof FabricTxnDetails,
  },
  {
    label: 'Type',
    key: 'type' as keyof FabricTxnDetails,
  },
]
export const fabricTxnSkeletonTableColumns = [
  'Reciever',
  'From',
  'Amount',
  'Token',
  'Last 4',
  'Brand',
  'Type',
  'Actions',
]
