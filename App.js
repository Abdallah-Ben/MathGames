import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import {HomeScreen, 
        } from './app/screens/'
import {GameListProvider,} from './app/context/';
import {COLORS} from './app/constants/'

  const App = ()=> {
  const {Screen, Navigator} = createStackNavigator();
    return (
    <NavigationContainer >
      <Navigator   initialRouteName = 'HomeScreen'>
       <Screen name="HomeScreen" 
       options = {{title :'Games List', headerStyle : {backgroundColor :COLORS.primery}, headerTitleAlign : 'center' }} 
       component = {HomeScreen}/>
      </Navigator>
    </NavigationContainer>
  );
}

export default ()=>{
  return (<GameListProvider>
            <App/>
        </GameListProvider>)
  
}