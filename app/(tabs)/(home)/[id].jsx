import { View, Text, SafeAreaView, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { RemoteInfoDatasource } from "../../../data/remote-info.datasource";
import { useIsFocused } from '@react-navigation/native';

import TopButtons from '../../../components/TopButtons'
import Workout from '../../../components/Workout'
const WorkoutPage = () => {
  const { id } = useLocalSearchParams()
  const [workout, setWorkout] = useState({})
  const isFocused = useIsFocused()

  useEffect(() => {
    if (isFocused) {
      RemoteInfoDatasource.getDoc('tipos-entrenamiento', id)
      .then((data) => {
        setWorkout(data)
      })
    }
    
}, [isFocused])
  
  return (
    <SafeAreaView>
      <TopButtons title={workout.nombre}/>
      <View className="items-center justify-center p-5">
        {Object.keys(workout).length !== 0 ? <Workout entrenamiento={workout}/> : <Text>Cargando...</Text>}
      </View>
    </SafeAreaView>
  )
}

export default WorkoutPage