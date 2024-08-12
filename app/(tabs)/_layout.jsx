import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { MaterialIcons } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      headerShown: false
    }}>
      <Tabs.Screen
        name="Home"
        options={{
          tabBarLabel: "Chat",
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="robot" size={24} color={color} />
        }}

      />
       {/* <Tabs.Screen
        name="ChapterContentScreen"
        options={{
          tabBarLabel: "ChapterContentScreen",
          tabBarIcon: ({ color }) => <SimpleLineIcons name="book-open" size={24} color={color} />,
          tabBarButton: () => null // Hide the tab button
        }}
      /> */}
      <Tabs.Screen
        name="CourseDetails"
        options={{
          tabBarLabel: "Data",
          tabBarIcon: ({ color }) => <SimpleLineIcons name="book-open" size={24} color={color} />,
          tabBarButton: () => null // Hide the tab button
        }}
      />
      <Tabs.Screen name="MyCourse"
        options={{
          tabBarLabel: "Data",
          tabBarIcon: ({ color }) => <MaterialIcons name="library-books" size={24} color={color} />
        }}

      />
   
      <Tabs.Screen name="ProfileScreen"
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => <Ionicons name="people" size={24} color={color} />
        }}

      />


    </Tabs>

  )
}