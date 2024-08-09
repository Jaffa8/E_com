import { ActivityIndicator, Dimensions, Modal, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../Utils/Colors'

const {width,height}=Dimensions.get('window')

const Loader = ({visible}) => {
  return (
   <Modal  visible={visible} transparent={true}  >
    <View style={styles.modelView}  >

        <View style={styles.mainView}  >

            <ActivityIndicator size={'large'}   />

        

        </View>

    </View>
    </Modal>
  )
}



const styles = StyleSheet.create({
    modelView:{
       width:width,
       height:height,
        position:'absolute',
        backgroundColor:'rgba(0,0,0,0.5)',
        justifyContent:'center',
        alignItems:'center'
    },
    mainView:{
         height:100,
         width:100,
         borderRadius:10,
         justifyContent:'center',
         alignItems:'center',
         backgroundColor:COLORS.primaryWhiteHex
    }
})


export default Loader