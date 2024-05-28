import React, { useState } from "react";
import Logo from '../../assets1/images/icon.svg'
import User from '../../assets1/images/user.png'
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [path, setPath] = useState(window.location.pathname)
  const sidebarMenu = [
      {
          title: 'Dashboard',
          icon: <i className="icon-speedometer" />,
          dropdown: false,
          href: '/'
      },
      {
          title: 'Departments',
          icon: <i className="icon-drawer" />,
          dropdown: false,
          href: '/departments'
      },
      {
          title: 'Documents',
          icon: <i className="icon-folder" />,
          dropdown: false,
          href: '/documents'
      },
      {
          title: 'Users',
          icon: <i className="icon-user" />,
          dropdown: false,
          id: 'users',
          href: '/users',
      },
      {
          title: 'Settings',
          icon: <i className="icon-settings" />,
          dropdown: false,
          href: '/settings'
      },
  ]
  const transactionMenu = [
      {
          title: 'Business Certificate',
          icon: <i className="icon-book-open" />,
          dropdown: false,
          href: '/reports/business-certificate'
      },
      {
          title: 'Sales',
          icon: <i className="icon-calculator" />,
          dropdown: false,
          href: '/reports/sales'
      },
  ]

  const handleLink = () => {
      setPath(window.location.pathname)
  }
  return (
    <div id="left-sidebar" className="sidebar">
      <div className="navbar-brand">
        <a href="index.html">
          <img
            src={Logo}
            alt="Oculux Logo"
            className="img-fluid logo"
          />
          <span>Oculux</span>
        </a>
        <button
          type="button"
          className="btn-toggle-offcanvas btn btn-sm float-right"
        >
          <i className="lnr lnr-menu icon-close" />
        </button>
      </div>
      <div className="sidebar-scroll">
        <div className="user-account">
          <div className="user_div">
            <img
              src={User}
              className="user-photo"
              alt="User Profile Picture"
            />
          </div>
          <div className="dropdown">
            <span>Welcome,</span>
            <a
              href="javascript:void(0);"
              className="dropdown-toggle user-name"
              data-toggle="dropdown"
            >
              <strong>Louis Pierce</strong>
            </a>
            <ul className="dropdown-menu dropdown-menu-right account vivify flipInY">
              <li>
                <a href="page-profile.html">
                  <i className="icon-user" />
                  My Profile
                </a>
              </li>
              <li>
                <a href="app-inbox.html">
                  <i className="icon-envelope-open" />
                  Messages
                </a>
              </li>
              <li>
                <a href="javascript:void(0);">
                  <i className="icon-settings" />
                  Settings
                </a>
              </li>
              <li className="divider" />
              <li>
                <a href="page-login.html">
                  <i className="icon-power" />
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
        <nav id="left-sidebar-nav" className="sidebar-nav">
          <ul id="main-menu" className="metismenu">
            <li className="header">Main</li>
            {
                sidebarMenu.map((item, key) => (
                    <li key={key} className={`${item.href === path ? 'active' : ''}`} onClick={ev => handleLink()}>
                        {
                            
                                item.dropdown ?
                                <>
                                    <a href={`#${item.title}`} className="has-arrow">
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </a>
                                    {
                                        item.dropdown ? 
                                        <ul className="collapse" aria-expanded="false">
                                            {
                                                item.subMenu.map((menu, key) => (
                                                    <li key={key} className={`${menu.href === path ? 'active' : ''}`} onClick={ev => handleLink()}>
                                                        <Link to={menu.href}>{menu.title}</Link>
                                                    </li>
                                                ))
                                            }
                                        </ul> : null
                                    }
                                </>  : 
                                <Link to={item.href}>
                                    {item.icon}
                                    <span>{item.title}</span>
                                </Link>
                            
                        }
                        
                    </li>
                ))
            }

          <li className="header">Transactions</li>
          {
                transactionMenu.map((item, key) => (
                    <li key={key} className={`${item.href === path ? 'active' : ''}`} onClick={ev => handleLink()}>
                        {
                            
                                item.dropdown ?
                                <>
                                    <a href={`#${item.title}`} className="has-arrow">
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </a>
                                    {
                                        item.dropdown ? 
                                        <ul className="collapse" aria-expanded="false">
                                            {
                                                item.subMenu.map((menu, key) => (
                                                    <li key={key} className={`${menu.href === path ? 'active' : ''}`} onClick={ev => handleLink()}>
                                                        <Link to={menu.href}>{menu.title}</Link>
                                                    </li>
                                                ))
                                            }
                                        </ul> : null
                                    }
                                </>  : 
                                <Link to={item.href}>
                                    {item.icon}
                                    <span>{item.title}</span>
                                </Link>
                            
                        }
                        
                    </li>
                ))
            }
          </ul>
        </nav>
      </div>
    </div>
  );
}
