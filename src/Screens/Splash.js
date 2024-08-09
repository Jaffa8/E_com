import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { COLORS, THEME_COLOR } from '../Utils/Colors'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'



const Splash = () => {
  const navigation=useNavigation()


useEffect(() => {
    setTimeout(() => {  
       checkLogin();
    }, 2000)
}, [])


const checkLogin=async()=>{
  const userId=await AsyncStorage.getItem("USERID")
  if(userId!=null){
    navigation.navigate("Main")
  }
  else{
    navigation.navigate("Login")
  }
}


  return (
    <View style={styles.container}  >
      <StatusBar  backgroundColor={'black'}  barStyle={'light-content'}  />
      <Text style={styles.logo}  >E-COM</Text>
      <Text style={styles.logo}  >Vendor App</Text>
    </View>
  )
}



const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:COLORS.secondaryGreyHex
  },
  logo:{
    fontSize:30,
    color:'white',
    fontWeight:'700'
  }
})

export default Splash