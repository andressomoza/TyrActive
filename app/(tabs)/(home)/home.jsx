import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Redirect, router, Link } from "expo-router";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../../firebase-config";


import Card from '../../../components/Card';
import CustomButton from '../../../components/CustomButton';

const Home = () => {

  const app =  initializeApp(firebaseConfig)
  const auth = getAuth(app)
  const name = auth.currentUser.displayName
  let date = new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' });
  let [day, ...rest] = date.split(' ');
  day = day.charAt(0).toUpperCase() + day.slice(1);
  date = [day, ...rest].join(' ');


  return (
    <SafeAreaView>
      <View className="items-center justify-center">
        <View className="w-full items-end mr-10 mt-2">
          <Text className="text-l font-mregular">{date}</Text>
        </View>
        <View className="w-full ml-10 mt-3">
          <Text className="text-3xl font-mbold">Hola {name}</Text>
          <Text className="text-base font-mregular">¡Bienvenido a tu pantalla de inicio!</Text>
        </View>
        <Card 
          title={"Entrenamientos para todos"}
          image={"🏋🏽"}
          containerStyles={"bg-green-400"}
          handlePress={() => router.navigate('/workouts')}/>
        <Card 
          title={"Recetas"}
          image={"🥗"}
          containerStyles={"bg-red-400"}/>
      </View>
    </SafeAreaView>
  )
}

export default Home