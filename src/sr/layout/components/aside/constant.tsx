export const masterMenuItems: {label: string; path: string; iconPath: string}[] = [
  {
    label: 'Business Category',
    path: '/business-category',
    iconPath: 'M9 12h6m2 4H7m12-8H5m16 8a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  {
    label: 'Job Application',
    path: '/application',
    iconPath:
      'M8 2H16C17.1046 2 18 2.89543 18 4V20C18 21.1046 17.1046 22 16 22H8C6.89543 22 6 21.1046 6 20V4C6 2.89543 6.89543 2 8 2ZM8 0C5.79086 0 4 1.79086 4 4V20C4 22.2091 5.79086 24 8 24H16C18.2091 24 20 22.2091 20 20V4C20 1.79086 18.2091 0 16 0H8ZM9 7H15V9H9V7ZM9 11H15V13H9V11ZM9 15H13V17H9V15Z',
  },
  {
    label: 'Checklists',
    path: '/checklist',
    iconPath:
      'M17 9V7a4 4 0 00-8 0v2M5 20h14a2 2 0 002-2v-5a2 2 0 00-2-2H5a2 2 0 00-2 2v5a2 2 0 002 2z',
  },
  {
    label: 'Address',
    path: '/address',
    iconPath:
      'M17 9V7a4 4 0 00-8 0v2M5 20h14a2 2 0 002-2v-5a2 2 0 00-2-2H5a2 2 0 00-2 2v5a2 2 0 002 2z',
  },
  {
    label: 'Jobs',
    path: '/job',
    iconPath:
      'M17 9V7a4 4 0 00-8 0v2M5 20h14a2 2 0 002-2v-5a2 2 0 00-2-2H5a2 2 0 00-2 2v5a2 2 0 002 2z',
  },
  {
    label: 'Task',
    path: '/task',
    iconPath: 'M5 13l4 4L19 7M5 3v6m0 0h6',
  },
  {
    label: 'Task Management',
    path: '/taskmgmt',
    iconPath: 'M5 13l4 4L19 7M5 3v6m0 0h6',
  },
  {
    label: 'Task Track',
    path: '/tasktrack',
    iconPath: 'M5 13l4 4L19 7M5 3v6m0 0h6',
  },

  {
    label: 'Workorder',
    path: '/workorder',
    iconPath: 'M9 17v-2a4 4 0 00-8 0v2h8zm13 0v-2a4 4 0 00-8 0v2h8zm-13 4h8m-8-2h8m0-2H6',
  },
  {
    label: 'Workorder Application',
    path: '/workorderapplication',
    iconPath: 'M9 17v-2a4 4 0 00-8 0v2h8zm13 0v-2a4 4 0 00-8 0v2h8zm-13 4h8m-8-2h8m0-2H6',
  },
]
/**
 * An array of objects representing the menu items for the application.
 * Each menu item contains the following properties:
 *
 * @property {string} label - The display name of the menu item.
 * @property {string} path - The URL path to navigate to when the menu item is clicked.
 * @property {string} iconPath - The SVG path data for the icon associated with the menu item.
 *
 * Example usage:
 *
 * ```typescript
 * const menuItems = normalMenuItems.map(item => (
 *   <MenuItem key={item.path} label={item.label} path={item.path} iconPath={item.iconPath} />
 * ));
 * ```
 */
export const normalMenuItems = [
  {
    label: 'Individuals',
    path: '/user',
    iconPath:
      'M17 9V7a4 4 0 00-8 0v2M5 20h14a2 2 0 002-2v-5a2 2 0 00-2-2H5a2 2 0 00-2 2v5a2 2 0 002 2z',
  },

  {
    label: 'Customers',
    path: '/customer',
    iconPath:
      'M17 9V7a4 4 0 00-8 0v2M5 20h14a2 2 0 002-2v-5a2 2 0 00-2-2H5a2 2 0 00-2 2v5a2 2 0 002 2z',
  },
  {
    label: 'Stripe Customers',
    path: '/stripecustomer',
    iconPath:
      'M17 9V7a4 4 0 00-8 0v2M5 20h14a2 2 0 002-2v-5a2 2 0 00-2-2H5a2 2 0 00-2 2v5a2 2 0 002 2z',
  },

  {
    label: 'Cleaner',
    path: '/cleaner',
    iconPath:
      'M16.5 4.5l3 3m-2.121-2.121L8.25 16.5m5.25-11.25l-2.121 2.121M9.5 20.5H6l1.5-4.5 7.121-7.121 2.121 2.121L9.5 20.5z',
  },
  {
    label: 'Company',
    path: '/company',
    iconPath: 'M4 6h16M4 10h16M10 14h10M4 14h4v7H4z',
  },

  // {
  //   label: 'Company Branch',
  //   path: '/company/branch',
  //   iconPath: 'M4 6h16M4 10h16M10 14h10M4 14h4v7H4z',
  // },

  // {
  //   label: 'Task',
  //   path: '/task',
  //   iconPath: 'M8 7h8M8 11h8M8 15h8M8 19h8',
  // },
  // {
  //   label: 'Proposal Details',
  //   path: '/proposaldetails',
  //   iconPath: 'M6 5h12M6 10h12M6 15h8M6 20h4',
  // },

  {
    label: 'Contractor',
    path: '/contractor',
    iconPath:
      'M4 2h12a2 2 0 012 2v16a2 2 0 01-2 2H4a2 2 0 01-2-2V4a2 2 0 012-2zm0 2v16h12V4H4zm9 6a1 1 0 100-2 1 1 0 000 2zM6 5h6v1H6V5zm0 3h6v1H6V8zm0 3h6v1H6v-1zm8.5 8.793l3.207-3.207a1 1 0 000-1.414l-2-2a1 1 0 00-1.414 0l-3.207 3.207L14.5 18.793zM16 19.5V21h1.5l3.207-3.207-1.5-1.5L16 19.5z',
  },

  {
    label: 'Supervisor',
    path: '/supervisor',
    iconPath:
      'M17 9V7a4 4 0 00-8 0v2M5 20h14a2 2 0 002-2v-5a2 2 0 00-2-2H5a2 2 0 00-2 2v5a2 2 0 002 2z',
  },
  {
    label: 'Notes',
    path: '/notes',
    iconPath:
      'M4 2h12a2 2 0 012 2v16a2 2 0 01-2 2H4a2 2 0 01-2-2V4a2 2 0 012-2zm0 2v16h12V4H4zm9 6a1 1 0 100-2 1 1 0 000 2zM6 5h6v1H6V5zm0 3h6v1H6V8zm0 3h6v1H6v-1zm8.5 8.793l3.207-3.207a1 1 0 000-1.414l-2-2a1 1 0 00-1.414 0l-3.207 3.207L14.5 18.793zM16 19.5V21h1.5l3.207-3.207-1.5-1.5L16 19.5z',
  },
  {
    label: 'Fabric Wallet',
    path: '/wallet',
    iconPath:
      'M4 2h12a2 2 0 012 2v16a2 2 0 01-2 2H4a2 2 0 01-2-2V4a2 2 0 012-2zm0 2v16h12V4H4zm9 6a1 1 0 100-2 1 1 0 000 2zM6 5h6v1H6V5zm0 3h6v1H6V8zm0 3h6v1H6v-1zm8.5 8.793l3.207-3.207a1 1 0 000-1.414l-2-2a1 1 0 00-1.414 0l-3.207 3.207L14.5 18.793zM16 19.5V21h1.5l3.207-3.207-1.5-1.5L16 19.5z',
  },
  {
    label: 'Fabric Wallet Txn',
    path: '/fabrictxn',
    iconPath:
      'M4 2h12a2 2 0 012 2v16a2 2 0 01-2 2H4a2 2 0 01-2-2V4a2 2 0 012-2zm0 2v16h12V4H4zm9 6a1 1 0 100-2 1 1 0 000 2zM6 5h6v1H6V5zm0 3h6v1H6V8zm0 3h6v1H6v-1zm8.5 8.793l3.207-3.207a1 1 0 000-1.414l-2-2a1 1 0 00-1.414 0l-3.207 3.207L14.5 18.793zM16 19.5V21h1.5l3.207-3.207-1.5-1.5L16 19.5z',
  },
  {
    label: 'Messages',
    path: '/message',
    iconPath: 'M6 5h12M6 10h12M6 15h8M6 20h4',
  },
  {
    label: 'Feedback',
    path: '/feedback',
    iconPath: 'M6 5h12M6 10h12M6 15h8M6 20h4',
  },

  // Add other menu items here
]
export const pathSet = new Set(masterMenuItems.map(({path}) => path.replace(/\//g, '')))
