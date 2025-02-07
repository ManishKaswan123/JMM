import React from 'react'
import {FaEdit, FaEye} from 'react-icons/fa'
import {TaskTrackDetails} from '../taskTrackInterfaces'
import {taskTrackTableColumns} from '../taskTrackConstants'
import GlobalTable from 'sr/helpers/ui-components/Table'

interface Props {
  data?: TaskTrackDetails[]
  setSelectedData: React.Dispatch<React.SetStateAction<TaskTrackDetails | null>>
  setIsUpdateModalOpen: (value: boolean) => void
}

const TaskTrackTable: React.FC<Props> = ({data, setSelectedData, setIsUpdateModalOpen}) => {
  const columns = [
    ...taskTrackTableColumns,
    {
      label: 'Actions',
      key: 'actions' as keyof TaskTrackDetails,
      actions: [
        {
          icon: FaEdit,
          onClick: (item: TaskTrackDetails) => {
            setSelectedData(item)
            setIsUpdateModalOpen(true)
          },
          tooltip: 'Edit',
        },
        {
          icon: FaEye,
          linkPrefix: '/tasktrack',
          tooltip: 'View',
        },
      ],
    },
  ]

  return <GlobalTable<TaskTrackDetails> data={data} columns={columns} />
}

export default TaskTrackTable
