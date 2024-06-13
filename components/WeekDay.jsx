import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import moment from 'moment';
import 'moment/locale/es';  // Importa el idioma español

const WeekDays = () => {
  const startOfWeek = moment().startOf('week');
  const days = Array.from({ length: 7 }, (_, i) => startOfWeek.clone().add(i, 'day'));

  const handleDayPress = (day) => {
    console.log('Día presionado:', day.format('YYYY-MM-DD'));
  };

  return (
    <SafeAreaView className="bg-orange-400">
      <View style={styles.container}>
        {days.map((day, index) => (
          <TouchableOpacity key={index} onPress={() => handleDayPress(day)}>
            <View style={styles.dayContainer}>
              {day.isSame(moment(), 'day') ? <View style={styles.circle} /> : <View style={styles.emptyCircle} />}
              <Text className="font-mregular" style={styles.day}>
                {day.format('ddd')}
              </Text>
              <Text className="font-mregular" style={styles.day}>
                {day.format('D')}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  dayContainer: {
    alignItems: 'center',
  },
  day: {
    fontSize: 16,
  },
  circle: {
    width: 7,
    height: 7,
    borderRadius: 5,
    backgroundColor: 'white',
    marginBottom: 5,
  },
  emptyCircle: {
    width: 7,
    height: 7,
    marginBottom: 5,
  },
});

export default WeekDays;