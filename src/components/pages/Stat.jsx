import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import Foot from '../views/global/Foot'
import DataList from '../views/local/DataList'
import DataChart from '../views/local/DataChart'

const Stat = (props) => {

  const { statData } = props
  const [ isShowChart, setIsShowChart ] = useState(true)

  const { viewType } = useParams()

  return (
    <React.Fragment>
      <DataList viewType={viewType} setShow={setIsShowChart} data={statData}/>
      <DataChart viewType={viewType} show={isShowChart} data={statData}/>
      <Foot></Foot>
    </React.Fragment>
  )
}

export default Stat