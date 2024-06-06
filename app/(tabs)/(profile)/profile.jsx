import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Redirect, router } from "expo-router";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../../firebase-config";
import { FIREBASE_AUTH } from '../../../firebase-config';

import Card from '../../../components/Card';
import CustomButton from '../../../components/CustomButton';

const Profile = () => {
  const [user, setUser] = useState([]);

  const app =  initializeApp(firebaseConfig)
  const auth = FIREBASE_AUTH

  const signout = () => {
    router.navigate("/");
    console.log(auth.currentUser.photoURL)
    auth.signOut().then(() => {
      console.log('Sesion cerrada')
    }).catch((error) => {
      console.log(error)
    });
  }
  return (
    <SafeAreaView>
      <View className="h-full justify-between items-center">
        <View className="w-full items-center">
          <Text className="text-3xl font-mbold w-[90vw]">Perfil</Text>
          <View className="bg-orange-200 h-32 w-[90vw] rounded-3xl mt-5 flex-row">
            <View className=" h-32 justify-center">
              <Image
                source={{uri: auth.currentUser.photoURL !== null ? auth.currentUser.photoURL : 'https://www.w3schools.com/w3images/avatar2.png'}}
                style={{ width: 100, height: 100, borderRadius: 100 }}
                className="ml-3"
              />
            </View>
            <View className=" h-32 justify-center w-60 ml-2">
              <Text className="text-2xl font-mbold w-60">{auth.currentUser.displayName}</Text>
              <Text className="text-sm">{auth.currentUser.email}</Text>
            </View>
          </View>
          <View className="h-56 w-[90vw] mt-6">
            <Text className="font-msemibold text-2xl">Mis datos</Text>
            <View className="w-[90vw] bg-gray-100 h-px mt-2"></View>
            <TouchableOpacity
              onPress={() => router.push('personal-data')}>
              <Text className="font-mregular text-lg p-2">Modificar datos personales</Text>
            </TouchableOpacity>
            <View className="w-[90vw] bg-gray-100 h-px"></View>
            <TouchableOpacity>
              <Text className="font-mregular text-lg p-2">Métodos de pago</Text>
            </TouchableOpacity>
            <View className="w-[90vw] bg-gray-100 h-px"></View>

            <Text className="font-msemibold text-2xl mt-5">Seguridad</Text>
            <View className="w-[90vw] bg-gray-100 h-px mt-2"></View>
            <TouchableOpacity
              onPress={() => router.push('change-password')}
            >
              <Text className="font-mregular text-lg p-2">Cambiar contraseña</Text>
            </TouchableOpacity>
            <View className="w-[90vw] bg-gray-100 h-px"></View>

          </View>

          <CustomButton 
            title="Cerrar sesion"
            handlePress={() => signout()}
            containerStyles="w-[60vw] mt-7"
          />
        </View>
        <View className="mt-[150px]">
          <Text className="font-mregular text-gray-500">Developed by @andres_somoza</Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Profile
