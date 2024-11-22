import React, {useState} from 'react'

const DashboardWrapper: React.FC<{customComponent: React.FC; selectedItem: string}> = ({
  customComponent: CustomComponent,
  selectedItem: selectedItem,
}) => {
  const [isNavOpen, setIsNavOpen] = useState(false)
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
