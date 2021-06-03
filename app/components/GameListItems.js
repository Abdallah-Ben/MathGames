import React from 'react'
import { StyleSheet, Text, View,Image, TouchableOpacity } from 'react-native'
import {SIZES} from '../constants/'
const GameListItems = ({img, title, discription, func}) => {
    return (
                <TouchableOpacity onPress = {func}>
                <View style = {styles.image}>
                <Image 
                source = {img}
                style = {{height : '100%', width : '100%'}}
                resizeMode = 'stretch'
                />
                </View>
                <Text style = {styles.gameBoxText}>{title}</Text>
                <Text style = {styles.subText}>{discription}</Text>
                </TouchableOpacity>
    )
}

export default GameListItems

const styles = StyleSheet.create({
    gameBoxText : {
        fontSize : SIZES.height /40,
        textAlign : 'center'
    },
    subText : {
        fontSize : SIZES.height /65  ,
        marginHorizontal : 5, 
        textAlign : 'center'
    },
    image : {
        height : SIZES.height / 5 , 
        width : SIZES.width / 3,
        top : '3%',
        marginBottom : '3%',
        alignSelf : 'center'
    },
})
