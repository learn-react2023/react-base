import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setData as setDataFromRedux } from './redux-state/reducers/data'
import { Routes, Route } from 'react-router-dom'
import Head from './components/views/global/Head'
import Main from './components/pages/Main'
import Stat from './components/pages/Stat'
import Plan from './components/pages/Plan'

function App() {

  const [ ,setShowPage ] = useState('main')

  const data = useSelector(state => state.dataReducer.data)
  const dispatch = useDispatch()

  const setData = (param) => dispatch(setDataFromRedux(param))

  useEffect(() => {

    ( async () => {

      const data = await fetch('/get-data', {
        method: 'POST',
        headers: { "Content-type": "application/json; charset=UTF-8" }
      }).then(response => response.json())

      data.data.forEach(item => dispatch(setDataFromRedux(item)))

    })()

  }, [ dispatch ])

  return (
    <React.Fragment>
      <Head action={setShowPage}></Head>
      <Routes>
        <Route
          path={'/main'}
          element={<Main action={setData}/>}
        />
        <Route
          path={'/stat/:viewType'}
          element={<Stat statData={data}/>}
        />
        <Route
          path={'/plan'}
          element={<Plan statData={data}/>}
        />
        <Route
          path={'*'}
          element={<Main action={setData}/>}
        />
      </Routes>
    </React.Fragment>
  )
}

export default App
