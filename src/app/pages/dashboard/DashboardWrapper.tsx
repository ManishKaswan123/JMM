import React from 'react'

const DashboardWrapper: React.FC<{customComponent: React.FC}> = ({
  customComponent: CustomComponent,
}) => {
  return (
    <div className='min-h-screen'>
      {/* <Header setIsNavOpen={setIsNavOpen} /> */}
      <div className='flex'>
        {/* <NavigationMenu isOpen={isNavOpen} selectedItem={selectedItem} /> */}
        <CustomComponent /> {/* Render the custom component */}
      </div>
    </div>
  )
}

export default DashboardWrapper
