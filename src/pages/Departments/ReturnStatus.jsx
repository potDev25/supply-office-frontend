import React from 'react'
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb'
import ApplicantsTable from '../../components/Tables/ApplicantsTable'
import DepartmentsTable from '../../components/Tables/DepartmentsTable'
import { useStateContext } from '../../context/ContextProvider'
import ReturnStatusTable from '../../components/Tables/ReturnStatusTable'

export default function ReturnStatus() {
  const {user} = useStateContext()

  if(user.role !== 'general admin'){
    window.location.replace('/dashboard')
  }
  return (
    <>
      <Breadcrumb pageName="Return Status" />
      <ReturnStatusTable/>
    </>
  )
}
