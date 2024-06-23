import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { LineChart } from "react-native-chart-kit";

export default function WeightChart({user}) {
  const weights = user.weight
  const labels = weights.map(item => {
    const [day, month, year] = item.date.split('/')
    return `${day}-${month}`
  })
  const values = weights.map(item => item.value)
  console.log("values", values)
  console.log(weights.map(item => item.value))
  console.log(weights)

  return (
    <View>
      <LineChart
        data={{
          labels: labels,
          datasets: [
            {
              data: values
            }
          ]
        }}
        width={Dimensions.get('window').width - 16}
        height={350}
        yAxisLabel=""
        yAxisSuffix="kg"
        yAxisInterval={1}
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726'
          }
        }}
        bezier
        style={{
          padding: 8,
          marginVertical: 3,
          borderRadius: 16
        }}
        verticalLabelRotation={90}
      />
    </View>
  )
}
