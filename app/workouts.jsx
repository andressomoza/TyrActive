import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { router } from "expo-router";
import { SafeAreaView } from 'react-native-safe-area-context'

import WorkoutCard from '../components/WorkoutCard'
import TopButtons from '../components/TopButtons'

const workouts = () => {
  return (
    <SafeAreaView>
      <TopButtons
        title={"Ejercicios"} />
      <View className="w-full items-center justify-center">
        <WorkoutCard name="Full Body" exercises="5" image="🏋️‍♂️" />
        <WorkoutCard name="Upper Body" exercises="3" image="🏋️‍♂️" />
        <WorkoutCard name="Lower Body" exercises="2" image="🏋️‍♂️" />

      </View>
    </SafeAreaView>
  )
}

export default workouts