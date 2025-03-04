import React from 'react'
import {FaEdit, FaEye} from 'react-icons/fa'
import {FabricTxnDetails} from '../fabricTxnInterfaces'
import {fabricTxnTableColumns} from '../fabricTxnConstants'
import GlobalTable from 'sr/helpers/ui-components/Table'

interface Props {
  data?: FabricTxnDetails[]
  setSelectedData: React.Dispatch<React.SetStateAction<FabricTxnDetails | null>>
  setIsUpdateModalOpen: (value: boolean) => void
}

const FabricTxnTable: React.FC<Props> = ({data, setSelectedData, setIsUpdateModalOpen}) => {
  const columns = [
    ...fabricTxnTableColumns,
    {
      label: 'Actions',
      key: 'actions' as keyof FabricTxnDetails,
      actions: [
        {
          icon: FaEdit,
          onClick: (item: FabricTxnDetails) => {
            setSelectedData(item)
            setIsUpdateModalOpen(true)
          },
          tooltip: 'Edit',
        },
        {
          icon: FaEye,
          linkPrefix: '/fabrictxn',
          tooltip: 'View',
        },
      ],
    },
  ]

  return <GlobalTable<FabricTxnDetails> data={data} columns={columns} />
}

export default FabricTxnTable
