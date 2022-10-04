import React from 'react'

export default function GraphBox({data}) {
  return (
    <div className='graph-box box-card p-3 me-3 mb-3'>
        <p>{data.title}</p>
        <div className='graph'></div>
    </div>
  )
}
