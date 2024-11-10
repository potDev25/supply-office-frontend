import React, { useState } from 'react'
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb'
import ArchiveTable from '../../components/Tables/ArchiveTable'
import RequestStoreSupplyTable from '../../components/Tables/RequestStoreSupplyTable'
import { useParams } from 'react-router-dom'
import RequestSupplyTable from '../../components/Tables/RequestSupplyTable'
import AuditTable from '../../components/Tables/AuditTable'

export default function ParAudit() {
  const {id} = useParams();
  const [department, setDepartment] = useState({})
  return (
    <>
      <Breadcrumb pageName="PAR Audit" />
      <AuditTable department_id={id} setDepartmentProp={setDepartment} type='PAR'/>
    </>
  )
}
