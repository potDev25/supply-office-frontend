import React from 'react'
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb'
import ArchiveTable from '../../components/Tables/ArchiveTable'

export default function Reports() {
  return (
    <>
      <Breadcrumb pageName="Reports" />
      <ArchiveTable/>
    </>
  )
}
