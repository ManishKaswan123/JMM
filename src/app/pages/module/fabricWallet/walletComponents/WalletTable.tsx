import React from 'react'
import {FaEdit, FaEye} from 'react-icons/fa'
import {WalletDetails} from '../walletInterfaces'
import {WalletTableColumns} from '../walletConstants'
import GlobalTable from 'sr/helpers/ui-components/Table'

interface Props {
  data?: WalletDetails[]
  setSelectedData: React.Dispatch<React.SetStateAction<WalletDetails | null>>
  setIsUpdateModalOpen: (value: boolean) => void
}

const WalletTable: React.FC<Props> = ({data, setSelectedData, setIsUpdateModalOpen}) => {
  const columns = [
    ...WalletTableColumns,
    {
      label: 'Actions',
      key: 'actions' as keyof WalletDetails,
      actions: [
        {
          icon: FaEdit,
          onClick: (item: WalletDetails) => {
            setSelectedData(item)
            setIsUpdateModalOpen(true)
          },
          tooltip: 'Edit',
        },
        {
          icon: FaEye,
          linkPrefix: '/wallet',
          tooltip: 'View',
          key: 'id',
        },
      ],
    },
  ]
  // console.log('data is ', data)
  return <GlobalTable<WalletDetails> data={data} columns={columns} />
}

export default WalletTable
