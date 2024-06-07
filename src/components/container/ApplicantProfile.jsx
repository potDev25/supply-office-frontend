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
        <span>jason-porter@info.com</span><br />
        <span className="" style={{fontWeight: 'bold'}}>Department User</span>
      </div>
    </div>
  );
}
