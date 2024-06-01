import { TouchableOpacity, Text, View } from 'react-native'
import React from 'react'

const Card = ({ title, handlePress, containerStyles, textStyles, image, imageStyles }) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`rounded-3xl h-[200px] w-[90vw] mt-7 ${containerStyles}`}
      /*disabled={}*/>
      <Text className={`text-white font-mbold text-3xl w-64 mt-5 ml-5 ${textStyles}`}>{title}</Text>
      <Text className={`text-white font-mbold text-7xl w-64 mt-5 ml-56 ${imageStyles}`}>{image}</Text>
    </TouchableOpacity>
  )
}

export default Card