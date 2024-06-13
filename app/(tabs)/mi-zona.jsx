import { View, Text } from 'react-native'
import React from 'react'

import WeekDays from '../../components/WeekDay'
import Workout from '../../components/Workout'
const MiZona = () => {
  return (
    <View>
      <WeekDays />
      <View className="items-center justify-center">
      <Workout />
      </View>
    </View>
  )
}

export default MiZona