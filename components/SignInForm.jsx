import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { FIREBASE_AUTH } from '../firebase-config';
import { signInWithEmailAndPassword } from "firebase/auth";
import { router } from "expo-router";

import { signInUser } from '../utils/reusable-functions'
import FormField from './FormField'
import CustomButton from './CustomButton'

const SignInForm = () => {
  const [error, setError] = useState([])
  const LoginFormSchema = Yup.object().shape({
    email: Yup.string().email().required('Email requerido'),
    password: Yup.string().required('Contraseña requerida').min(8, 'La contraseña debe tener al menos 8 caracteres')
  })

  const auth = FIREBASE_AUTH
  const handleSignIn = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user
      if (!user.emailVerified) {
        console.log('Email no verificado')
        Alert.alert('Verificación', 'Compruebe su correo electrónico para verificar su cuenta', [
          {
            text: 'Cancelar',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
        auth.signOut().then(() => {
          console.log('Sesion cerrada')
        })
      } else {
        console.log('¡SESIÓN INICIADA!', user)
        router.navigate("/home");
      }
    }
    )
    .catch((error) => {
      console.log(error.code)
      setError("Email o contraseña incorrectos")
    })
  }

  return (
    <>
    <View>
      {error && <Text className="mt-5 text-red-600">{error}</Text>}
    </View>
    <Formik
      initialValues={{email: '', password: ''}}
      onSubmit={values => {
        handleSignIn(values.email, values.password)
      }}
      validationSchema={LoginFormSchema}
      validateOnMount={true}
    >
      {({ handleChange, handleBlur, handleSubmit, values, isValid }) => (

      <>
        <FormField
          title="Correo electrónico"
          value={values.email}
          handleChangeText={handleChange('email')}
          onBlur={handleBlur('email')}
          otherStyles="mt-7"
          keyboardType="email-address"
        />

        <FormField
          title="Contraseña"
          value={values.password}
          handleChangeText={handleChange('password')}
          otherStyles="mt-7"
          onBlur={handleBlur('password')}
        />

        <View className="w-full items-center justify-center">
          <CustomButton 
            title="Iniciar sesión"
            handlePress={handleSubmit}
            containerStyles="w-[60vw] mt-7"
            disabled={!isValid}
          />
        </View>
        </>
      )}
        </Formik>
    </>
  )
}

export default SignInForm