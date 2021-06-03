import React,{useState,useEffect, useContext} from 'react'
import { StyleSheet, View,Animated, ScrollView} from 'react-native'
import {GameListItems} from '../components/';
import {COLORS} from '../constants/'
import {GameListContext} from '../context/';
const HomeScreen = ({navigation}) => {
    useEffect(() => {
        enteringAnimation()
    }, [])
    const {state :gameListData } = useContext(GameListContext)
    const opacityValue = useState(new Animated.Value(0))[0] 
    function enteringAnimation(){
        Animated.timing(opacityValue,{
            toValue : 1,
            duration : 1000,
            useNativeDriver: true
        }).start()}
    return (
    <View style = {{flex : 1,backgroundColor : COLORS.white,  }} >
      <View style = {{flex : 1 }}>
        <ScrollView 
        style = {styles.scrollViewStyle} 
        contentContainerStyle = {styles.scrollViewContainer}>
            {   gameListData.map((item, index)=>(
                <Animated.View style = {[styles.gameBox,{opacity : opacityValue}]} key = {index}>
                <GameListItems
                img = {item.img}
                title = {item.title}
                discription = {item.discription}
                func = {()=> navigation.navigate(item.navigateTo)}
                />
                 </Animated.View>
                ))
            }
        </ScrollView>
      </View>
    </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({

    scrollViewStyle :{
        height : '100%',
        width : '100%',
    },
    scrollViewContainer :{
        flex : 1,
        flexWrap : 'wrap',
        alignItems: 'center', 
        flexDirection : 'row'
    },
    gameBox : {
        width : '42%',
        height : '35%',
        marginHorizontal : '4%',
        marginTop : '3%',
        borderColor : 'black',
        borderWidth : 1,
        borderRadius : 5,
        alignItems : 'center',
        justifyContent : 'center'
        }
})
