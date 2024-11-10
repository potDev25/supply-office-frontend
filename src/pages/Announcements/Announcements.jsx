import React from 'react'
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb'
import AnnoucementsTable from '../../components/Tables/AnnouncementsTable'

export default function Announcements() {
  return (
    <>
      <Breadcrumb pageName="Archives RIS" />
      <AnnoucementsTable/>
    </>
  )
}
