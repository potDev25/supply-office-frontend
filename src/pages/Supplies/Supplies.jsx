import React from 'react'
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb'
import ApplicantsTable from '../../components/Tables/ApplicantsTable'
import DepartmentsTable from '../../components/Tables/DepartmentsTable'
import { useStateContext } from '../../context/ContextProvider'

export default function Supplies() {
  const {user} = useStateContext()

  if(user.role !== 'general admin'){
    window.location.replace('/dashboard')
  }
  return (
    <>
      <Breadcrumb pageName="Manage Supplies" />
      <DepartmentsTable/>
    </>
  )
}
