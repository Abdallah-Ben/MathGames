import React from 'react'
import { View, Text } from 'react-native'

export default () => {
    let numb = String(Math.floor(Math.random() * (9999 - 1 + 1) ) + 1) ;
    while(
        numb.includes(0) ||
        numb.slice(1,numb.length).includes(numb[0]) ||
        numb.slice(2,numb.length).includes(numb[1]) ||
            numb[2] ==numb[3]  || 
            numb.length < 4 
            )  numb = String(Math.floor(Math.random() * (10000 - 1 + 1) ) + 1)
    return numb
}
