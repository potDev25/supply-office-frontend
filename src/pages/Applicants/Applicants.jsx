import React from 'react'
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb'
import ApplicantsTable from '../../components/Tables/ApplicantsTable'

export default function Applicants() {
  return (
    <>
      <Breadcrumb pageName="Applicants" />
      <ApplicantsTable/>
    </>
  )
}
