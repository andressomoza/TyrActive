import React, { useState } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import moment from 'moment'
import 'moment/locale/es'

const WeekDays = () => {
  const [selectedDay, setSelectedDay] = useState(moment().format('YYYY-MM-DD'))
  const startOfWeek = moment().startOf('week')
  const days = Array.from({ length: 7 }, (_, i) => startOfWeek.clone().add(i, 'day'))

  const handleDayPress = (day) => {
    setSelectedDay(day.format('YYYY-MM-DD'))
  }

  return (
    <SafeAreaView className="bg-orange-400">
      <View className='flex-row justify-around p-[10px]'>
        {days.map((day, index) => (
          <TouchableOpacity key={index} onPress={() => handleDayPress(day)} className={`${day.format('YYYY-MM-DD') === selectedDay ? "bg-orange-300" : "bg-orange-400"} rounded-lg justify-center align-center w-[13vw] h-[8vh]`}>
            <View className='items-center'>
            {day.isSame(moment(), 'day') ? <iew className='w-[7px] h-[7px] rounded-full bg-white mb-[5px]' /> : <View className='w-[7px] h-[7px] mb-[5px]' />}
              <Text className={`text-base ${day.format('YYYY-MM-DD') === selectedDay ? "font-mbold" : "font-mregular"}`}>
                {day.format('ddd')}
              </Text>
              <Text className={`text-base ${day.format('YYYY-MM-DD') === selectedDay ? "font-mbold" : "font-mregular"}`}>
                {day.format('D')}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  )
}
export default WeekDays