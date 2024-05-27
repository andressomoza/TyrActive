import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Redirect, router } from "expo-router";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../firebase-config";

import CustomButton from '../../components/CustomButton';

const Profile = () => {
  const [user, setUser] = useState([]);

  const app =  initializeApp(firebaseConfig)
  const auth = getAuth(app)

  const signout = () => {
    auth.signOut().then(() => {
      console.log('Sesion cerrada')
      router.navigate("/");

    }).catch((error) => {
      console.log(error)
    });
  }
  return (
    <SafeAreaView>
      <View>
        <Text>Profile</Text>
        <CustomButton 
          title="Cerrar sesion"
          handlePress={() => signout()}
          containerStyles="w-[60vw] mt-7"
        />
      </View>
    </SafeAreaView>
  )
}

export default Profile
