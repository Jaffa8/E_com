import { StyleSheet, Text, View, Image, ScrollView, KeyboardAvoidingView, TouchableOpacity, Platform, SafeAreaView, Alert } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../Utils/Colors';
import CustonTextInput from '../components/CustonTextInput';
import CustomButton from '../components/CustomButton';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
import Loader from '../components/Loader';

const SignUp = ({ navigation }) => {


  const [visible,setVisible]=useState(false);




  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const registerVendor = () => {
    setVisible(true)
    const userId = uuid.v4();
    firestore()
      .collection('vendors')
      .doc(userId)
      .set({
        name: name,
        email: email,
        mobile: mobile,
        password: password,
        userId: userId,
      })
      .then((res) => {
        setVisible(false)
        console.log('User created');
        navigation.goBack();
      })
      .catch((error) => {
        setVisible(false)
        console.log(error);
      });
  };


const validate=()=>{
   let valid=true;
   if(name=='' || email=='' || mobile=='' || mobile.length<10 || password==''  || confirmPass=='' || confirmPass!=password ){
    valid=false;
   }
   return valid;
}


  return (
  
    <SafeAreaView style={styles.safeArea}>
    
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView
          contentContainerStyle={styles.scrollViewContainer}
          keyboardShouldPersistTaps="handled"
        >
          <Image source={require('../images/final.jpg')} style={styles.Banner} />
          <TouchableOpacity
            style={styles.backBUtton}
            onPress={() => {
              navigation.pop();
            }}
          >
            <Image source={require('../images/image_back.jpg')} style={styles.backIcon} />
          </TouchableOpacity>
          <View style={styles.card}>
            <Text style={styles.Title}>SignUp</Text>
            <CustonTextInput placeholder={'Enter name'} value={name} onChangeText={(txt) => setName(txt)} />
            <CustonTextInput placeholder={'Enter Email'} value={email} onChangeText={(txt) => setEmail(txt)} />
            <CustonTextInput placeholder={'Enter mobile'} type={'number-pad'} value={mobile} onChangeText={(txt) => setMobile(txt)} />
            <CustonTextInput placeholder={'Enter password'} value={password} onChangeText={(txt) => setPassword(txt)} secureTextEntry={true} />
            <CustonTextInput placeholder={'Confirm Password'} value={confirmPass} onChangeText={(txt) => setConfirmPass(txt)} secureTextEntry={false} />
            <CustomButton
              title={'Sign Up'}
             onClick={()=>{
              if(validate()){
                registerVendor();
              }
              else{
                Alert.alert("Please check the credentials")
              }
            
             }}
            />
           
          </View>
       <Loader visible={visible}  />
        
        </ScrollView>
      </KeyboardAvoidingView>
   
    </SafeAreaView>
      
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
   
  },
  container: {
    flex: 1,
  },
  scrollViewContainer: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  Banner: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  card: {
    backgroundColor: 'white',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 30,
  },
  Title: {
    alignSelf: 'center',
    fontSize: 25,
    fontWeight: '500',
    color: '#4C4B4B',
    marginBottom: 20,
  },
  backBUtton: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: COLORS.primaryLightGreyHex,
    elevation: 5,
    position: 'absolute',
    top: 10,
    left: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    width: '60%',
    height: '60%',
  },
});

export default SignUp;