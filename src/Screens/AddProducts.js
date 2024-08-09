import { KeyboardAvoidingView, StyleSheet, Switch, Text, View,ScrollView, TouchableOpacity, Image, PermissionsAndroid} from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../Utils/Colors'
import CustonTextInput from '../components/CustonTextInput'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '../components/CustomButton'
import { launchImageLibrary } from 'react-native-image-picker'
import AsyncStorage from '@react-native-async-storage/async-storage'
import firestore from '@react-native-firebase/firestore'
import uuid from 'react-native-uuid'
import storage from '@react-native-firebase/storage'
import Loader from '../components/Loader'
import { useRoute } from '@react-navigation/native'


const AddProducts = ({navigation}) => {
const route=useRoute();

const [name, setName] = useState(() => {
  if (route.params?.type === 'edit' && route.params?.data?.ProductName) {
    return route.params.data.ProductName;
  }
  return '';
});
  const [desc,setDesc]=useState(() => {
    if (route.params?.type === 'edit' && route.params?.data?.desc) {
      return route.params.data.desc;
    }
    return '';
  });
  const [price,setPrice]=useState(() => {
    if (route.params?.type === 'edit' && route.params?.data?.price) {
      return route.params.data.price;
    }
    return '';
  });
  const [discountPrice,setDiscountPrice]=useState(() => {
    route.params?.type === 'edit' ? route.params.data.discountPrice:'';
  });
  const [inStock,setInStock]=useState(
    route.params?.type === 'edit' ? route.params.data.inStock : true
  );
  const [visible,setVisible]=useState(false);
  const [imageData,setImageData]=useState({assets:[
    {
        uri:route.params.type=='edit' ? route.params.data.productImage : '',
    },
  ]});


  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
        oppenGallary();
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const oppenGallary= async  ()=>{
   
    const res=await launchImageLibrary({mediaType:'photo'})
    if(!res.didCancel){
       setImageData(res);
    }
  }

  const saveProduct = async () => {
    setVisible(true);
    
      const username = await AsyncStorage.getItem("NAME");
      const userId = await AsyncStorage.getItem("USERID");
      const productId = uuid.v4();
      
      let productImageUrl = '';
      if (imageData.assets && imageData.assets[0]) {
        const reference = storage().ref(imageData.assets[0].fileName);
        const pathToFile = imageData.assets[0].uri;
        // uploads file
        await reference.putFile(pathToFile);
        productImageUrl = await reference.getDownloadURL();
        console.log("Uploaded image URL:", productImageUrl);
      }
      await firestore().collection('products').doc(productId).set({
        productId: productId,
        userId: userId,
        ProductName: name,
        username: username,
        desc: desc,
        price: price,
        discountPrice: discountPrice,
        inStock: inStock,
        productImage: productImageUrl  // Add this line to include the image URL
      })
      .then(res=>{
        setVisible(false);
        navigation.goBack();
      })
      .catch(error=>{
       setVisible(false);
      })
  
 
  
  
  };


  return (
   <SafeAreaView style={styles.safeArea}  >
     <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.containeronr}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >

<ScrollView
          contentContainerStyle={styles.scrollViewContainer}
          keyboardShouldPersistTaps="handled"
        >


     <View style={styles.container}  >

<View style={styles.banneerView} >
    { imageData.assets[0].uri==''?(
        <TouchableOpacity   
        onPress={()=>{
          requestCameraPermission();
        }}
      
      >
          <Image  source={require('../images/camera.png')}  
           style={styles.camera}
          
          />
      </TouchableOpacity>
    ):(
        <TouchableOpacity   
        style={styles.banner}
  onPress={()=>{
    requestCameraPermission();
  }}

>
    <Image  source={{uri:imageData.assets[0].uri }}  
     style={styles.banner}
    
    />
</TouchableOpacity>
    ) }

</View>

<CustonTextInput placeholder={'Product Name'}  value={name}  onChangeText={txt=>{
    setName(txt);}} />

<CustonTextInput placeholder={'Product Description'} value={desc}  onChangeText={txt=>{
    setDesc(txt);
}}
  />
<CustonTextInput placeholder={'Original Price'}  value={price}  onChangeText={txt=>{
    setPrice(txt);}}   type={'number-pad'} />
<CustonTextInput placeholder={'Discount Price'}  type={'number-pad'}  onChangeText={txt=>{
    setDiscountPrice(txt);}}    />



<View style={styles.StcokView}  value={discountPrice}  onChangeText={txt=>{
    setDiscountPrice(txt);}} >


<Text style={styles.TextStock}  >
In Stock
</Text>
<Switch   value={inStock}  onChange={()=>{
    setInStock(!inStock)
}}   />
</View>

<CustomButton  title={"Save Product"}   
onClick={()=>{
saveProduct();
}}
/>



</View>
<Loader  visible={visible}  />
</ScrollView>
</KeyboardAvoidingView>
   </SafeAreaView>
  )
}




const styles = StyleSheet.create({
    safeArea:{
        flex: 1,

    },
    containeronr:{
        flex: 1,
    },
    scrollViewContainer:{
        flexGrow: 1,
        paddingBottom: 40,
    },
    container:{
        flex:1,
        backgroundColor:COLORS.primaryWhiteHex
    },
    banneerView:{
        width:'90%',
        height:200,
        borderWidth:0.5,
        alignSelf:'center',
        marginTop:30,
        borderRadius:10,
        marginBottom:20,
        justifyContent:'center',
        alignItems:'center'
    },
    StcokView:{
        width:'90%',
        alignSelf:'center',
        marginTop:20,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingLeft:20,
        paddingRight:20
    },
    TextStock:{
        fontWeight:'400',
        color:COLORS.secondaryDarkGreyHex,
        fontSize:18
    },
    camera:{
width:50,
height:50
    },
    banner:{
        width:'100%',
        height:'100%',
        borderRadius:10
    }
})

export default AddProducts