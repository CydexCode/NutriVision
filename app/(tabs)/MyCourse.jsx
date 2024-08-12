import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import MyCourseCopy from '../../Components/HomeScreen/MyCourseCopy.js'

export default function CourseProgress() {
  return (
    <View>
      <MyCourseCopy />

           <TouchableOpacity style={styles.button} >
                <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({


  button: {
      marginTop: 190,
      backgroundColor: '#007AFF',
      padding: 10,
      margin: 100,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
  },
  buttonText: {
      color: '#fff',
      fontSize: 18,
  },



});