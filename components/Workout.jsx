import { View, Text, FlatList } from 'react-native'
import React from 'react'

const Workout = () => {
  const activacion = [
    { id: '1', ejercicio: 'Flexiones', dosis: '3 x de 10' },
    { id: '2', ejercicio: 'Sentadillas', dosis: '4 x 15' },
    { id: '3', ejercicio: 'Abdominales', dosis: '2 x 20' },
    { id: '4', ejercicio: 'Burpees', dosis: '3 x 10' },
    // Añade más ejercicios según sea necesario
  ];

  const ejercicios = [
    { id: '1', ejercicio: 'Flexiones', dosis: '3 x de 10' },
    { id: '2', ejercicio: 'Sentadillas', dosis: '4 x 15' },
    { id: '3', ejercicio: 'Abdominales', dosis: '2 x 20' },
    { id: '4', ejercicio: 'Burpees', dosis: '3 x 10' },
    { id: '5', ejercicio: 'Abdominales', dosis: '2 x 20' },
    { id: '6', ejercicio: 'Burpees', dosis: '3 x 10' },
    // Añade más ejercicios según sea necesario
  ];
  
  const renderItem = ({ item }) => (
    <View className="flex-row w-[75vw] justify-between">
      <Text className="font-msemibold text-base">{item.ejercicio}: </Text>
      <Text className="font-mregular text-base">{item.dosis}</Text>
    </View>
  );
  return (
    <View className="w-[90vw]">
      <View>
        <Text className="font-msemibold text-base">Intensidad general: <Text className="font-mregular">Media</Text></Text>
        <Text className="font-msemibold text-base">Observaciones: <Text className="font-mregular">No procede</Text></Text>
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