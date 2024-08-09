import { StyleSheet, Text, View,Image, ScrollView, Keyboard, Touchable, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect,useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { COLORS, THEME_COLOR } from '../Utils/Colors'
import CustonTextInput from '../components/CustonTextInput'
import CustomButton from '../components/CustomButton'
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage'



const Login= ({navigation}) => {

 

  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');

  const loginUser=()=>{
  firestore().collection('vendors').where("email","==",email  )
   .where("password","==",password )
  .get().then(snapShot=>{
    if(!snapShot.empty){
      
    
        console.log("User logged In")

        goToNextScreen(snapShot.docs[0].data())
      
        
      
    }
  } )
  .catch(error=>{
   
    console.log("USER NOT REGISTERED")
  
  })
  
  }

  const goToNextScreen = async data=>{
    await  AsyncStorage.setItem("NAME",data.name);
    await  AsyncStorage.setItem("EMAIL",data.email);
    await  AsyncStorage.setItem("MOBILE",data.mobile);
    await  AsyncStorage.setItem("USERID",data.userId);
    navigation.navigate("Main");
  }
  



  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer} >
    <View style={styles.Container}  >
   
    
     <Image source={require('../images/final.jpg')} style={styles.Banner}   />
     <View style={styles.card}  >

    <Text style={styles.Title}  >
      Login
    </Text>


    <CustonTextInput placeholder={'Enter Email'} value={email} onChangeText={(txt) => setEmail(txt)} />

    <CustonTextInput placeholder={'Enter password'} value={password} onChangeText={(txt) => setPassword(txt)} secureTextEntry={true} />
  

    <CustomButton  title={'Login'}  onClick={()=>{
     
     loginUser();
   
    }}  />

<View  style={styles.row}  >
        <Text>
           {"Don't have account ? "}
        </Text>

        <TouchableOpacity   
        onPress={()=>{
          navigation.navigate('SignUp')
        }
        }
        
        >  
        
        <Text  style={styles.added}  
        
        >
          {" Create an account"}
        </Text>
        </TouchableOpacity> 
        

     </View   >

     </View>

 
   
   
    </View>
    </ScrollView>
   
  )
}



const styles = StyleSheet.create({
  scrollViewContainer:{
  flex:1
  },
  Container:{
   flex:1,
  },
  Banner:{
   width:'100%',
   height:230,
  
  },
  card:{
    width:'95%',
    height:'100%',
    backgroundColor:'white',
    position:'absolute',
    top:240,
    elevation:5,
    borderTopLeftRadius:40,
    borderTopRightRadius:40,
    alignSelf:'center'
  },
  Title:{
   alignSelf:'center',
   fontSize:25,
   fontWeight:'500',
   color:'#4C4B4B'

  },
  row:{
    flexDirection:'row',
    alignItems:'center',
    marginTop:60,
    justifyContent:'center'
  },
  added:{
    color:COLORS.primaryOrangeHex,
    fontWeight:'bold'
  }
})


export default Login