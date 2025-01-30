export interface NavItem {
  label: string
  path: string
  name: string
  iconPath: string
}
export const userNavItems: NavItem[] = [
  {
    label: 'Details',
    path: 'user/details',
    name: 'details',
    iconPath: 'M12 4v16m8-8H4', // Plus icon
  },
  {
    label: 'Address',
    path: 'user/address',
    name: 'address',
    iconPath: 'M12 2C8.134 2 5 5.134 5 9c0 3.865 7 13 7 13s7-9.135 7-13c0-3.866-3.134-7-7-7z', // Location pin
  },
  {
    label: 'Job',
    path: '/user/job',
    name: 'job',
    iconPath: 'M3 12h18M9 3v18', // Wallet outline
  },
  {
    label: 'Checklists',
    path: '/user/checklist',
    name: 'checklist',
    iconPath: 'M3 12h18M9 3v18', // Wallet outline
  },
  {
    label: 'Tasklist',
    path: '/user/tasklist',
    name: 'tasklist',
    iconPath: 'M3 12h18M9 3v18', // Wallet outline
  },

  {
    label: 'Job Category',
    path: '/user/jobCategory',
    name: 'jobCategory',
    iconPath: 'M3 12h18M9 3v18', // Wallet outline
  },
  {
    label: 'Favorite Cleaner',
    path: '/user/favcleaner',
    name: 'favcleaner',
    iconPath: 'M3 12h18M9 3v18', // Wallet outline
  },
]
export const cleanerNavItems: NavItem[] = [
  {
    label: 'Details',
    path: 'cleaner/details',
    name: 'details',
    iconPath: 'M12 4v16m8-8H4', // Plus icon
  },
  {
    label: 'Applied Jobs',
    path: 'cleaner/appliedjobs',
    name: 'appliedjobs',
    iconPath: 'M12 4v16m8-8H4', // Plus icon
  },
  {
    label: 'Saved Jobs',
    path: 'cleaner/savedjob',
    name: 'savedjob',
    iconPath: 'M12 4v16m8-8H4', // Plus icon
  },
  {
    label: 'Workorder',
    path: 'cleaner/workorder',
    name: 'workorder',
    iconPath: 'M12 4v16m8-8H4', // Plus icon
  },
  {
    label: 'Applied Workorder',
    path: 'cleaner/appliedwordorder',
    name: 'appliedwordorder',
    iconPath: 'M12 4v16m8-8H4', // Plus icon
  },
  {
    label: 'Saved Workorder',
    path: 'cleaner/savedworkorder',
    name: 'savedworkorder',
    iconPath: 'M12 4v16m8-8H4', // Plus icon
  },
  {
    label: 'Proposal Details',
    path: 'cleaner/proposaldetails',
    name: 'proposaldetails',
    iconPath: 'M12 4v16m8-8H4', // Plus icon
  },
  {
    label: 'Reference',
    path: 'cleaner/reference',
    name: 'reference',
    iconPath: 'M12 4v16m8-8H4', // Plus icon
  },
  {
    label: 'Employment',
    path: 'cleaner/employment',
    name: 'employment',
    iconPath: 'M12 4v16m8-8H4', // Plus icon
  },
  {
    label: 'Medical',
    path: 'cleaner/medical',
    name: 'medical',
    iconPath: 'M12 4v16m8-8H4', // Plus icon
  },
  {
    label: 'Training',
    path: 'cleaner/training',
    name: 'training',
    iconPath: 'M12 4v16m8-8H4', // Plus icon
  },
  {
    label: 'Preference',
    path: 'cleaner/preference',
    name: 'preference',
    iconPath: 'M12 4v16m8-8H4', // Plus icon
  },
  {
    label: 'Job Type',
    path: 'cleaner/jobtype',
    name: 'jobtype',
    iconPath: 'M12 4v16m8-8H4', // Plus icon
  },
]

export const companyNavItems: NavItem[] = [
  {
    label: 'Details',
    path: 'company/details',
    name: 'details',
    iconPath: 'M12 4v16m8-8H4', // Plus icon
  },
  {
    label: 'Additional Info',
    path: 'company/additionalInfo',
    name: 'additionalInfo',
    iconPath: 'M12 4v16m8-8H4', // Plus icon
  },
  {
    label: 'Branch',
    path: 'company/branch',
    name: 'branch',
    iconPath: 'M12 4v16m8-8H4', // Plus icon
  },
]
export const customerNavItems: NavItem[] = [
  {
    label: 'Details',
    path: 'customer/details',
    name: 'details',
    iconPath: 'M12 4v16m8-8H4', // Plus icon
  },
  {
    label: 'Location',
    path: 'customer/location',
    name: 'location',
    iconPath: 'M12 4v16m8-8H4', // Plus icon
  },
  {
    label: 'Address',
    path: 'customer/address',
    name: 'address',
    iconPath: 'M12 4v16m8-8H4', // Plus icon
  },

  {
    label: 'Contacts',
    path: 'customer/contacts',
    name: 'contacts',
    iconPath: 'M12 4v16m8-8H4', // Plus icon
  },
  {
    label: 'Checklists',
    path: 'customer/checklist',
    name: 'checklist',
    iconPath: 'M12 4v16m8-8H4', // Plus icon
  },
  {
    label: 'Tasklists',
    path: 'customer/tasklist',
    name: 'tasklist',
    iconPath: 'M12 4v16m8-8H4', // Plus icon
  },
]
