import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'

import TopButtons from '../../../components/TopButtons'
const HealthData = () => {
  return (
    <SafeAreaView>
      <TopButtons title={"Datos de salud"}/>
      <View>
        <Text>HealthData</Text>
      </View>
    </SafeAreaView>
  )
}

export default HealthData