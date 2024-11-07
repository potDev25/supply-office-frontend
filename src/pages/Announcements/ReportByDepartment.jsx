import React from 'react'
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb'
import ApplicantsTable from '../../components/Tables/ApplicantsTable'
import DepartmentsTable from '../../components/Tables/DepartmentsTable'
import { useStateContext } from '../../context/ContextProvider'
import CategoriesTable from '../../components/Tables/CategoriesTable'
import ReceivingTable from '../../components/Tables/ReceivingTable'
import ReportByDepartmentTable from '../../components/Tables/ReportByDepartmentTable'

export default function ReportByDepartment() {
  const {user} = useStateContext()

  // if(user.role !== 'general admin' || user.role == 'supply office'){
  //   window.location.replace('/dashboard')
  // }
  return (
    <>
      <Breadcrumb pageName="Materials And Issued Supplies" />
      <ReportByDepartmentTable/>
    </>
  )
}
