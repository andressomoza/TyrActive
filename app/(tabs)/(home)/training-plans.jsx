import { View, Text, SafeAreaView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RemoteInfoDatasource } from '../../../data/remote-info.datasource'

import TopButtons from '../../../components/TopButtons'
import WorkoutCard from '../../../components/WorkoutCard'
const TrainingPlans = () => {
  const [tipos , setTipos] = useState([])

  useEffect(() => {
    RemoteInfoDatasource.getCollection('tipos-entrenamiento')
    .then((response) => {
      setTipos(response)
      console.log(response)
    })
  }, [])

  const renderItem = ({ item }) => (
    <View className="w-full items-center justify-center ">
    <WorkoutCard title={item.nombre} />
    </View>
  );

  return (
    <SafeAreaView className="">
      <TopButtons title={"Planes de entrenamiento"}/>
      <View className="w-full items-center justify-center">
        
        <FlatList
          className="w-full"
          data={tipos}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
      
    </SafeAreaView>
  )
}

export default TrainingPlans