import React from "react";

export default function TopNavbar() {
  return (
    <nav className="navbar top-navbar">
      <div className="container-fluid">
        <div className="navbar-left">
          <div className="navbar-btn">
            <a href="index.html">
              <img
                src="../assets/images/icon.svg"
                alt="Oculux Logo"
                className="img-fluid logo"
              />
            </a>
            <button type="button" className="btn-toggle-offcanvas">
              <i className="lnr lnr-menu fa fa-bars" />
            </button>
          </div>
          <ul className="nav navbar-nav">
            <li className="dropdown">
              <a
                href="javascript:void(0);"
                className="dropdown-toggle icon-menu"
                data-toggle="dropdown"
              >
                <i className="icon-envelope" />
                <span className="notification-dot bg-green">4</span>
              </a>
              <ul className="dropdown-menu right_chat email vivify fadeIn">
                <li className="header green">You have 4 New eMail</li>
                <li>
                  <a href="javascript:void(0);">
                    <div className="media">
                      <div className="avtar-pic w35 bg-red">
                        <span>FC</span>
                      </div>
                      <div className="media-body">
                        <span className="name">
                          James Wert{" "}
                          <small className="float-right text-muted">
                            Just now
                          </small>
                        </span>
                        <span className="message">Update GitHub</span>
                      </div>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0);">
                    <div className="media">
                      <div className="avtar-pic w35 bg-indigo">
                        <span>FC</span>
                      </div>
                      <div className="media-body">
                        <span className="name">
                          Folisise Chosielie{" "}
                          <small className="float-right text-muted">
                            12min ago
                          </small>
                        </span>
                        <span className="message">New Messages</span>
                      </div>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0);">
                    <div className="media">
                      <img
                        className="media-object "
                        src="../assets/images/xs/avatar5.jpg"
                        alt
                      />
                      <div className="media-body">
                        <span className="name">
                          Louis Henry{" "}
                          <small className="float-right text-muted">
                            38min ago
                          </small>
                        </span>
                        <span className="message">Design bug fix</span>
                      </div>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0);">
                    <div className="media mb-0">
                      <img
                        className="media-object "
                        src="../assets/images/xs/avatar2.jpg"
                        alt
                      />
                      <div className="media-body">
                        <span className="name">
                          Debra Stewart{" "}
                          <small className="float-right text-muted">
                            2hr ago
                          </small>
                        </span>
                        <span className="message">Fix Bug</span>
                      </div>
                    </div>
                  </a>
                </li>
              </ul>
            </li>
            <li className="dropdown">
              <a
                href="javascript:void(0);"
                className="dropdown-toggle icon-menu"
                data-toggle="dropdown"
              >
                <i className="icon-bell" />
                <span className="notification-dot bg-azura">4</span>
              </a>
              <ul className="dropdown-menu feeds_widget vivify fadeIn">
                <li className="header blue">You have 4 New Notifications</li>
                <li>
                  <a href="javascript:void(0);">
                    <div className="feeds-left bg-red">
                      <i className="fa fa-check" />
                    </div>
                    <div className="feeds-body">
                      <h4 className="title text-danger">
                        Issue Fixed{" "}
                        <small className="float-right text-muted">
                          9:10 AM
                        </small>
                      </h4>
                      <small>WE have fix all Design bug with Responsive</small>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0);">
                    <div className="feeds-left bg-info">
                      <i className="fa fa-user" />
                    </div>
                    <div className="feeds-body">
                      <h4 className="title text-info">
                        New User{" "}
                        <small className="float-right text-muted">
                          9:15 AM
                        </small>
                      </h4>
                      <small>I feel great! Thanks team</small>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0);">
                    <div className="feeds-left bg-orange">
                      <i className="fa fa-question-circle" />
                    </div>
                    <div className="feeds-body">
                      <h4 className="title text-warning">
                        Server Warning{" "}
                        <small className="float-right text-muted">
                          9:17 AM
                        </small>
                      </h4>
                      <small>Your connection is not private</small>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0);">
                    <div className="feeds-left bg-green">
                      <i className="fa fa-thumbs-o-up" />
                    </div>
                    <div className="feeds-body">
                      <h4 className="title text-success">
                        2 New Feedback{" "}
                        <small className="float-right text-muted">
                          9:22 AM
                        </small>
                      </h4>
                      <small>It will give a smart finishing to your site</small>
                    </div>
                  </a>
                </li>
              </ul>
            </li>
            <li className="dropdown language-menu">
              <a
                href="javascript:void(0);"
                className="dropdown-toggle icon-menu"
                data-toggle="dropdown"
              >
                <i className="fa fa-language" />
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item pt-2 pb-2" href="#">
                  <img
                    src="../assets/images/flag/us.svg "
                    className="w20 mr-2 rounded-circle"
                  />{" "}
                  US English
                </a>
                <a className="dropdown-item pt-2 pb-2" href="#">
                  <img
                    src="../assets/images/flag/gb.svg "
                    className="w20 mr-2 rounded-circle"
                  />{" "}
                  UK English
                </a>
                <div className="dropdown-divider" />
                <a className="dropdown-item pt-2 pb-2" href="#">
                  <img
                    src="../assets/images/flag/russia.svg "
                    className="w20 mr-2 rounded-circle"
                  />{" "}
                  Russian
                </a>
                <a className="dropdown-item pt-2 pb-2" href="#">
                  <img
                    src="../assets/images/flag/arabia.svg "
                    className="w20 mr-2 rounded-circle"
                  />{" "}
                  Arabic
                </a>
                <a className="dropdown-item pt-2 pb-2" href="#">
                  <img
                    src="../assets/images/flag/france.svg "
                    className="w20 mr-2 rounded-circle"
                  />{" "}
                  French
                </a>
              </div>
            </li>
            <li>
              <a
                href="javascript:void(0);"
                className="megamenu_toggle icon-menu"
                title="Mega Menu"
              >
                Mega
              </a>
            </li>
            <li className="p_social">
              <a
                href="page-social.html"
                className="social icon-menu"
                title="News"
              >
                Social
              </a>
            </li>
            <li className="p_news">
              <a href="page-news.html" className="news icon-menu" title="News">
                News
              </a>
            </li>
            <li className="p_blog">
              <a href="page-blog.html" className="blog icon-menu" title="Blog">
                Blog
              </a>
            </li>
          </ul>
        </div>
        <div className="navbar-right">
          <div id="navbar-menu">
            <ul className="nav navbar-nav">
              <li>
                <a
                  href="javascript:void(0);"
                  className="search_toggle icon-menu"
                  title="Search Result"
                >
                  <i className="icon-magnifier" />
                </a>
              </li>
              <li>
                <a
                  href="javascript:void(0);"
                  className="right_toggle icon-menu"
                  title="Right Menu"
                >
                  <i className="icon-bubbles" />
                  <span className="notification-dot bg-pink">2</span>
                </a>
              </li>
              <li>
                <a href="page-login.html" className="icon-menu">
                  <i className="icon-power" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="progress-container">
        <div className="progress-bar" id="myBar" />
      </div>
    </nav>
  );
}
