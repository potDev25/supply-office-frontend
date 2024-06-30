import React from 'react'
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb'
import ApplicantsTable from '../../components/Tables/ApplicantsTable'
import DepartmentsTable from '../../components/Tables/DepartmentsTable'

export default function Departments() {
  return (
    <>
      <Breadcrumb pageName="Departments" />
      <DepartmentsTable/>
    </>
  )
}
