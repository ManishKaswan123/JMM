import React from 'react'
import {FaEdit, FaEye} from 'react-icons/fa'
import {StripeCardDetails} from '../stripeCardInterfaces'
import {StripeCardTableColumns} from '../stripeCardConstants'
import GlobalTable from 'sr/helpers/ui-components/Table'

interface Props {
  data?: StripeCardDetails[]
  setSelectedData: React.Dispatch<React.SetStateAction<StripeCardDetails | null>>
  setIsUpdateModalOpen: (value: boolean) => void
}

const StripeCardTable: React.FC<Props> = ({data, setSelectedData, setIsUpdateModalOpen}) => {
  const columns = [
    ...StripeCardTableColumns,
    // {
    //   label: 'Actions',
    //   key: 'actions' as keyof StripeCardDetails,
    //   actions: [
    //     {
    //       icon: FaEdit,
    //       onClick: (item: StripeCardDetails) => {
    //         setSelectedData(item)
    //         setIsUpdateModalOpen(true)
    //       },
    //       tooltip: 'Edit',
    //     },
    //     {
    //       icon: FaEye,
    //       linkPrefix: '/stripe',
    //       tooltip: 'View',
    //     },
    //   ],
    // },
  ]
  // console.log('data is ', data)
  return <GlobalTable<StripeCardDetails> data={data} columns={columns} />
}

export default StripeCardTable
