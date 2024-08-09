import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS } from '../Utils/Colors'

const CustomButton = ({title,onClick}) => {
  return (
   <TouchableOpacity  style={styles.btn} 
   onPress={()=>{
    onClick();
   }}
   >
    <Text  style={styles.submission}  >
        {title}
    </Text>
   </TouchableOpacity>
  )
}



const styles = StyleSheet.create({
    btn:{
        width:Dimensions.get('window').width-50,
        height:50,
        backgroundColor:COLORS.secondaryLightGreyHex,
        justifyContent:'center',
        alignSelf:'center',
        alignItems:'center',
        marginTop:40,
        marginTop:15,
        borderRadius:10
    },
    submission:{
        color:COLORS.primaryWhiteHex,
        fontSize:20,
        fontWeight:'bold'
    }
})

export default CustomButton