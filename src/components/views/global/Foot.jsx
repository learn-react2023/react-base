import React from 'react'
import css from '../../../styles/styles.css'
// ----------------------------------------------------------------
// import FooterContext from '../../../redux-state/context/footerContext'
// ----------------------------------------------------------------

const { FooterContainer } = css

const Foot = ({ children }) => {

  // eslint-disable-next-line no-unused-vars
  // const [ footerText, setFooterText ] = useContext(FooterContext)

  return (
    <React.Fragment>
      {/* <FooterContainer 
            onClick={() => setFooterText('Новый текст для подвала приложения')} 
            style={{ justifyContent: 'space-around', fontSize: '14px' }}
          >
            { footerText }
          </FooterContainer> */}
      <FooterContainer style={{ justifyContent: 'space-around', fontSize: '14px' }}></FooterContainer>
    </React.Fragment>
  )
}

export default Foot