import {useNavigate} from 'react-router-dom'
import NavBar from '../components/header/NavBar'
import {cleanerNavItems, companyNavItems, userNavItems} from '../components/header/NavbarItems'
import {useUrlItems} from 'sr/utils/helpers/useUrlItems'

export default function MasterNavBar() {
  const navigate = useNavigate()
  const urlItems = useUrlItems()

  return (
    <>
      {/* Navbar */}
      {urlItems.length > 2 && urlItems[0] === 'user' && (
        <NavBar onGoBack={() => navigate('/user')} navItems={userNavItems} />
      )}
      {urlItems.length > 2 && urlItems[0] === 'cleaner' && (
        <NavBar onGoBack={() => navigate('/cleaner')} navItems={cleanerNavItems} />
      )}
      {urlItems.length > 2 && urlItems[0] === 'company' && (
        <NavBar onGoBack={() => navigate('/company')} navItems={companyNavItems} />
      )}
      {/* End Navbar */}
    </>
  )
}
