import React, { useContext } from 'react'
import css from '../../../styles/styles.css'
import FooterContext from '../../../redux-state/context/footerContext'

const { FooterContainer } = css

const Foot = ({ children }) => {

  // eslint-disable-next-line no-unused-vars
  const footerText = useContext(FooterContext)

  return (
    <React.Fragment>
      <FooterContainer style={{ justifyContent: 'space-around', fontSize: '14px' }}>{ children }</FooterContainer>
    </React.Fragment>
  )
}

export default Foot