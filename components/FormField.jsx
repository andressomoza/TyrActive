import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'

import { icons } from '../constants'

const FormField = ({ title, value, placeholder, handleChangeText, otherStyles, keyboardType, disabled, ...porps}) => {
  const [showPassword, setShowPassword] = useState(false)
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-mmedium">{title}</Text>

      <View className="bg-white px-4 w-full h-16 border border-gray-400 rounded-2xl focus:border-secondary items-center flex-row">
        <TextInput
          className="flex-1 text-red font-msemiold text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#A0A0A0"
          onChangeText={handleChangeText}
          secureTextEntry={title === 'Contraseña' && !showPassword}
          keyboardType={keyboardType}
          disabled={disabled}
          autoCapitalize="none"
        />

        {title === 'Contraseña' && (
          <TouchableOpacity onPress={()=>
            setShowPassword(!showPassword)}>
            <Image source={!showPassword ? icons.eye : icons.eyeHide}
            className="w-6 h-6"
            resizeMode='contain'/>
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default FormField