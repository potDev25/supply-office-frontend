import React from "react";

export default function ApplicantProfile() {
  return (
    <div className="card c_grid c_yellow">
      <div className="body text-center">
        <div className="circle">
          <img
            className="rounded-circle"
            src="../assets/images/sm/avatar1.jpg"
            alt
          />
        </div>
        <h6 className="mt-3 mb-0">Michelle Green</h6>
        <span>jason-porter@info.com</span>
        <ul className="mt-3 list-unstyled d-flex justify-content-center">
          <li>
            <a className="p-3" target="_blank" href="#">
              <i className="fa fa-facebook" />
            </a>
          </li>
          <li>
            <a className="p-3" target="_blank" href="#">
              <i className="fa fa-slack" />
            </a>
          </li>
          <li>
            <a className="p-3" target="_blank" href="#">
              <i className="fa fa-linkedin" />
            </a>
          </li>
        </ul>
        <button className="btn btn-default btn-sm">Follow</button>
        <button className="btn btn-default btn-sm">Message</button>
      </div>
    </div>
  );
}
