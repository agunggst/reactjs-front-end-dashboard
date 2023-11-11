import { Link } from 'react-router-dom';
import PokopediaLogo from '../assets/pokopedia-Icon-Font.png'
import "./style/Sidebar.css"

import GroupIcon from '@mui/icons-material/Group'
import Inventory2Icon from '@mui/icons-material/Inventory2'
import CategoryIcon from '@mui/icons-material/Category'
import ReceiptLongIcon from '@mui/icons-material/Receipt'
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { useState } from 'react';

const Sidebar = () => {
  const [pathname, setPathname] = useState(window.location.pathname)

  const navigationList = [
    {
      name: 'Users',
      icon: <GroupIcon/>,
      path: '/admin/user-manage'
    },
    {
      name: 'Products',
      icon: <Inventory2Icon/>,
      path: '/admin/product-manage'
    },
    {
      name: 'Categories',
      icon: <CategoryIcon/>,
      path: '/admin/category-manage'
    },
    {
      name: 'Transactions',
      icon: <ShoppingCartCheckoutIcon/>,
      path: '/admin/transaction-manage'
    },
    {
      name: 'Invoices',
      icon: <ReceiptLongIcon/>,
      path: '/admin/invoice-manage'
    }
  ]

  const changePathname = (pathname) => {
    setPathname(pathname)
  }
  return (
    <div className="sidebar">
      <div className="company-logo-container">
        <img src={PokopediaLogo} alt="pokopedia" className="company-logo" />
      </div>
      <div className="navigation-container">
        {navigationList.map((nav, index) => {
          return (
            <Link className={`navigation ${pathname.includes(nav.path) ? 'active-nav' : ''}`} key={index} to={nav.path} onClick={() => changePathname(nav.path)}>
              <div className="left">
                <div className={`icon ${pathname.includes(nav.path) ? 'active-icon' : ''}`}>{nav.icon}</div>
                <div className="name">{nav.name}</div>
              </div>
              <div className="right">
                <div className={`${pathname.includes(nav.path) ? 'mark' : ''}`}></div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
 
export default Sidebar