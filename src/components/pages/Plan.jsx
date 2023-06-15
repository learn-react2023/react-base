import React from 'react'
import Foot from '../views/global/Foot'
import DataList from '../views/local/DataList'

export default class Plan extends React.Component {

  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <>
        <DataList viewType={'расход'} data={this.props.statData}/>
        <Foot></Foot>
      </>
    )
  }

}