import React from 'react'
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb'
import ApplicantsTable from '../../components/Tables/ApplicantsTable'
import DepartmentsTable from '../../components/Tables/DepartmentsTable'
import { useStateContext } from '../../context/ContextProvider'
import AnnualTable from '../../components/Tables/AnnualTable'
import RequestTable from '../../components/Tables/RequestTable'

export default function Annual() {
  const {user} = useStateContext()

  // if(user.role !== 'general admin'){
  //   window.location.replace('/dashboard')
  // }
  return (
    <>
      <Breadcrumb pageName="Requisition and Issue Slip" />
      <RequestTable />
    </>
  )
}
