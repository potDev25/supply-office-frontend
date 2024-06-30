import React from 'react'
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb'
import ApplicantsTable from '../../components/Tables/ApplicantsTable'
import UsersTable from '../../components/Tables/UsersTable'

export default function Users() {
  return (
    <>
      <Breadcrumb pageName="System Users" />
      <UsersTable/>
    </>
  )
}
