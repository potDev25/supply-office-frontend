import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";
import MainContainer from "./MainContainer";

export default function DashboardLayout() {
  return (
    <>
      <div className="themesetting">
        <a href="javascript:void(0);" className="theme_btn">
          <i className="icon-magic-wand" />
        </a>
        <div className="card theme_color">
          <div className="header">
            <h2>Theme Color</h2>
          </div>
          <ul className="choose-skin list-unstyled mb-0">
            <li data-theme="green">
              <div className="green" />
            </li>
            <li data-theme="orange">
              <div className="orange" />
            </li>
            <li data-theme="blush">
              <div className="blush" />
            </li>
            <li data-theme="cyan" className="active">
              <div className="cyan" />
            </li>
            <li data-theme="indigo">
              <div className="indigo" />
            </li>
            <li data-theme="red">
              <div className="red" />
            </li>
          </ul>
        </div>
        <div className="card font_setting">
          <div className="header">
            <h2>Font Settings</h2>
          </div>
          <div>
            <div className="fancy-radio mb-2">
              <label>
                <input name="font" defaultValue="font-krub" type="radio" />
                <span>
                  <i />
                  Krub Google font
                </span>
              </label>
            </div>
            <div className="fancy-radio mb-2">
              <label>
                <input
                  name="font"
                  defaultValue="font-montserrat"
                  type="radio"
                  defaultChecked
                />
                <span>
                  <i />
                  Montserrat Google font
                </span>
              </label>
            </div>
            <div className="fancy-radio">
              <label>
                <input name="font" defaultValue="font-roboto" type="radio" />
                <span>
                  <i />
                  Robot Google font
                </span>
              </label>
            </div>
          </div>
        </div>
        <div className="card setting_switch">
          <div className="header">
            <h2>Settings</h2>
          </div>
          <ul className="list-group">
            <li className="list-group-item">
              Light Version
              <div className="float-right">
                <label className="switch">
                  <input type="checkbox" className="lv-btn" />
                  <span className="slider round" />
                </label>
              </div>
            </li>
            <li className="list-group-item">
              RTL Version
              <div className="float-right">
                <label className="switch">
                  <input type="checkbox" className="rtl-btn" />
                  <span className="slider round" />
                </label>
              </div>
            </li>
            <li className="list-group-item">
              Horizontal Henu
              <div className="float-right">
                <label className="switch">
                  <input type="checkbox" className="hmenu-btn" />
                  <span className="slider round" />
                </label>
              </div>
            </li>
            <li className="list-group-item">
              Mini Sidebar
              <div className="float-right">
                <label className="switch">
                  <input type="checkbox" className="mini-sidebar-btn" />
                  <span className="slider round" />
                </label>
              </div>
            </li>
          </ul>
        </div>
        <div className="card">
          <div className="form-group">
            <label className="d-block">
              Traffic this Month <span className="float-right">77%</span>
            </label>
            <div className="progress progress-xxs">
              <div
                className="progress-bar progress-bar-success"
                role="progressbar"
                aria-valuenow={77}
                aria-valuemin={0}
                aria-valuemax={100}
                style={{ width: "77%" }}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="d-block">
              Server Load <span className="float-right">50%</span>
            </label>
            <div className="progress progress-xxs">
              <div
                className="progress-bar progress-bar-warning"
                role="progressbar"
                aria-valuenow={50}
                aria-valuemin={0}
                aria-valuemax={100}
                style={{ width: "50%" }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="wrapper">
        <TopNavbar />
        <Sidebar />

        <MainContainer>
          <Outlet />
        </MainContainer>
      </div>
    </>
  );
}
