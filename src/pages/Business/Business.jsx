import React from 'react'
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb'
import BusinessTable from '../../components/Tables/BusinessTable'

export default function Business() {
  return (
    <>
      <Breadcrumb pageName="Registered Business" />
      <BusinessTable/>
    </>
  )
}
