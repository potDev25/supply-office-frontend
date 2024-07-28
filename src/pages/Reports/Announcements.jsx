import React from 'react'
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb'
import AnnoucementsTable from '../../components/Tables/AnnouncementsTable'
import ReportDepartmentsTable from '../../components/Tables/ReportDepartmentsTable'

export default function ReportPage() {
  return (
    <>
      <Breadcrumb pageName="PPMP Reports" />
      <ReportDepartmentsTable/>
    </>
  )
}
