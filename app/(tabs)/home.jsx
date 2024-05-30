import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Redirect, router } from "expo-router";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../firebase-config";

import CustomButton from '../../components/CustomButton';

const Home = () => {
  const [user, setUser] = useState([]);

  const app =  initializeApp(firebaseConfig)
  const auth = getAuth(app)

  const prueba = () => {
    const usuario = auth.currentUser.uid
    console.log(usuario)
    setUser(usuario)
  }
  
  return (
    <SafeAreaView>
      <View>
        <Text>Home</Text>
        <Text>{user}</Text>
        <CustomButton 
            title="Mostrar id"
            handlePress={() => prueba()}
            containerStyles="w-[60vw] mt-7"
          />
      </View>
    </SafeAreaView>
  )
}

export default Home