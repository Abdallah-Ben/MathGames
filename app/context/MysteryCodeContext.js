import React from 'react'
import {images} from '../constants/'

const MysteryCodeContext = React.createContext();
export const MysteryCodeProvider = ({children}) =>{
    const initialVlues= [
        {number : 1, value : '', correctPositions : 0, correctNumbers : 0},
        {number : 2, value : '', correctPositions : 0, correctNumbers : 0},
        {number : 3, value : '', correctPositions : 0, correctNumbers : 0},
        {number : 4, value : '', correctPositions : 0, correctNumbers : 0},
        {number : 5, value : '', correctPositions : 0, correctNumbers : 0},
        {number : 6, value : '', correctPositions : 0, correctNumbers : 0},
        {number : 7, value : '', correctPositions : 0, correctNumbers : 0},
        {number : 8, value : '', correctPositions : 0, correctNumbers : 0},
        {number : 9, value : '', correctPositions : 0, correctNumbers : 0},
        {number : 10, value : '', correctPositions : 0, correctNumbers : 0},
    ]
    const howtoPlay = [{
        title : 'Classic puzzle game',
        discription : 'The goal is to break a 4-digit code, where each  digit is different, in the fewest of guesses.',
        img : images.puzzle, 
        buttonText : 'Skip'
    },{   
    title : 'How it works',
    discription : 'Guesses & feedback continue to appear alternately until either the code is guessed, or ten incorrect guesses have been made.',
    img : images.howItWorks, 
    buttonText : 'Skip'
    },{
    title : 'Green circle indicator',
    discription : 'Each green circle means that one of the guessed digits is corrent, and is in the right position.',
    img : images.indicators, 
    buttonText : 'Skip'
    },{
    title : 'Orange circle indicator',
    discription : 'Each white circle means that one of the guessed digits corrent, but is in the wrong position.',
    img : images.indicators, 
    buttonText : 'Skip'
    },{
    title : 'Indicator circles',
    discription : 'The order of the green and the orange circles  does not matter.',
    img : images.indicators, 
    buttonText : 'Done'
    }]
        const reducer = (state, action) =>{
        switch (action.type) {
            case 'enteredValue' :{
                let correctPositions = 0;
                let correctNumbers = 0;
                for (let i =0 ; i< 4 ; i++) { 
                    if (action.payload.generatedCode[i] === action.payload.value[i] ) {
                        correctPositions++
                        continue ;
                    }  
                    if (action.payload.generatedCode.includes(action.payload.value[i])) correctNumbers++
                }
                state.forEach((item, index)=>{
                        if (index == action.payload.attempt -1)  {
                            item.value = action.payload.value ;
                            item.correctNumbers = correctNumbers ;
                            item.correctPositions = correctPositions;
                            }  
                })
                return state
            }
            case 'clearData' : {
                state.forEach((item)=>{
                        item.value = '' ;
                        item.correctNumbers = '' ;
                        item.correctPositions = '';
            } )
            return state
            }
            default : return state;
        }    
    }
    const [state, dispatch] = React.useReducer(reducer, initialVlues)

    const submitedValue = ( attempt, value, generatedCode) =>{
        dispatch({type : 'enteredValue', payload : {attempt, value, generatedCode}})
    }
    const clearData = ( ) =>{
        dispatch({type : 'clearData' })
    }
    return (
    <MysteryCodeContext.Provider value ={{state, howtoPlay, submitedValue, clearData}}>
                     {children}
    </MysteryCodeContext.Provider>)
}
export default MysteryCodeContext;
