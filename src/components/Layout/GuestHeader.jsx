import React, { useEffect, useState } from "react";
import Logo from "../../assets1/images/almerira-logo.png";
import AccessLogo from '../../assets1/images/accessability-logo.png'
import Search from '../../assets1/images/search.png'

export default function GuestHeader() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const dayName = days[date.getDay()];
    const monthName = months[date.getMonth()];
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();

    let hours = date.getHours();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'

    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${dayName}, ${monthName} ${day}, ${year}, ${hours}:${minutes}:${seconds} ${ampm}`;
  };

  return (
    <header id="header-wrap">
      <nav
        className="navbar navbar-expand-lg fixed-top scrolling-navbar indigo"
        style={{ backgroundColor: "#154880" }}
      >
        <div className="container">
          <div className="navbar-header">
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#main-navbar"
              aria-controls="main-navbar"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
              <span className="icon-menu" />
              <span className="icon-menu" />
              <span className="icon-menu" />
            </button>
          </div>
          <div className="collapse navbar-collapse" id="main-navbar">
            <ul className="navbar-nav mr-auto w-100 justify-content-end clearfix">
              <li className="nav-item active">
                <a
                  className="nav-link"
                  href="#hero-1"
                  style={{ fontWeight: "500", color: "white" }}
                >
                  GOVPH
                </a>
              </li>
              <li className="nav-item active">
                <a
                  className="nav-link"
                  href="#hero-area"
                  style={{ color: "white" }}
                >
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#services"
                  style={{ color: "white" }}
                >
                  Services
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#feature"
                  style={{ color: "white" }}
                >
                  News
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#team" style={{ color: "white" }}>
                  Key Officials
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#pricing"
                  style={{ color: "white" }}
                >
                  About Us
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#contact"
                  style={{ color: "white" }}
                >
                  Contact
                </a>
              </li>
              <li className="nav-item" style={{ width: "200px" }}>
                <a
                  className="nav-link"
                  href="#contact"
                  style={{ color: "white" }}
                >
                  Register
                </a>
              </li>
            </ul>
            <div class="btn-sing float-right d-flex">
                <button
                  className="dropdown-toggle"
                  style={{background: 'none', border: 'none', outline: 'none'}}
                ><img src={Search} style={{ height: '20px', width: '20px'}} alt="" /></button>
              <div className="dropdown show">
                <button
                  className="dropdown-toggle"
                  href="#"
                  role="button"
                  id="dropdownMenuLink"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  style={{background: 'none', border: 'none', outline: 'none'}}
                >
                  <img src={AccessLogo} style={{ height: '40px', width: '40px'}} alt="" />
                </button>
                <div
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuLink"
                >
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ul className="mobile-menu navbar-nav">
          <li>
            <a
              className="page-scroll"
              href="#hero-area"
              style={{ fontWeight: "bolder" }}
            >
              GOVPH
            </a>
          </li>
          <li>
            <a className="page-scroll" href="#hero-area">
              Home
            </a>
          </li>
          <li>
            <a className="page-scroll" href="#services">
              Services
            </a>
          </li>
          <li>
            <a className="page-scroll" href="#feature">
              feature
            </a>
          </li>
          <li>
            <a className="page-scroll" href="#team">
              Team
            </a>
          </li>
          <li>
            <a className="page-scroll" href="#pricing">
              Pricing
            </a>
          </li>
          <li>
            <a className="page-scroll" href="#contact">
              Contact
            </a>
          </li>
        </ul>
      </nav>
      <div
        id="hero-area"
        className="hero-area-bg particles_js"
        style={{ backgroundColor: "#b92828", height: "25svh" }}
      >
        <div className="overlay" />
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-sm-12">
              <div className="contents d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center justify-content-center">
                  <div>
                    <img
                      src={Logo}
                      style={{ height: "120px", width: "120px" }}
                      alt=""
                    />
                  </div>
                  <div>
                    <h6 style={{ fontFamily: "sans-serif" }}>
                      Republic of the Philippines
                    </h6>
                    <div
                      style={{
                        backgroundColor: "white",
                        height: "2px",
                        width: "449px",
                      }}
                    ></div>
                    <h4
                      style={{
                        fontFamily: "sans-serif",
                        color: "white",
                        textShadow:
                          "1px 1px 2px black, 2px 2px 5px black, 3px 3px 8px black",
                        letterSpacing: "2px",
                        fontSize: "30px",
                      }}
                    >
                      MUNICAPLITY OF ALMERIA
                    </h4>
                  </div>
                </div>
                <div>
                  <p style={{ fontWeight: "500" }}>
                    Philippine Standard Time: <br />
                    <span style={{ fontWeight: "" }}>
                      {" "}
                      {formatDate(currentDateTime)}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="particles-js" />
      </div>
      {/* Hero Area End */}
    </header>
  );
}
