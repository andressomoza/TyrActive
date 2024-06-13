import { View, Text, FlatList, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Redirect, router, Link } from "expo-router";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../../firebase-config";
import { RemoteInfoDatasource } from "../../../data/remote-info.datasource";


import Card from '../../../components/Card';
import CustomButton from '../../../components/CustomButton';
import WorkoutCard from '../../../components/WorkoutCard';
const Home = () => {
  const [user, setUser] = useState({})
  const [name, setName] = useState('')
  const [tipos , setTipos] = useState([])
  let date = new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })
  let [day, ...rest] = date.split(' ')
  day = day.charAt(0).toUpperCase() + day.slice(1)
  date = [day, ...rest].join(' ')
  const halfLength = Math.ceil(tipos.length / 2); 

const array1 = tipos.slice(0, halfLength);
const array2 = tipos.slice(halfLength, tipos.length);
  

  useEffect(() => {
    RemoteInfoDatasource.getDoc('users', getAuth().currentUser.uid)
    .then((data) => {
      setUser(data)
      console.log(user)
      let name = data.name.split(' ');
      name = name.slice(0, 2).join(' ');
      setName(name)
    })

    RemoteInfoDatasource.getCollection('tipos-entrenamiento')
    .then((response) => {
      setTipos(response)
      console.log(response)
      
    })
  }, [])

  const renderItem = ({ item }) => (
    <View>
      <WorkoutCard title={item.nombre}/>
    </View>

  );

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
          <View className="w-full mt-5 ml-10">
            <Text className="font-msemibold text-lg">Planes de entrenamiento</Text>
          </View>
          <FlatList
            className="w-full p-4 "
            horizontal
            showsHorizontalScrollIndicator={false}
            data={tipos}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
          

          <View className="items-center justify-center">
          <Card 
            title={"Recetas"}
            image={"🥗"}
            containerStyles={"bg-red-400"}
          />
          </View>
        </View>
      
    </SafeAreaView>
  )
}

export default Home