import React from 'react'
import {FaEdit, FaEye} from 'react-icons/fa'
import {StripeCustomerDetails} from '../stripeCustomerInterfaces'
import {StripeCustomerTableColumns} from '../stripeCustomerConstants'
import GlobalTable from 'sr/helpers/ui-components/Table'

interface Props {
  data?: StripeCustomerDetails[]
  setSelectedData: React.Dispatch<React.SetStateAction<StripeCustomerDetails | null>>
  setIsUpdateModalOpen: (value: boolean) => void
}

const StripeCustomerTable: React.FC<Props> = ({data, setSelectedData, setIsUpdateModalOpen}) => {
  const columns = [
    ...StripeCustomerTableColumns,
    {
      label: 'Actions',
      key: 'actions' as keyof StripeCustomerDetails,
      actions: [
        {
          icon: FaEdit,
          onClick: (item: StripeCustomerDetails) => {
            setSelectedData(item)
            setIsUpdateModalOpen(true)
          },
          tooltip: 'Edit',
        },
        {
          icon: FaEye,
          linkPrefix: '/stripecustomer',
          tooltip: 'View',
        },
      ],
    },
  ]

  return <GlobalTable<StripeCustomerDetails> data={data} columns={columns} />
}

export default StripeCustomerTable
