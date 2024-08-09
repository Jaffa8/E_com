import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import firestore from '@react-native-firebase/firestore'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useIsFocused, useNavigation } from '@react-navigation/native'

const Products = () => {

  const navigation=useNavigation();

  const [productList,setProductList]=useState([])
  const isFocused = useIsFocused();

useEffect(()=>{
  getProducts();
},[isFocused])

const getProducts = async () => {
  try {
    const userId = await AsyncStorage.getItem("USERID");
    const snapshot = await firestore().collection("products").where("userId", "==", userId).get();
    console.log("Snapshot docs length:", snapshot.docs.length);
    if (snapshot.docs.length > 0) {
      console.log("First product data:", snapshot.docs[0].data());
      setProductList(snapshot.docs);
    } else {
      console.log("No products found for this user");
      setProductList([]);
    }
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

const deleteItem=(item)=>{
  
  firestore()
  .collection('products')
  .doc(item.data().productId)
  .delete()
  .then(() => {
    console.log('Product deleted!');
    getProducts();
  });
}

  return (
    <View>
      <Text  style={styles.container}  >Products</Text>
      <FlatList    
       data={productList}
       renderItem={({item,index})=>{
        return(
          <View  style={styles.productItem}  >
              <Image  source={{uri:item._data.productImage}}  
               style={styles.ProductImage}
              
              />
             <View  style={styles.infoview}  >
              <Text  style={styles.infotext}  >
              {item.data().ProductName}
              </Text>
              <Text>{item.data().desc}</Text>
<Text style={styles.pricetext}>{'INR ' + item.data().price}</Text>
             

            
            </View>
            
            <View>
                <TouchableOpacity   onPress={()=>{
                  navigation.navigate("AddProducts", {data: item.data(), type: 'edit'})
                }}   >
                  <Image  source={require('../images/edit.png')} style={styles.edit} />
                </TouchableOpacity>
                <TouchableOpacity     onPress={()=>{
                  deleteItem(item)
                }}     >
                  <Image  source={require('../images/delete.png')} style={styles.edit} />
                </TouchableOpacity>
                </View>
               
              </View>
        )
       }}
      
      />
    </View>
  )
}



const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  productItem:{
    width:Dimensions.get("window").width,
    height:120,
    flexDirection:"row",
    alignItems:"center",
   marginTop:40,
   paddingLeft:20,
   marginVertical:10,
   paddingRight:20,
    
  
  },
  ProductImage:{
    width:150,
    height:150,
    borderRadius:10,
    paddingVertical:10,
   
  },
  infotext:{
    fontSize:18,
    fontWeight:"600",
  },
  infoview:{
    marginLeft:20,
  },
  pricetext :{
   color:'green',
  },
  edit:{
    width:30,
    height:30,
    marginLeft:10,
    marginBottom:20,
  }
})

export default Products