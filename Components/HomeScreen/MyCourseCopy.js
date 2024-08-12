import { View, Text, ScrollView, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react'
import Colors from '../../Colors/Colors'
import { useUser } from '@clerk/clerk-expo';
import { useNavigation } from '@react-navigation/native';
import { GetAllProgressCourse } from '../../app/Services/Index';
import CourseProgressItem from '../MyCourse/CourseProgressItem';


export default function MyCourseCopy() {
    const {user}=useUser();
    const navigation=useNavigation();
    const [progressCourseList,setProgressCourseList]=useState();
    useEffect(()=>{
        user&&GetAllProgressCourseList()
    },[user])
    const GetAllProgressCourseList=()=>{
      GetAllProgressCourse(user.primaryEmailAddress.emailAddress)
      .then(resp=>{
        setProgressCourseList(resp.userEnrolledCourses)
      })
  }
  return (
    <ScrollView>
       <View style={{height:120,backgroundColor:"#007AFF",
    padding:30,}}>
    <Text style={{fontFamily:'outfit-bold',paddingTop:20,
  color:Colors.WHITE,
  fontSize:30}}>Nutritional Levels</Text>
    </View>


    <View style={styles.progressContainer}>
                <Text style={styles.progressLabel}>Calory</Text>
                <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: '70%' }]} />
                </View>
                
                <Text style={styles.progressLabel}>Sugar</Text>
                <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: '50%' }]} />
                </View>
                
                <Text style={styles.progressLabel}>Fat</Text>
                <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: '40%' }]} />
                </View>
            </View>
    
    </ScrollView>
  )
}



const styles = StyleSheet.create({
  headerText: {
      fontFamily: 'outfit-bold',
    
      color: Colors.WHITE,
      fontSize: 30,
  },
  progressContainer: {
    paddingTop: 60,
      padding: 30,
  },
  progressLabel: {
      fontSize: 18,
      fontWeight: '600',
      marginBottom: 10,
  },
  progressBar: {
      height: 20,
      backgroundColor: '#e0e0e0',
      borderRadius: 10,
      marginBottom: 20,
      overflow: 'hidden',
  },
  progressFill: {
      height: '100%',
      backgroundColor: '#007AFF',
      borderRadius: 10,
  },
});