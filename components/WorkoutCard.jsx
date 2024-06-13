import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const WorkoutCard = ({ title, exercises, image }) => {
  return (
    <TouchableOpacity
      //onPress={id}
      activeOpacity={0.7}
      className="bg-blue-200 p-4 mr-3 rounded-lg"
      /*disabled={}*/>
      
        <Text>{title}</Text>
        
      
      
    </TouchableOpacity>
  )
}

export default WorkoutCard