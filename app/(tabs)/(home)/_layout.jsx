import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

const HomeLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="home"
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="training-plans"
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="[id]"
          options={{headerShown: false}}
        />
      </Stack>

      <StatusBar backgroundColor="#161622" style="dark" />
    </>
  )
}

export default HomeLayout