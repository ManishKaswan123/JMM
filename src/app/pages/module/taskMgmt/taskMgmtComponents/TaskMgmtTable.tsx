import React from 'react'
import {FaEdit, FaEye} from 'react-icons/fa'
import {TaskMgmtDetails} from '../taskMgmtInterfaces'
import {taskMgmtTableColumns} from '../taskMgmtConstants'
import GlobalTable from 'sr/helpers/ui-components/Table'

interface Props {
  data?: TaskMgmtDetails[]
  setSelectedData: React.Dispatch<React.SetStateAction<TaskMgmtDetails | null>>
  setIsUpdateModalOpen: (value: boolean) => void
}

const TaskMgmtTable: React.FC<Props> = ({data, setSelectedData, setIsUpdateModalOpen}) => {
  const columns = [
    ...taskMgmtTableColumns,
    {
      label: 'Actions',
      key: 'actions' as keyof TaskMgmtDetails,
      actions: [
        {
          icon: FaEdit,
          onClick: (item: TaskMgmtDetails) => {
            setSelectedData(item)
            setIsUpdateModalOpen(true)
          },
          tooltip: 'Edit',
        },
        {
          icon: FaEye,
          linkPrefix: '/taskmgmt',
          tooltip: 'View',
        },
      ],
    },
  ]

  return <GlobalTable<TaskMgmtDetails> data={data} columns={columns} />
}

export default TaskMgmtTable
