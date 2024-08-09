import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '../Screens/Splash';
import Login from '../Screens/Login';
import SignUp from '../Screens/SignUp';
import Main from '../Screens/Main';
import AddProducts from '../Screens/AddProducts';







// importing the screens]



const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator >
    <Stack.Screen name="Splash" component={Splash}  options={{headerShown:false}}  />
    <Stack.Screen name="SignUp" component={SignUp}  options={{headerShown:false}}  />
    <Stack.Screen name="Login" component={Login}  options={{headerShown:false}}  />
    <Stack.Screen name="Main" component={Main}  options={{headerShown:false}}  />
    <Stack.Screen name="AddProducts" component={AddProducts}  options={{headerShown:true}}  />

    
    </Stack.Navigator>
  </NavigationContainer>
  )
}


const styles = StyleSheet.create({})


export default AppNavigator