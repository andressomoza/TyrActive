import { View, Text, FlatList } from 'react-native'
import React from 'react'

const Workout = ({entrenamiento}) => {
  console.log(entrenamiento.activacion)

  const activacion = Object.keys(entrenamiento.activacion).map((key, index) => {
    return {
      id: index + 1,
      ejercicio: key,
      dosis: entrenamiento.activacion[key]
    }
  })

  
  const ejercicios = Object.keys(entrenamiento.partePrincipal).map((key, index) => {
    return {
      id: index + 1,
      ejercicio: key,
      dosis: entrenamiento.partePrincipal[key]
    }
  })
  
  const renderItem = ({ item }) => (
    <View className="flex-row w-[75vw] justify-between">
      <Text className="font-msemibold text-base">{item.ejercicio}: </Text>
      <Text className="font-mregular text-base">{item.dosis}</Text>
    </View>
  );
  return (
    <View className="w-[90vw]">
      <View>
        <Text className="font-msemibold text-base">Intensidad general: <Text className="font-mregular text-base">{entrenamiento.intensidadGeneral}</Text></Text>
        <Text className="font-msemibold text-base">Observaciones: <Text className="font-mregular text-base">{entrenamiento.observaciones}</Text></Text>
        {entrenamiento.descripcion !== undefined ? <Text className="font-msemibold text-base">Descripción: <Text className="font-mregular text-base">{entrenamiento.descripcion}</Text></Text> : null}
      </View>
      <View className="items-center mt-3">
        <Text className="font-mbold text-lg">ACTIVACIÓN</Text>
        <FlatList
          data={activacion}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
      <View className="items-center mt-10">
        <Text className="font-mbold text-lg">PARTE PRINCIPAL</Text>
        <FlatList
          data={ejercicios}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  )
}

export default Workout