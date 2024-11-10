import React, { useRef } from 'react'
import From from './From'
import {useReactToPrint } from 'react-to-print'

const pageStyle = `
    @page {
      margin: 20mm;
      size: A4;
    }
    @media print {
      body {
        -webkit-print-color-adjust: exact; /* Ensures background colors are printed */
        print-color-adjust: exact;
         zoom: 75%;
      }
      
    }
  `;

export default function FormPage() {

  return (
    <div>
    
      <From/>
    </div>
  )
}
