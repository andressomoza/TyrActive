import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { RemoteInfoDatasource } from "../../data/remote-info.datasource";
import { getAuth } from "firebase/auth";
import { useIsFocused } from '@react-navigation/native';
import moment from 'moment';
import { router } from "expo-router";
import 'moment/locale/es';  // I

import Workout from '../../components/Workout'
import Diet from '../../components/Diet'
import CustomButton from '../../components/CustomButton';
const MiZona = () => {
  const [usuario, setUsuario] = useState({})
  const [modo, setModo] = useState('entrenamiento')
  const [selectedDay, setSelectedDay] = useState(moment().format('YYYY-MM-DD'))
  const [entrenamiento, setEntrenamiento] = useState([])
  const [dieta, setDieta] = useState([])
  const isFocused = useIsFocused()
  
  const auth = getAuth();

  const startOfWeek = moment().startOf('week')
  const days = Array.from({ length: 7 }, (_, i) => startOfWeek.clone().add(i, 'day'))
  const handleDayPress = (day) => {
    setSelectedDay(day.format('YYYY-MM-DD'))
  };

  
  useEffect(() => {
    if (isFocused) {
      RemoteInfoDatasource.getDoc('users', auth.currentUser.uid)
      .then((data) => {
        setUsuario(data)
      })

      RemoteInfoDatasource.getEntrenamientoDelDia(auth.currentUser.uid, selectedDay)
      .then((data) => {
        setEntrenamiento(data)
      })

      RemoteInfoDatasource.getDietaDelDia(auth.currentUser.uid, selectedDay)
      .then((data) => {
        setDieta(data)
      })
    }  
  }, [isFocused, selectedDay])
  return (
    <View>
      
      {usuario.tarifa === 'Entrenamiento personalizado' || usuario.tarifa === 'Entrenamiento personalizado + nutrición' 
      ? 
      <>
      <SafeAreaView className="bg-orange-400">
        <View className='flex-row justify-around p-[10px]'>
          {days.map((day, index) => (
            <TouchableOpacity key={index} onPress={() => handleDayPress(day)} className={`${day.format('YYYY-MM-DD') === selectedDay ? "bg-orange-300" : "bg-orange-400"} rounded-lg justify-center align-center w-[13vw] h-[8vh]`}>
              <View className='items-center'>
              {day.isSame(moment(), 'day') ? <View className='w-[7px] h-[7px] rounded-full bg-white mb-[5px]' /> : <View className='w-[7px] h-[7px] mb-[5px]' />}
                <Text className={`text-base ${day.format('YYYY-MM-DD') === selectedDay ? "font-mbold" : "font-mregular"}`}>
                  {day.format('ddd')}
                </Text>
                <Text className={`text-base ${day.format('YYYY-MM-DD') === selectedDay ? "font-mbold" : "font-mregular"}`}>
                  {day.format('D')}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </SafeAreaView>
      <View className="border-b-[1px] border-orange-500" />
      <View className="items-center justify-center">
        <View className="flex-row justify-around w-full bg-orange-400 p-3">
          <View className="w-[50vw] items-center">
            <TouchableOpacity className={`${modo === 'entrenamiento' ? 'bg-orange-300' : 'bg-orange-400'} rounded-xl`}
              onPress={() => setModo('entrenamiento')}>
              <Text className="font-msemibold text-lg w-[45vw] text-center p-1">Entrenamiento</Text>
            </TouchableOpacity>
          </View>
          <View className="w-[50vw] items-center">
            <TouchableOpacity className={`${modo === 'dieta' ? 'bg-orange-300' : 'bg-orange-400'} rounded-xl`}
              onPress={() => setModo('dieta')}>
              <Text className="font-msemibold text-lg w-[45vw] text-center p-1">Dieta</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="items-center justify-center mt-5">
        
        {modo === 'entrenamiento' 
          ? entrenamiento.length === 0 ? <Text>No hay entrenamiento para este día</Text> : <Workout entrenamiento={entrenamiento[0]}/>
          :
            modo === 'dieta' 
            ? usuario.tarifa !== 'Entrenamiento personalizado + nutrición' ? <Text>Para ver la dieta debe contratar el plan de entrenamiento + nutrición</Text>
            :
             dieta.length === 0 ? <Text>No hay dieta para este día</Text> : <Diet dieta={dieta[0]}/> 
          : <Text>Cargando</Text>}
           

        </View>
      </View>
      </>: 
      <SafeAreaView className="w-full h-full items-center justify-center">
        <View className="bg-orange-200 px-2 py-5 rounded-2xl">
          <Text className="text-center font-msemibold text-lg">¡Para contar con los entrenamientos personalizados contrate alguna de las tarifas que los incluyen!</Text>
        </View>
        <CustomButton title="Ver tarifas" containerStyles="w-[50vw] mt-7" handlePress={() => router.navigate('my-subscription')} />
      </SafeAreaView>
      }
      
    </View>
  )
}

export default MiZona