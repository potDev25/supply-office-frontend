import React, { useRef, useEffect } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import SignatureTable from '../components/Tables/SignatureTable';

const SignaturePad = () => {
  return (
    <>
      <Breadcrumb pageName="Upload E-Signature" />
      <SignatureTable/>
    </>
  );
};

export default SignaturePad;
