import { View, Text, ScrollView } from 'react-native';
import React from 'react';

const Diet = ({ dieta }) => {

  const DietCard = ({ title, items }) => (
    <View className="bg-orange-200 mb-5 p-3 rounded-xl">
      <Text className="font-mbold text-base">{title}</Text>
      {items && items.length > 0 ? (
        items.map((item, index) => (
          <Text key={index} className="font-mregular"> - {item}</Text>
        ))
      ) : (
        <Text className="font-mregular">No hay elementos</Text>
      )}
    </View>
  )

  return (
    <View className="w-[90vw]">
      <ScrollView>
      <DietCard title="Desayuno" items={dieta.desayuno} />
      <DietCard title="Media Mañana" items={dieta.mediaManana} />
      <DietCard title="Almuerzo" items={dieta.almuerzo} />
      <DietCard title="Merienda" items={dieta.merienda} />
      <DietCard title="Cena" items={dieta.cena} />
      </ScrollView>
    </View>
  )
}

export default Diet;
