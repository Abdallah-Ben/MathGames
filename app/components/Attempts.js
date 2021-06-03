import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { COLORS, SIZES } from '../constants';
const Attempts = ({correctPositions,correctNumbers,index,attempt, item, enteredCode  }) => {
    let answers = [];

    const attemptBall = (color,key)=>( // function that generates the indicators
        <View 
        key = {key}
        style ={[{backgroundColor : color},styles.attemptBall]}>
        </View>)

    for(let i = 0; i < correctPositions; i++ ){
        answers.push(attemptBall('#16D511',`CP${i}`)) //CP reference to Correct Positions
    }
    for(let i = 0; i < correctNumbers; i++ ){
        answers.push(attemptBall('#FF5F01',`CN${i}`)) // CN reference to Correct Numbers
    }
    for(let i = 0; i < 4 - (correctPositions + correctNumbers) ; i++ ){
        answers.push(attemptBall('transparent',`TB${i}`)) // TB reference to Transparent Ball
    }

      return(   
<View key = {index} style = {styles.attempts}>
    <View key = 'attemptNumberContainer' //print the number of the attempt
    style = {styles.attemptNumberContainer}>
        <Text style ={{fontSize : SIZES.height* 0.035, color : COLORS.tertiary}} >{`${item.number}.`}</Text>
    </View>
    <View key = 'enteredNumber'  //  view that display the entered number || the stored value || empty
    style = {{flex : 0.5,width : '50%', borderColor : COLORS.secondary, borderRightWidth :0.5,height : '100%', justifyContent : 'center', alignItems :'center'}}>
        <Text style ={{fontSize : SIZES.height* 0.038 }} >
         {(item.value) ? `${item.value[0]} ${item.value[1]} ${item.value[2]} ${item.value[3]}`
            : 
          (index == attempt-1) ?`${enteredCode[0] ? enteredCode[0] :'-'} ${enteredCode[1] ? enteredCode[1] :'-'} ${enteredCode[2] ? enteredCode[2] :'-'} ${enteredCode[3] ? enteredCode[3] :'-'}`
            :
              '- - - -'
        }
        </Text> 
    </View>
    <View key = 'numbersCheck'  // this view displays the indicators 
    style = {styles.attemptBallContainer}>
        {
            answers.map((item)=> item)
        }
    </View>
</View>
  )
}

export default Attempts

const styles = StyleSheet.create({
attemptBallContainer:{
        flex : 0.30, 
        flexDirection : 'row', 
        flexWrap : 'wrap', 
        justifyContent : 'center', 
        alignContent : 'center'   
},
attempts :{
    height : '17%',
    width : '47%',
    marginHorizontal : '1.5%',
    borderColor : '#00AF7D',
    borderWidth : 1,
    borderRadius : 8,
    flexDirection : 'row',
    backgroundColor : COLORS.white
},
attemptNumberContainer:{
    flex : 0.2,
    width : '20%', 
    borderColor : '#00AF7D', 
    borderRightWidth :0.5,
    height : '100%', 
    justifyContent : 'center', 
    alignItems : 'center'  
},
attemptBall :{
    height : '40%', 
    width : '40%',
    margin: '3%', 
    borderRadius: 15 , 
},
})
