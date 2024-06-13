import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

const WorkoutCard = ({ title, exercises, id }) => {
  console.log(id)
  console.log(title)
  return (
    <TouchableOpacity
      onPress={() => router.push({
        pathname: '[id]',
        params: { id: id }
      })}
      activeOpacity={0.7}
      className="bg-blue-200 p-4 mr-3 rounded-lg"
      /*disabled={}*/>
      
        <Text>{title}</Text>
        
      
      
    </TouchableOpacity>
  )
}

export default WorkoutCard