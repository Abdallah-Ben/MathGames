import React from 'react'
import { StyleSheet, Text, Pressable } from 'react-native'
import { SIZES } from '../constants';

const KeyboardKeys = ({ enteredCode,index,number,onPressFn }) => {
    let isDisable;
    //check if the number is already used on the current attempt or we reached the length limit (4),
    //if so we disable the button
    if (enteredCode.includes(number) || enteredCode.length >=4 ) isDisable = true
    if (index == 9) return null
    return(                  <Pressable 
                                       disabled = {isDisable}
                                     
                                       onPress = {()=> {
                                        onPressFn(enteredCode + number)
                                        }}
                                       style = {({ pressed }) => [{backgroundColor: isDisable ? '#fcbebb' : pressed ? '#AEABA8': 'white'},styles.key]}>
                                <Text style ={{fontSize : SIZES.height* 0.06}}>{number}</Text>
                            </Pressable>
    )
}
export default KeyboardKeys
const styles = StyleSheet.create({
    key : {
        height : '32%' , 
        width : '30%',
        borderRadius : (SIZES.width* 0.25 * SIZES.width* 0.25) / (8 * SIZES.height* 0.1) + SIZES.height*0.1 / 2 ,
        marginHorizontal : SIZES.width *0.01,
        marginBottom : SIZES.width *0.01,
        justifyContent : 'center',
        alignItems : 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0,height: 5 },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 11,
    }
})
