

import { View} from 'react-native';
import { useUser, useClerk } from '@clerk/clerk-expo';
import WelcomeHeader from '../../Components/HomeScreen/WelcomeHeader'


import React, { useState, useEffect } from 'react';
import {  Text, TouchableOpacity, Image, StyleSheet, ScrollView, SafeAreaView, TextInput } from 'react-native';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function Home() {
  const [imageUri, setImageUri] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [inputText, setInputText] = useState('');

  // Adding the initial message when the component mounts
  useEffect(() => {
      addChatMessage('Bot', 'How can I assist you today with your food?');
  }, []);

  const pickImage = async () => {
      try {
          let result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: false,
              quality: 1,
          }); 

          if (!result.canceled) {
              const uri = result.assets[0].uri;
              setImageUri(uri);
              addChatMessage('User', null, uri);
          }
      } catch (error) {
          console.error('Error picking image:', error);
      }
  };

  const analyzeImage = async () => {

    sendMessage()
      try {
          if (!imageUri) {
              alert('Please select an image first!');
              return;
          }

          const apiKey = "YOUR_GOOGLE_CLOUD_VISION_API_KEY"; // Replace with your API key
          const apiURL = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;

          const base64ImageData = await FileSystem.readAsStringAsync(imageUri, {
              encoding: FileSystem.EncodingType.Base64,
          });

          const requestData = {
              requests: [
                  {
                      image: {
                          content: base64ImageData,
                      },
                      features: [{ type: 'LABEL_DETECTION', maxResults: 5 }],
                  },
              ],
          };

          addChatMessage('Bot', 'Analyzing image, please wait...');

          const apiResponse = await axios.post(apiURL, requestData);
          setChatHistory((prev) => prev.filter(msg => msg.text !== 'Analyzing image, please wait...'));

          const labels = apiResponse.data.responses[0].labelAnnotations;
          const labelsText = labels.map(label => label.description).join(', ');

          addChatMessage('Bot', `Analysis Results: ${labelsText}`);
      } catch (error) {
          console.error('Error analyzing image: ', error);
          alert('Error analyzing image. Please try again later');
      }
  };

  const addChatMessage = (sender, text = null, imageUri = null) => {
      setChatHistory((prev) => [
          ...prev,
          { sender, text, imageUri },
      ]);
  };

  const sendMessage = () => {
      if (inputText.trim()) {
          addChatMessage('User', inputText);
          setInputText('');
      }
  };
return (

    <View style={{ flex: 1 }}>
   
      <View style={{ padding: 10, backgroundColor:"#007AFF", height: 90, marginBottom: 30 }}>
        <WelcomeHeader />
      
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View>
        <SafeAreaView style={styles.container}>
            <View style={styles.chatContainer}>
                <ScrollView contentContainerStyle={styles.chatScrollContainer}>
                    {chatHistory.map((message, index) => (
                        <View
                            key={index}
                            style={[
                                styles.messageContainer,
                                message.sender === 'User'
                                    ? styles.userMessage
                                    : styles.botMessage,
                            ]}
                        >
                            {message.text && <Text style={styles.messageText}>{message.text}</Text>}
                            {message.imageUri && (
                                <Image
                                    source={{ uri: message.imageUri }}
                                    style={styles.imagePreview}
                                    resizeMode="contain"
                                />
                            )}
                        </View>
                    ))}
                </ScrollView>
            </View>
       
        </SafeAreaView>
        
        </View>
    </ScrollView>
    <View style={styles.inputContainer}>
                <TouchableOpacity onPress={pickImage} style={styles.inputButton}>
                    <Ionicons name="image-outline" size={24} color="white" />
                </TouchableOpacity>
                <TextInput
                    style={styles.inputField}
                    placeholder="Type a message..."
                    value={inputText}
                    onChangeText={setInputText}
                />
             
                <TouchableOpacity onPress={analyzeImage} style={styles.inputButton}>
                    <AntDesign name="caretright" size={24} color="white" />
                </TouchableOpacity>
            </View>
  </View>
  )
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },

  button: {
    marginTop: 20,
    backgroundColor: '#007AFF',
    padding: 10,
    margin: 30,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },

  socialMedia: {
    marginTop: 20,
    alignItems: 'center',
  },
  socialMediaIcons: {
    flexDirection: 'row',
    marginTop: 5,
    justifyContent: 'space-around',
    width: '80%',
  },

  container: {
    flex: 1,
},
chatContainer: {
    flex: 1,
},
chatScrollContainer: {
    paddingHorizontal: 10,
    paddingBottom: 80, // Enough padding to avoid hiding the last message behind the input container
   
},
messageContainer: {
    marginVertical: 10,
    padding: 10,
    borderRadius: 10,
    maxWidth: '1000%',
},
userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#007AFF',
},
botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#B5B2B3',
},
messageText: {
    fontSize: 16,
    color: '#fff',
},
imagePreview: {
    width: 200,
    height: 200,
    marginTop: 10,
    borderRadius: 10,
},
inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderColor: '#dddddd',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    display:'fix',
},
inputField: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginRight: 5,
},
inputButton: {
    padding: 10,
    backgroundColor: '#007AFF',
    borderRadius: 10,
    marginHorizontal: 5,
},
inputButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
},

});

