import React from 'react'
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb'
import ApplicantsTable from '../../components/Tables/ApplicantsTable'
import DepartmentsTable from '../../components/Tables/DepartmentsTable'
import { useStateContext } from '../../context/ContextProvider'
import SupplyTable from '../../components/Tables/SupplyTable'
import ReceivingSupplyTable from '../../components/Tables/ReceivingSupplyTable'
import ParSupplyTable from '../../components/Tables/ParSupplyTable'

export default function ParSupplies() {
  const {user} = useStateContext()

  // if(user.role !== 'general admin'){
  //   window.location.replace('/dashboard')
  // }
  return (
    <>
      <Breadcrumb pageName="Assign Supplies" />
      <ParSupplyTable/>
    </>
  )
}
