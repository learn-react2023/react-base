import { useState } from 'react'

const useNumberValueFormat = (stringValue) => {

  const [ formatValue, setFormatValue ] = useState('')

  const formating = (stringValue) => {

    let enterString = stringValue
    let enterStringLen = enterString ? enterString.length : 0
    let exitString = ''

    if ( enterString ) {
      switch(enterStringLen) {

        case 4:
          exitString = enterString[0] + ' ' + enterString.slice(1)
          break
        case 5:
          exitString = enterString.slice(0, 2) + ' ' + enterString.slice(2)
          break
        case 6:
          exitString = enterString.slice(0, 3) + ' ' + enterString.slice(3)
          break
        case 7:
          exitString = enterString[0] + ' ' + enterString.slice(1, 4) + ' ' + enterString.slice(4)
          break
        case 8:
          exitString = enterString.slice(0, 2) + ' ' + enterString.slice(2, 5) + ' ' + enterString.slice(5)
          break
        default:
          exitString = enterString
          break

      }
    }

    setFormatValue(exitString)

  } 

  return [ formatValue, formating ]

}

export default useNumberValueFormat