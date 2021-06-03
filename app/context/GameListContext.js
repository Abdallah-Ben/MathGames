import React from 'react'
import {images} from '../constants/'
    const GameListContext = React.createContext();
export const GameListProvider = ({children}) =>{
    const gameListData = [
        {
            title : 'Mystery Code',
            discription : 'The game is about guessing a 4 digit number in short time',
            img : images.game1,
            navigateTo : 'MysteryCode'
        },
        {
            title : 'Coming Soon',
            discription : 'More games are coming soon, so expect us ^^',
            img : images.comingSoon,
            navigateTo : 'HomeScreen'
        }
    ] 
    const [state] = React.useState(gameListData)
  
    return (<GameListContext.Provider value ={{state}}>
                {children}
             </GameListContext.Provider>)
}
export default GameListContext;
