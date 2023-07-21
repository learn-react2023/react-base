import React, { useEffect, useState } from 'react'
import { changeViewType, changeValue, changeComment } from '../../redux-state/reducers/view-type-for-main'
import { useSelector, useDispatch } from 'react-redux'
import FooterContext from '../../redux-state/context/footerContext'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import Foot from '../views/global/Foot'
import InputComponent from '../comps/Input'
import css from '../../styles/form.css'

import { useRef } from 'react'
import useNumberValueFormat from '../../hooks/useNumberValueFormat'

const { FormContainer, Button, Input } = css

const Main = (props) => {

  const { action } = props

  const valueInput = useRef()
  const [ footerText, setFooterText ] = useState('Новый курс по основам ReactJS 2023')
  const [ formatValue, formating ] = useNumberValueFormat()

  const dispatch = useDispatch()
  const viewType = useSelector(state => state.viewTypeMain.viewType)
  const viewValue = useSelector(state => state.viewTypeMain.value)
  const viewComment = useSelector(state => state.viewTypeMain.comment)

  const validation = () => {
    if ( formatValue.length > 2 && viewType ) {
      console.log('валидация прошла успешно')

      const dataLine = `${formatValue}::${viewType}::${viewComment}`

      action(dataLine)

      dispatch(changeValue(''))
      dispatch(changeViewType('доход'))
      dispatch(changeComment(''))

      fetch('/add-data', {
        method: 'POST',
        headers: { "Content-type": "application/json; charset=UTF-8" }, 
        body: JSON.stringify({
          value: dataLine
        })
      })

    } else console.log('ошибка валидации')
  }

  const handleChange = (event) => {
    dispatch(changeViewType(event.target.value));
  }
  const handleChangeValue = (param) => {
    dispatch(changeValue(param))
  }
  const handleChangeComment = (param) => {
    dispatch(changeComment(param))
  }
  const handleChangeCommentRadio = (event) => {
    dispatch(changeComment(event.target.value))
  }

  const setFocus = () => { 
    valueInput.current.disabled = false
    valueInput.current.focus()
  }

  useEffect(() => { console.log(viewType) }, [viewType])
  useEffect(() => { console.log(formatValue) }, [formatValue])

  return (
    <React.Fragment>
      <FormContainer style={{ alignItems: 'flex-start' }}>

        {/* ----------------------------------------- */}
        {/* react useRef */}
        {/* ----------------------------------------- */}
        
        <Button 
          backgroundColor={"rgb(176, 243, 71)"}
          onClick={setFocus}
          style={{ marginBottom: '12px' }}
        >
          Начать заполнение
        </Button>
        <Input
          ref={valueInput}
          value={viewValue}
          type={"text"}
          placeholder={"Введите сумму транзакции"}
          maxLength={"100"}
          disabled
          onChange={event => {
            const newValue = event.target.value
            formating(newValue)
            handleChangeValue(newValue)
          }}
        />

        {/* ----------------------------------------- */}
        {/* react useRef */}
        {/* ----------------------------------------- */}
        
        { false && <InputComponent ref={valueInput} inputValue={viewValue} action={handleChangeValue} placeholder={"Введите сумму транзакции"}/> }
        
        <FormControl style={{ marginTop: '9px', marginBottom: '12px' }}>
          <FormLabel id="demo-controlled-radio-buttons-group">Выберите тип транзакции</FormLabel>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={viewType}
            onChange={handleChange}
            style={{ marginTop: '5px', marginLeft: '6px' }}
          >
            <FormControlLabel value="расход" control={<Radio />} label="Расход" />
            <FormControlLabel value="доход" control={<Radio />} label="Доход" />
          </RadioGroup>
        </FormControl>
        { viewType === 'доход' && <InputComponent inputValue={viewComment} action={handleChangeComment} placeholder={"Введите комментарий"}/> }
        { viewType === 'расход' && <FormControl style={{ marginTop: '0px', marginBottom: '14px' }}>
          <FormLabel id="demo-controlled-radio-buttons-group">Выберите тип расходов</FormLabel>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={viewComment}
            onChange={handleChangeCommentRadio}
            style={{ marginTop: '5px', marginLeft: '6px' }}
          >
            <FormControlLabel value="покупка продуктов" control={<Radio />} label="Покупка продуктов" />
            <FormControlLabel value="оплата счетов" control={<Radio />} label="Оплата счетов" />
            <FormControlLabel value="покупка одежды" control={<Radio />} label="Покупка одежды" />
            <FormControlLabel value="расходы на транспорт" control={<Radio />} label="Расходы на транспорт" />
            <FormControlLabel value="развлечения" control={<Radio />} label="Развлечения" />
            <FormControlLabel value="путешествия" control={<Radio />} label="Путешествия" />
          </RadioGroup>
        </FormControl> }
        <Button 
          backgroundColor={
            viewValue.length < 3     ?
            "rgb(229, 229, 229)" :
            viewType.length < 3      ? 
            "rgb(229, 229, 229)" :
            "rgb(176, 243, 71)"
          }
          onClick={validation}
        >Сохранить транзакцию</Button>
      </FormContainer>
      { true && <FooterContext.Provider value={[ footerText, setFooterText ]}>
        
        <Foot></Foot>
      
      </FooterContext.Provider> }
      { false && <FooterContext.Provider value={footerText}>
        <FooterContext.Consumer>

          { value => <Foot>{ value }</Foot> }

        </FooterContext.Consumer>
      </FooterContext.Provider> }
    </React.Fragment>
  )
}

export default Main