import { View, Text, Image } from 'react-native'
import React, { useState, useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link } from 'expo-router'
import { Redirect, router } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from '../../firebase-config';

import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import SignInForm from '../../components/SignInForm';

const SignIn = () => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="w-full h-full px-7 mt-4">
        
        <View>
          <Text className="text-3xl font-mextrabold text-left text-black w-full">¡Bienvenido/a!</Text>
          <Text className="text-black font-mregular text-base">Introduce tu correo electrónico y tu contraseña para iniciar sesión</Text>
        </View>

        <SignInForm />

        <View className="items-center justify-center">
          <Link href="/forgot-password" className='mt-5 items-center justify-center text-decoration-line: underline'>
            ¿Has olvidado tu contraseña?
          </Link>
        </View>
        
        <View className="flex flex-row justify-between mt-3">
          <View className="w-[30vw] bg-gray-100 h-px mt-6"></View>
          <Text className="mt-4 text-gray-400">o</Text>
          <View className="w-[30vw] bg-gray-100 h-px mt-6"></View>
        </View>
        
        <View className="w-full items-center justify-center">
          <CustomButton 
            title="Crear cuenta"
            handlePress={() => router.push('/sign-up')}
            containerStyles="w-[60vw] mt-7 bg-white border-2 border-secondary"
            textStyles="text-black"
            isLoading={isSubmitting}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default SignIn