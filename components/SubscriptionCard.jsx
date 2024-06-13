import { View, Text, TouchableOpacity } from 'react-native'
import { Redirect, router } from "expo-router";
import React from 'react'

export default function SubscriptionCard ({nombre, precio, caracteristicas, handlePress}) {
  const getColorByPrice = (precio) => {
    if (precio < 80) return 'bg-teal-200';
    if (precio > 80) return 'bg-amber-200';
    return 'red';
  }
  const renderCard = ({nombre, precio, caracteristicas}) => {
    const cardColor = getColorByPrice(precio);
      return (
        <TouchableOpacity className={`${cardColor} rounded-3xl h-50 w-[360px] mb-3 justify-between`} onPress={handlePress}>
          <View>
            <Text className="font-mbold text-lg p-3">{nombre}</Text>
            {caracteristicas.map((caracteristica, index) => (
              <Text key={index} className="font-mregular ml-4 mb-1"> • {caracteristica}</Text>
            ))}
          </View>
          <View className="items-end w-full">
            <Text className="font-mbold text-lg w-28 mb-2">{precio} €/mes</Text>
          </View>
        </TouchableOpacity>
      )
    }

    return (
      
           <>
              {renderCard({nombre, precio, caracteristicas})}
              </>
    )
}
