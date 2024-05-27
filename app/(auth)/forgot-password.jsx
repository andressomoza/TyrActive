import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { FIREBASE_AUTH } from '../../firebase-config';

import { forgotPassword } from '../../utils/reusable-functions'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'

const ForgotPassword = () => {
  const LoginFormSchema = Yup.object().shape({
    email: Yup.string().email().required('Email requerido'),
  })
  const [error, setError] = useState([])
  const auth = FIREBASE_AUTH
  const handleForgotPassword = (email) => {
    forgotPassword(auth, email)
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="w-full h-full px-7 mt-4">
        
        <View>
          <Text className="text-3xl font-mextrabold text-left text-black w-full">¿Has olvidado tu contraseña?</Text>
          <Text className="text-black font-mregular text-base">Introduce tu correo electrónico y te enviaremos un email para que puedas recuperarla</Text>
        </View>

        <>
          <View>
            {error && <Text className="mt-5 text-red-600">{error}</Text>}
          </View>
          <Formik
            initialValues={{email: ''}}
            onSubmit={values => {
              handleForgotPassword(values.email)
            }}
            validationSchema={LoginFormSchema}
            validateOnMount={true}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (

            <>
              <FormField
                title="Correo electrónico"
                value={values.email}
                handleChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                otherStyles="mt-7"
                keyboardType="email-address"
              />
              {errors.email && touched.email ? (<Text>{errors.email}</Text>) : null}

              <View className="w-full items-center justify-center">
                <CustomButton 
                  title="Soliciar nueva contraseña"
                  handlePress={handleSubmit}
                  containerStyles="w-[70vw] mt-7"
                  disabled={!isValid}
                />
              </View>
              </>
            )}
          </Formik>
        </>
      </View>
    </SafeAreaView>
  )
}

export default ForgotPassword