
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppNavigator from './src/navigation/AppNavigator';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <AppNavigator />
  )
}



const styles = StyleSheet.create({})

export default App