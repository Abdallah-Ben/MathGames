import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import {HomeScreen,
        MysteryCode
        } from './app/screens/'
import {GameListProvider,
        MysteryCodeProvider
        } from './app/context/';
import {COLORS} from './app/constants/'

  const App = ()=> {
  const {Screen, Navigator} = createStackNavigator();
    return (
    <NavigationContainer >
      <Navigator   initialRouteName = 'HomeScreen'>
       <Screen name="HomeScreen" 
       options = {{title :'Games List', headerStyle : {backgroundColor :COLORS.primery}, headerTitleAlign : 'center' }} 
       component = {HomeScreen}/>
       <Screen name="MysteryCode" 
       options = {{title :'Mystery Code',gestureEnabled: false, headerLeft : null, headerStyle : {backgroundColor :COLORS.primery}, headerTitleAlign : 'center' }} 
       component={MysteryCode}/>
      </Navigator>
    </NavigationContainer>
  );
}

export default ()=>{
  return (<GameListProvider>
            <MysteryCodeProvider>
              <App/>
            </MysteryCodeProvider>
        </GameListProvider>)
  
}