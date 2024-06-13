import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

const ProfileLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="profile"
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="personal-data"
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="change-password"
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="my-subscription"
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="subscription-details"
          options={{headerShown: false}}
        />
      </Stack>

      <StatusBar backgroundColor="#161622" style="dark" />
    </>
  )
}

export default ProfileLayout