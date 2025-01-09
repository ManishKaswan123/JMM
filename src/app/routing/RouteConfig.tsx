import {lazy} from 'react'

const IndividualJobCategoryCard = lazy(
  () => import('app/pages/module/individualJobCategory/IndividualJobCategory.tsx')
)
const IndividualJobCard = lazy(() => import('app/pages/module/individualJob/IndividualJob.tsx'))
const IndividualTasklistCard = lazy(
  () => import('app/pages/module/individualTasklist/IndividualTasklist.tsx')
)
const IndividualChecklistCard = lazy(
  () => import('app/pages/module/individualChecklist/IndividualChecklist.tsx')
)
const BranchDetailsCard = lazy(() => import('app/pages/module/companyBranch/BranchDetails'))
const Branch = lazy(() => import('app/pages/module/companyBranch/Branch'))
const ContractorDetailsCard = lazy(() => import('app/pages/module/contractor/ContractorDetails'))
const ApplicationDetailsCard = lazy(
  () => import('app/pages/module/applications/ApplicationDetails')
)
const ProposalDetailCard = lazy(() => import('app/pages/module/proposalDetails/ProposalDetails'))
const WorkOrderDetailsCard = lazy(() => import('app/pages/module/workOrder/WorkOrderDetails'))
const TaskListDetailsCard = lazy(() => import('app/pages/module/taskList/TaskListDetails'))
const ChecklistDetailsCard = lazy(() => import('app/pages/module/checklist/ChecklistDetails'))
const ChecklistCard = lazy(() => import('app/pages/module/checklist/Checklist.tsx'))
const CustomerCard = lazy(() => import('app/pages/module/customer/Customer.tsx'))
const CustomerDetailsCard = lazy(() => import('app/pages/module/customer/CustomerDetails'))
const CleanerDetailsCard = lazy(() => import('app/pages/module/cleaner/CleanerDetails'))
const UserDetailCard = lazy(() => import('app/pages/module/user/UserDetail'))
const JobDetailsCard = lazy(() => import('app/pages/module/jobs/JobDetails'))
const Address = lazy(() => import('app/pages/module/address/Address'))
const BusinessCategory = lazy(() => import('app/pages/module/masterData/business/Business'))
const User = lazy(() => import('app/pages/module/user/User'))
const Jobs = lazy(() => import('app/pages/module/jobs/Jobs'))
const WorkOrder = lazy(() => import('app/pages/module/workOrder/WorkOrder'))
const Cleaner = lazy(() => import('app/pages/module/cleaner/Cleaner'))
const TaskList = lazy(() => import('app/pages/module/taskList/TaskList'))
const Company = lazy(() => import('app/pages/module/company/Company'))
const CompanyDetail = lazy(() => import('app/pages/module/company/CompanyDetail'))
// const Task = lazy(() => import('app/pages/module/task/Task'))
const ProposalDetails = lazy(() => import('app/pages/module/proposalDetails/ProposalDetails'))
const Contractor = lazy(() => import('app/pages/module/contractor/Contractor'))
const Messages = lazy(() => import('app/pages/module/messages/Messages'))
const Notes = lazy(() => import('app/pages/module/notes/Notes'))
const Supervisor = lazy(() => import('app/pages/module/supervisor/Supervisor'))
const Application = lazy(() => import('app/pages/module/applications/Application'))

export const routeConfigs = [
  {path: '/business-category', element: <BusinessCategory />},
  {path: '/job', element: <Jobs />},
  {path: '/job/:id', element: <JobDetailsCard />},
  {path: '/customer', element: <CustomerCard />},
  {path: '/customer/:id', element: <CustomerDetailsCard />},
  {path: '/checklist', element: <ChecklistCard />},
  {path: '/checklist/:id', element: <ChecklistDetailsCard />},
  {path: '/workorder', element: <WorkOrder />},
  {path: '/workorder/:id', element: <WorkOrderDetailsCard />},
  {path: '/cleaner', element: <Cleaner />},
  {path: '/cleaner/:id', element: <CleanerDetailsCard />},
  {path: '/tasklist', element: <TaskList />},
  {path: '/tasklist/:id', element: <TaskListDetailsCard />},
  {path: '/company', element: <Company />},
  {path: '/company/:id', element: <CompanyDetail />},
  {path: '/company/branch', element: <Branch />},
  {path: '/company/branch/:id', element: <BranchDetailsCard />},
  //   {path: '/task', element: <Task />},
  {path: '/proposaldetails', element: <ProposalDetails />},
  {path: '/proposaldetails/:id', element: <ProposalDetailCard />},
  {path: '/contractor', element: <Contractor />},
  {path: '/contractor/:id', element: <ContractorDetailsCard />},
  {path: '/user', element: <User />},
  {path: '/user/details/:userId', element: <UserDetailCard />},
  {path: '/user/checklist/:userId', element: <IndividualChecklistCard />},
  {path: '/user/tasklist/:userId', element: <IndividualTasklistCard />},
  {path: '/user/job/:userId', element: <IndividualJobCard />},
  {path: '/user/jobCategory/:userId', element: <IndividualJobCategoryCard />},
  {path: '/notes', element: <Notes />},
  {path: '/message', element: <Messages />},
  {path: '/supervisor', element: <Supervisor />},
  {path: '/address', element: <Address />},
  {path: '/user/address/:userId', element: <Address />},
  {path: '/application', element: <Application />},
  {path: '/application/:id', element: <ApplicationDetailsCard />},
]
