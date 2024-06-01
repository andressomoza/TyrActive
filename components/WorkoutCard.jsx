import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const WorkoutCard = ({ name, exercises, image }) => {
  return (
    <TouchableOpacity
      //onPress={id}
      activeOpacity={0.7}
      className={`rounded-3xl h-[100px] w-[90vw] mt-7 bg-blue-200 flex-row items-center justify-between`}
      /*disabled={}*/>
      <View className="h-full justify-center ml-4">
        <Text className={`text-black font-mregular text-lg w-64`}>{name}</Text>
        <Text className={`text-black font-mregular text-lg w-64`}>Nº de ejercicios: {exercises}</Text>
      </View>
      <Text className={`text-white font-mbold text-7xl w-64`}>{image}</Text>
    </TouchableOpacity>
  )
}

export default WorkoutCard