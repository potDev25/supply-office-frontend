import React from 'react'

export default function Clearfix({children, classname}) {
  return (
    <div className={`${classname} clearfix`}>
      {children}
    </div>
  )
}
