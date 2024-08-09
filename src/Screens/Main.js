import { StyleSheet, Text, TouchableOpacity, View,Image } from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../Utils/Colors'
import Products from '../Tabs/Products'
import Orders from '../Tabs/Orders'

const Main = ({navigation}) => {

const [selectedTab,setSelectedTab]=useState(0)



  return (
    <View style={styles.container} >
        {selectedTab==0? <Products/>  : <Orders/>  }
    <View  style={styles.bottomView}  >

        <TouchableOpacity     
        onPress={()=>{
             setSelectedTab(0);
        }}
        >
            <Image source={require('../images/products.png')} 
           style={[styles.icons,{tintColor:selectedTab==0?COLORS.primaryOrangeHex :COLORS.primaryBlackHex}]}
            />
        </TouchableOpacity>

        <TouchableOpacity  
         onPress={()=>{
            navigation.navigate("AddProducts",{type:'new'})
         }}
        >
            <Image source={require('../images/addi.png')} 
            style={styles.icons}
            />
        </TouchableOpacity>


        <TouchableOpacity  
         onPress={()=>{
            setSelectedTab(1);
         }}
        >
            <Image source={require('../images/orders.png')} 
            style={[styles.icons,{tintColor:selectedTab==1?COLORS.primaryOrangeHex :COLORS.primaryBlackHex}]}
            />
        </TouchableOpacity>


        </View>

    </View>
  )
}



const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:COLORS.primaryWhiteHex
    },
    bottomView:{

        backgroundColor:COLORS.secondaryLightGreyHex,
        position:'absolute',
        bottom:0,
        width:'100%',
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        elevation:5,
        height:70,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around'
    },
    icons:{
        width:40,
        height:40,
    }

})


export default Main