import React, { useContext, useState, useEffect } from 'react'
import {  StyleSheet,ScrollView, View, Text, Modal, Pressable, Image, Alert  } from 'react-native'
import { COLORS, SIZES } from '../constants';
import { Ionicons,AntDesign,FontAwesome5,MaterialCommunityIcons } from '@expo/vector-icons'; 
import {MysteryCodeContext} from '../context/';
import {KeyboardKeys,Attempts} from '../components/';
import useGenerator from '../Hooks/useGenerator'

const MysteryCode = ({navigation}) => {
    const calculateTime = (table)=>{
        let secends = 0;
        let min;
        for (let i = 0; i< table.length; ){
            secends = secends + (table[i+1] - table[i])
                i = i +2;  
        }
        // the value of seconds now is in Ms
        min = Math.floor(secends/60000)
        secends = Math.floor(secends/1000) % 60 

        return ( (min) ? `${min} minuts and ${secends} seconds` : `${secends} seconds`)
    }
    const {state, howtoPlay, submitedValue, clearData} = useContext(MysteryCodeContext);
    const [generatedCode, setGeneratedCode] = useState('')
    const [attempt, setAttempt] = useState(1);
    const [enteredCode, setEnteredCode] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [result, setResult] = useState('');
    const [timer, setTimer] = useState([]);

    useEffect(() => {
        const listnerAdded = navigation.addListener('beforeRemove', (e) => {
            if (!(attempt - 1)) {
                clearData()}
            else {
                e.preventDefault();
                Alert.alert('Are you sure you want to quit?','All progress will be lost !',
                [{ 
                    text: "Don't leave", style: 'cancel', onPress: () => {}
                },{
                    text: 'Discard',style: 'destructive', onPress: () => {clearData();navigation.dispatch(e.data.action)}
            }]
            )
            }
            },)
            if (!generatedCode) {
                setGeneratedCode(useGenerator()); //generate the mystery number
                setTimer([...timer, new Date()]); // start counting the time
            } 
            return listnerAdded;            
        },[Boolean(attempt-1)])
            // I used the Boolean method trick to prevent the listener from being created many times
            // instead it will be created only once when the attempt reaches 2
     return (
         <View style = {{flex : 1,}} >
             <View style ={styles.helpExitView }>
                 <Pressable onPress = {()=> navigation.navigate('HomeScreen')}>
                    <View 
                    style ={{ marginLeft : SIZES.width * 0.03, flexDirection : 'row',paddingHorizontal : '1%', borderRadius : 8,backgroundColor : COLORS.red, alignItems : 'center', justifyContent : 'center', width : SIZES.width * 0.3, height : '90%' }}>
                        <Ionicons name="exit-outline" style={{transform: [{rotateY: '180deg'}]}} size={24} color={COLORS.white} />
                        <Text style ={{fontSize : SIZES.width * 0.055, marginLeft : SIZES.width * 0.008, color : COLORS.white }}>Exit</Text>
                    </View>
                 </Pressable>
                 <Pressable onPress = {()=> {setTimer([...timer, new Date()]); setModalVisible(!modalVisible)}}>
                    <View 
                    style ={{ marginRight : SIZES.width * 0.03, flexDirection : 'row',paddingHorizontal : '1%', borderRadius : 8,backgroundColor : COLORS.secondary, alignItems : 'center', justifyContent : 'center', width : SIZES.width * 0.45, height : '90%' }}>
                        <Text style ={{fontSize : SIZES.width * 0.055, marginRight : SIZES.width * 0.008}}>How To Play</Text>
                        <AntDesign name="questioncircleo" size={24} color={COLORS.black} />
                    </View>
                 </Pressable>
             </View>
             <View style = {styles.attemptsContainer}>
                 { 
                   state.map((item, index) =>{ 
                            return (
                            <Attempts
                            key = {index}
                            correctPositions ={item.correctPositions}
                            correctNumbers ={item.correctNumbers}
                            index ={index}
                            attempt = {attempt}
                            enteredCode ={enteredCode}
                            item ={item}
                            />)})
                }           
             </View>
             <View style= {styles.keyboardMainContainer}>
                <View  style = {styles.keyboardContainer}>
                    {state.map((item, index)=>{
                            return(
                            <KeyboardKeys
                                key ={index} 
                                enteredCode = {enteredCode}
                                number ={item.number}
                                onPressFn ={setEnteredCode}
                                index ={index}
                            />)
                        })}
                 </View>
                <View style = {styles.subDelView}>
                            <Pressable 
                                    disabled = {!enteredCode.length}
                                    onPress = {()=>{
                                        //delete one number from the entered code
                                        setEnteredCode(enteredCode.slice(0,enteredCode.length -1))
                                    }}
                                    style = {({ pressed }) => [{backgroundColor: pressed ? '#fcbebb': COLORS.white},styles.deleteKey]}>
                                        <Ionicons name="md-backspace-outline" size={50} color="#FF2428" />
                            </Pressable>
                            <Pressable
                                    disabled = {enteredCode.length!=4}
                                    onPress = { ()=> {
                                        submitedValue(attempt,enteredCode, generatedCode);
                                        setAttempt(attempt + 1);
                                        if ((enteredCode == generatedCode) || attempt == 10) {
                                            setTimer([...timer, new Date()]);
                                            attempt == 10 ? setResult('Defeat') : setResult('Victory') ;
                                        }
                                        setEnteredCode('');
                                        }} 
                                    style = {({ pressed }) => [{backgroundColor: pressed ? '#8DEEA6': COLORS.white},styles.enterKey]}>
                                        <AntDesign name="enter"  size={50} color={COLORS.black} />                            
                            </Pressable>     
                </View>
            </View>
            <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
                setTimer([...timer, new Date()]);
                }}
                >
                <View style ={styles.howToPlayContainer}>
                <ScrollView 
                showsHorizontalScrollIndicator = {false}
                horizontal
                pagingEnabled
                scrollEnabled
                style = {{flex : 1}}>
                    {
                    howtoPlay.map((item, index)=> 
                    <View key ={index}
                          style ={{width : SIZES.width*0.7, alignItems : 'center'}} >
                        <View style ={styles.imageView}>
                            <Image
                            resizeMode = 'stretch'
                            style = {{height : '100%', width : '100%', borderRadius : 8}}
                            source ={item.img}
                            />
                        </View>
                        <View key = 'text view' style = {{width : '90%', flex : 0.45}}>
                            <Text style ={{textAlign : 'center', fontSize : SIZES.width * 0.06, marginBottom : '2%'}}>
                                {item.title}
                            </Text>
                            <Text style ={{textAlign : 'center'}}>
                                {item.discription}
                            </Text>
                        </View>
                        <View style = {{flex : 0.25, width : '100%', alignItems : 'center'}}>
                            <Text style = {{fontSize : SIZES.width * 0.05, color : COLORS.primery , marginTop :SIZES.height * 0.001}}>
                                {`( ${index+1} \\ ${howtoPlay.length} )`}
                            </Text>
                            <Pressable 
                            style = {styles.modalHTPButton}
                            onPress = {()=> {setTimer([...timer, new Date()]); setModalVisible(!modalVisible)}}>
                                <Text>{item.buttonText}</Text>
                            </Pressable>
                        </View>
                    </View>)
                    }
                </ScrollView>
                </View>
            </Modal>
            <Modal
            animationType="slide"
            transparent={true}
            visible={Boolean(result)}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
                setTimer([...timer, new Date()]);
                }}
                >
                    <View style ={styles.howToPlayContainer}>
                     <View style ={styles.imageView}>
                     {(result == 'Defeat') ? <FontAwesome5 name="sad-tear" size={100} color= {COLORS.secondary} /> : 
                                <MaterialCommunityIcons name="party-popper" size={100} color={COLORS.primery} /> }
                    </View>
                        <View key = 'text view' style = {{width : '90%', flex : 0.45}}>
                            <Text style ={{textAlign : 'center', fontSize : SIZES.width * 0.09, marginBottom : '2%'}}>
                                {result}
                            </Text>
                            <Text style ={{textAlign : 'center'}}>
                                {(result == 'Defeat') ? 'You lost but it\'s allright you can try again' : 
                                `You won! Congtagulations\n It took you ${ calculateTime(timer)}` }
                            </Text>
                        </View>
                    <View style = {{flex : 0.25, width : '100%', alignItems : 'center', flexDirection : 'row', justifyContent : 'space-between'}}>
                            <Pressable 
                            style = {{
                                height : SIZES.height * 0.05,
                                width: SIZES.width * 0.25,
                                borderRadius : 15,
                                justifyContent : 'center',
                                alignItems  : 'center',
                                backgroundColor : COLORS.red,
                                marginLeft : SIZES.width * 0.03
                            }}
                            onPress = {()=> {
                                setAttempt(1);
                                setResult('');
                                            }
                                }>
                                <Text style ={{color : COLORS.white}}>Dismiss</Text>
                            </Pressable>
                            <Pressable 
                            style = {{
                                height : SIZES.height * 0.05,
                                width: SIZES.width * 0.25,
                                borderRadius : 15,
                                justifyContent : 'center',
                                alignItems  : 'center',
                                backgroundColor : COLORS.tertiary,
                                marginRight : SIZES.width * 0.03
                            }}
                            onPress = {()=> {
                                setResult('')
                                setTimer([]);
                                setGeneratedCode('');
                                setAttempt(1);
                                clearData();
                                } }>
                                <Text>{ (result == 'Defeat' ) ?'Try Again' : 'Play Again'}</Text>
                            </Pressable>
                    </View>
                </View>
            </Modal>
         </View>
    )
}

export default MysteryCode

const styles = StyleSheet.create({
    helpExitView:{
        marginVertical : SIZES.height *0.005,
        flex : 0.1,
        width : SIZES.width,
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'space-between'
    },
    attemptsContainer :{
        marginBottom : SIZES.height *0.01,
        flex : 0.63,
        width : SIZES.width,
        justifyContent : 'space-around',
        flexWrap : 'wrap',
    },
    keyboardMainContainer :  {
        flex : 0.45,
        width : SIZES.width,
        flexDirection : 'row',
    },
    keyboardContainer:{  
        justifyContent : 'center',
        paddingHorizontal : SIZES.width *0.02,
        flexWrap : 'wrap',
        height : '100%' ,
        marginLeft : SIZES.width *0.05,
        width : SIZES.width *0.69,
        flexDirection : 'row',
    },
    subDelView : {
        flexWrap : 'wrap',
        height : '100%' ,
     width : SIZES.width *0.22,
     marginRight : SIZES.width *0.05,
     justifyContent : 'center',
     alignItems : 'center'
    },
    deleteKey: {
        marginBottom : SIZES.height *0.009,
        width : '80%',
        height : '47%',
        justifyContent : 'center',
        alignItems : 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0,height: 5 },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 11,
        borderRadius : 8
    },
    enterKey : {
        marginTop : SIZES.height *0.0009,
        width : '80%',
        height : '47%',
        justifyContent : 'center',
        alignItems : 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0,height: 5 },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 11,
        borderRadius : 8
    },
    imageView :{
        height : '35%',
        width : '45%',
        marginVertical : SIZES.height * 0.02,
        justifyContent : 'center',
        alignItems : 'center',
        flex : 0.42
     },
     howToPlayContainer : {
        height : SIZES.height/2, 
        width : SIZES.width*0.7, 
        position : 'absolute',
        top :  SIZES.height * 0.16,  
        backgroundColor : COLORS.white,
        alignSelf : 'center',
        borderRadius : 8,
        alignItems : 'center',
        
        shadowColor: "#000",
        shadowOffset: { width: 0,height: 5 },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 11,
        borderRadius : 8,
        },
    modalHTPButton: {
        height : SIZES.height * 0.05,
        width: SIZES.width * 0.3,
        position : 'absolute',
        right : SIZES.width * 0.02,
        bottom : SIZES.height * 0.01,
        borderRadius : 15,
        justifyContent : 'center',
        alignItems  : 'center',
        backgroundColor : COLORS.tertiary
        }

})