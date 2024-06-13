import { View, Text, SafeAreaView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { RemoteInfoDatasource } from "../../../data/remote-info.datasource";

import TopButtons from '../../../components/TopButtons'
import Workout from '../../../components/Workout'
const WorkoutPage = () => {
  const { id } = useLocalSearchParams()
  const [workout, setWorkout] = useState({})

  useEffect(() => {
    //RemoteInfoDatasource.getDoc()
  }, [])
  
  return (
    <SafeAreaView>
      <TopButtons title={id}/>
      <View className="items-center justify-center p-5">
        <Workout />
      </View>
    </SafeAreaView>
  )
}

export default WorkoutPage