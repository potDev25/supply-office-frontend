import React from 'react'

export default function PageTitle({title}) {
  return (
    <div className="block-header">
        <div className="row clearfix">
            <div className="col-md-6 col-sm-12">
                <h1>{title}</h1>
            </div>
        </div>
    </div>

  )
}
