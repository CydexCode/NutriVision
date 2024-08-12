import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import Colors from '../../Colors/Colors';
import { useClerk } from "@clerk/clerk-expo";
import WelcomeHeaderProfile from '../../Components/HomeScreen/WelcomeHeaderProfile';
import About from '../../Components/HomeScreen/About';

export default function ProfileScreen() {
  const { signOut } = useClerk();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}></Text>
        <WelcomeHeaderProfile />
      </View>

      <View style={styles.content}>
        <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
            <Text style={styles.labelText}>Weight: </Text>56 kg
          </Text>
          <Text style={styles.infoText}>
            <Text style={styles.labelText}>Height: </Text>170 cm
          </Text>
          <Text style={styles.infoText}>
            <Text style={styles.labelText}>BMI: </Text>19.4
          </Text>
          <Text style={styles.infoText}>
            <Text style={styles.labelText}>Body Fat: </Text>15%
          </Text>
          <Text style={styles.infoText}>
            <Text style={styles.labelText}>Heart Rate: </Text>90 beats/min
          </Text>
          <Text style={styles.infoText}>
            <Text style={styles.labelText}>Body Temperature: </Text>37°C
          </Text>
          <Text style={styles.infoText}>
            <Text style={styles.labelText}>Meal Plan: </Text>Balanced Diet
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensure the container takes up the full screen height
  },
  header: {
    height: 120,
    backgroundColor:"#007AFF",
    padding: 30,
  },
  headerText: {
    fontFamily: 'outfit-bold',
    paddingTop: 40,
    color: Colors.WHITE,
    fontSize: 30,
  },
  content: {
    flex: 1, // Allows the content view to take up remaining space
    paddingHorizontal: 30, // Ensure content has horizontal padding
    paddingTop: 30,
  },
  infoContainer: {
    marginTop: 170, // Add some spacing between the header and the information
  },
  infoText: {
    fontSize: 18,
    marginVertical: 5, // Space between each piece of information
    color: '#333',
    fontFamily: 'outfit-regular', // Adjust this to match your app's typography
  },
  labelText: {
    fontWeight: 'bold', // Make the label bold
  },
});
