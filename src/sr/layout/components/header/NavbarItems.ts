interface NavItem {
  label: string
  path: string
  name: string
  iconPath: string
}
export const navItems: NavItem[] = [
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

  // {
  //   label: 'Reward Earnings',
  //   path: 'user/reward-earning',
  //   name: 'reward-earning',
  //   iconPath:
  //     'M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z', // Star
  // },
  // {
  //   label: 'Reward Transactions',
  //   path: 'user/reward-uses-history',
  //   name: 'reward-uses-history',
  //   iconPath: 'M3 3h18v18H3V3zm9 3v9l4-4-4-4z', // Clockwise arrow
  // },
  // {
  //   label: 'Orders',
  //   path: 'user/order',
  //   name: 'order',
  //   iconPath: 'M6 6h12v12H6V6zM3 3h18v18H3V3z', // Square within a square
  // },
  // {
  //   label: 'Transactions',
  //   path: 'user/transactions',
  //   name: 'transactions',
  //   iconPath:
  //     'M12 2a10 10 0 100 20 10 10 0 000-20zm1 10.41V8h-2v5.41l4.3 4.29 1.42-1.42-3.72-3.71z', // Clock
  // },
  // {
  //   label: 'Eighty Six',
  //   path: 'user/86',
  //   name: '86',
  //   iconPath: 'M5 12l5 5L20 7', // Checkmark
  // },
  // {
  //   label: 'Eighty Six Response',
  //   path: 'user/86-response',
  //   name: '86-response',
  //   iconPath:
  //     'M12 2a10 10 0 00-7.07 17.07l-1.42 1.42L12 22l8.49-1.51-1.42-1.42A10 10 0 0012 2zm5 11h-4V7h-2v7h6v-2z', // Speech bubble with clock
  // },
  // {
  //   label: 'Chats',
  //   path: 'user/chats',
  //   name: 'chats',
  //   iconPath: 'M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 11-3.8-3.8h4.7z', // Chat bubble
  // },
]
