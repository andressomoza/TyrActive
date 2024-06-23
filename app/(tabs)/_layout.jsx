import { View, Text, Image } from 'react-native'
import { Tabs, Redirect } from 'expo-router'
import React from 'react'
import { icons } from '../../constants'

const TabIcon = ({icon, color, name, focused}) => {
    return (
        <View className="items-center justify-center gap-1">
            <Image 
              source={icon}
              resizeMode='contain'
              tintColor={color}
              className="w-7 h-7"
            />
            <Text className={`${focused ? 'font-msemibold' : 'font-mregular'} text-xs`} style={{ color:color}}>
              {name}
            </Text>
        </View>
    )
}

const TabsLayout = () => {
  return (
    <>
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#FFA001',
        tabBarInactiveTintColor: '#CDCDE0',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: '0.2px',
          borderTopColor: '#d6d6d6',
          height: 90,
        },
      }}>
        <Tabs.Screen
          name="(home)"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon={icons.home} color={color} name="Inicio" focused={focused}/>
        )}}/>
        <Tabs.Screen
          name="mi-zona"
          options={{
            title: "Mi Zona",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon={icons.plus} color={color} name="Mi Zona" focused={focused}/>
        )}}/>
        <Tabs.Screen
          name="(profile)"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon={icons.profile} color={color} name="Perfil" focused={focused}/>
        )}}/>
    </Tabs>
    </>
  )
}

export default TabsLayout