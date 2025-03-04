import React from 'react'
import {FaEdit, FaEye} from 'react-icons/fa'
import {FeedbackDetails} from '../feedbackInterfaces'
import {FeedbackTableColumns} from '../feedbackConstants'
import GlobalTable from 'sr/helpers/ui-components/Table'

interface Props {
  data?: FeedbackDetails[]
  setSelectedData: React.Dispatch<React.SetStateAction<FeedbackDetails | null>>
  setIsUpdateModalOpen: (value: boolean) => void
}

const FeedbackTable: React.FC<Props> = ({data, setSelectedData, setIsUpdateModalOpen}) => {
  const columns = [
    ...FeedbackTableColumns,
    {
      label: 'Actions',
      key: 'actions' as keyof FeedbackDetails,
      actions: [
        {
          icon: FaEdit,
          onClick: (item: FeedbackDetails) => {
            setSelectedData(item)
            setIsUpdateModalOpen(true)
          },
          tooltip: 'Edit',
        },
        {
          icon: FaEye,
          linkPrefix: '/Feedback',
          tooltip: 'View',
          key: 'id',
        },
      ],
    },
  ]

  return <GlobalTable<FeedbackDetails> data={data} columns={columns} />
}

export default FeedbackTable
