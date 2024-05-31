import React from "react";
import { Outlet } from "react-router-dom";
// import '../../landingpageAsset/css/bootstrap.min.css'
import '../../landingpageAsset/fonts/line-icons.css'
import '../../landingpageAsset/css/animate.css'
import '../../landingpageAsset/css/slicknav.css'
import '../../landingpageAsset/css/owl.carousel.min.css'
import '../../landingpageAsset/css/owl.theme.css'
import '../../landingpageAsset/css/main.css'
import '../../landingpageAsset/css/responsive.css'
import GuestHeader from "./GuestHeader";

export default function GuestLayout() {
  return (
    <>
      <GuestHeader/>

      <Outlet />
    </>
  );
}
