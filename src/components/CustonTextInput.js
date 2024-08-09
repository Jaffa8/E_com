import { Dimensions, StyleSheet, TextInput, View } from 'react-native'
import React from 'react'

const CustonTextInput = ({ placeholder, value, type, onChangeText, secureTextEntry }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        keyboardType={type ? type : 'default'}
        onChangeText={txt => {
          onChangeText(txt);
        }}
        secureTextEntry={secureTextEntry}
        autoCapitalize="none"
        autoCorrect={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 0.5,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
  }
})

export default CustonTextInput