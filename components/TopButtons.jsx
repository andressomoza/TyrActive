import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { router } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';

const TopButtons = ({ title }) => {
  return (
    <View className="w-full flex-row justify-between items-center">
      <TouchableOpacity
        onPress={() => router.back()}
        className="ml-3"
        >
          <Ionicons name="chevron-back" size={30} color="black" />
      </TouchableOpacity>
      <Text className="text-base ">{title}</Text>
      <TouchableOpacity
        onPress={() => router.navigate('/home')}
        className="mr-5"
        >
          <Ionicons name="home-outline" size={30} color="black" />
      </TouchableOpacity>
    </View>
  )
}

export default TopButtons