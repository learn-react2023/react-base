import React from 'react'
import css from '../../../styles/styles.css'
import HOCButton from '../../comps/HOCHeaderButton'
import Button from '../../comps/Button'

const HOCButtonComponent = HOCButton(Button)

const { HeaderContainer, HeaderCSS } = css

const Head = () => {
  return (
    <React.Fragment>
      <HeaderContainer>
        <HeaderCSS.Logo>FINMANAGER</HeaderCSS.Logo>
        <HeaderCSS.MenuContainer>
          <HOCButtonComponent 
            text={'/main'} 
            onClick={() => console.log('переход по маршруту /main')}
          >
            Главная
          </HOCButtonComponent>
          <HOCButtonComponent 
            text={'/stat/расход'} 
            onClick={() => console.log('переход по маршруту /stat/расход')}
          >
            Статистика
          </HOCButtonComponent>
          <HOCButtonComponent 
            text={'/plan'} 
            onClick={() => console.log('переход по маршруту /plan')}
          >
            Планирование
          </HOCButtonComponent>
          <HOCButtonComponent 
            text={'/main'} 
            onClick={ async () => {
              await fetch('/clear-data', {
                method: 'POST',
                headers: { "Content-type": "application/json; charset=UTF-8" }
              })
              window.location.reload()
            }}
          >
            Сброс данных
          </HOCButtonComponent>
        </HeaderCSS.MenuContainer>
      </HeaderContainer>
    </React.Fragment>
  )
}

export default Head