import React, { useRef, useEffect } from 'react';

const SignaturePad = () => {
  return (
    <div className="w-full h-screen">
      <iframe
        src="http://127.0.0.1:8000/"
        style={{ height: '100%', width: '100%' }}
        frameBorder="0"
      ></iframe>
    </div>
  );
};

export default SignaturePad;
