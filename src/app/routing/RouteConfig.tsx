import TestMultiSelect from 'app/pages/module/test/Test'
import {lazy} from 'react'

const CustomerLocationCard = lazy(
  () => import('app/pages/module/customerLocation/CustomerLocation')
)
const CleanerFavWorkorderCard = lazy(() => import('app/pages/module/favWorkorder/FavWorkorder'))
const CleanerFavJobCard = lazy(() => import('app/pages/module/favJobs/FavJob'))
const IndividualFavCleanerCard = lazy(() => import('app/pages/module/favCleaner/FavCleaner'))
const CompanyAddInfoCard = lazy(() => import('app/pages/module/company/CompanyAddInfo'))
const CleanerJobTypeCard = lazy(() => import('app/pages/module/cleanerJobType/CleanerJobType'))
const CleanerPreferenceCard = lazy(
  () => import('app/pages/module/cleanerPreference/CleanerPreference')
)
const CleanerTrainingCard = lazy(() => import('app/pages/module/cleanerTraining/CleanerTraining'))
const CleanerMedicalCard = lazy(() => import('app/pages/module/cleanerMedical/CleanerMedical'))
const CleanerEmploymentCard = lazy(
  () => import('app/pages/module/cleanerEmployment/CleanerEmployment')
)
const CleanerReferenceCard = lazy(
  () => import('app/pages/module/cleanerReference/CleanerReference')
)
const IndividualJobCategoryCard = lazy(
  () => import('app/pages/module/individualJobCategory/IndividualJobCategory')
)
const IndividualJobCard = lazy(() => import('app/pages/module/individualJob/IndividualJob'))
const IndividualTasklistCard = lazy(
  () => import('app/pages/module/individualTasklist/IndividualTasklist')
)
const IndividualChecklistCard = lazy(
  () => import('app/pages/module/individualChecklist/IndividualChecklist.tsx')
)
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
const CompanyDetailCard = lazy(() => import('app/pages/module/company/CompanyDetail'))
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
  {path: '/customer/details/:customer_id', element: <CustomerDetailsCard />},
  {path: '/customer/checklist/:customer_id', element: <ChecklistCard />},
  {path: '/customer/location/:customer_id', element: <CustomerLocationCard />},
  {path: '/checklist', element: <ChecklistCard />},
  {path: '/checklist/:id', element: <ChecklistDetailsCard />},
  {path: '/workorder', element: <WorkOrder />},
  {path: '/workorder/:id', element: <WorkOrderDetailsCard />},
  {path: '/cleaner', element: <Cleaner />},
  {path: '/cleaner/details/:cleanerId', element: <CleanerDetailsCard />},
  {path: '/cleaner/reference/:cleanerId', element: <CleanerReferenceCard />},
  {path: '/cleaner/employment/:cleanerId', element: <CleanerEmploymentCard />},
  {path: '/cleaner/medical/:cleanerId', element: <CleanerMedicalCard />},
  {path: '/cleaner/training/:cleanerId', element: <CleanerTrainingCard />},
  {path: '/cleaner/preference/:cleanerId', element: <CleanerPreferenceCard />},
  {path: '/cleaner/jobtype/:cleanerId', element: <CleanerJobTypeCard />},
  {path: '/cleaner/favjob/:cleanerId', element: <CleanerFavJobCard />},
  {path: '/cleaner/favworkorder/:cleanerId', element: <CleanerFavWorkorderCard />},
  {path: '/tasklist', element: <TaskList />},
  {path: '/tasklist/:id', element: <TaskListDetailsCard />},
  {path: '/company', element: <Company />},
  {path: '/company/details/:company_id', element: <CompanyDetailCard />},
  {path: '/company/additionalInfo/:company_id', element: <CompanyAddInfoCard />},
  {path: '/company/branch/:company_id', element: <Branch />},
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
  {path: '/user/favcleaner/:userId', element: <IndividualFavCleanerCard />},
  {path: '/notes', element: <Notes />},
  {path: '/message', element: <Messages />},
  {path: '/supervisor', element: <Supervisor />},
  {path: '/address', element: <Address />},
  {path: '/user/address/:userId', element: <Address />},
  {path: '/application', element: <Application />},
  {path: '/application/:id', element: <ApplicationDetailsCard />},
  {path: '/test', element: <TestMultiSelect />},
]
