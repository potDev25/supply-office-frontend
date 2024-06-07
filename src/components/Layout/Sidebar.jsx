import React, { useState } from "react";
import Logo from '../../assets1/images/bipsu_new.png'
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
          icon: <i className="icon-docs" />,
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
          title: 'Announcements',
          icon: <i className="icon-volume-1" />,
          dropdown: false,
          id: 'users',
          href: '/announcements',
      },
  ]
  const landingPage = [
    {
        title: 'Page Settings',
        icon: <i className="icon-settings" />,
        dropdown: false,
        href: '/settings'
    },
]
  const transactionMenu = [
      {
          title: 'Transactions',
          icon: <i className="icon-calculator" />,
          dropdown: false,
          href: '/reports/sales'
      },
      {
          title: 'Reports',
          icon: <i className="icon-graph" />,
          dropdown: false,
          href: '/reports/sales'
      },
  ]

  const handleLink = () => {
      setPath(window.location.pathname)
  }
  return (
    <div id="left-sidebar" className="sidebar" style={{ backgroundColor: '#202f46', border: 'none', color: '#bbbec2' }}>
      <div className="navbar-brand">
        <a href="index.html">
          <img
            src={Logo}
            alt="Oculux Logo"
            className="img-fluid"
            style={{height: '80px', width: '80px'}}
          />
          <span style={{ color: '#bbbec2' }}>BAC OFFICE</span>
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
            <span style={{ color: '#bbbec2' }}>Welcome,</span>
            <a
              href="javascript:void(0);"
              className="dropdown-toggle user-name"
              data-toggle="dropdown"
              style={{ color: '#bbbec2' }}
            >
              <strong style={{ color: '#bbbec2' }}>Louis Pierce</strong>
            </a>
            <ul className="dropdown-menu dropdown-menu-right account vivify flipInY" style={{ color: '#bbbec2' }}>
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
          <ul id="main-menu" className="metismenu" style={{ color: '#bbbec2' }}>
            <li className="header">Main</li>
            {
                sidebarMenu.map((item, key) => (
                    <li key={key} className={`${item.href === path ? 'active' : ''}`} onClick={ev => handleLink()} style={{ color: '#bbbec2' }}>
                        {
                            
                                item.dropdown ?
                                <>
                                    <a href={`#${item.title}`} className="has-arrow" style={{ color: '#bbbec2' }}>
                                        {item.icon}
                                        <span style={{ color: '#bbbec2' }}>{item.title}</span>
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
                                <Link to={item.href} style={{ color: '#bbbec2' }}>
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
                                <Link to={item.href} style={{ color: '#bbbec2' }}>
                                    {item.icon}
                                    <span>{item.title}</span>
                                </Link>
                            
                        }
                        
                    </li>
                ))
            }
            <li className="header">Page Settings</li>
            {
                  landingPage.map((item, key) => (
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
                                  <Link to={item.href} style={{ color: '#bbbec2' }}>
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
