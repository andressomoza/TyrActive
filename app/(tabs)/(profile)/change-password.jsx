import { View, Text, SafeAreaView, Image, Touchable, Alert, ScrollView } from 'react-native'
import Reac, { useState } from 'react'
import { FIREBASE_AUTH } from '../../../firebase-config';
import * as ImagePicker from 'expo-image-picker'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { updatePassword } from "firebase/auth";

import CustomButton from '../../../components/CustomButton'
import FormField from '../../../components/FormField'
import TopButtons from '../../../components/TopButtons'
import { router } from 'expo-router';

const ChangePasswordSchema = Yup.object().shape({
  oldPassword: Yup.string().required('Requerido'),
  newPassword: Yup.string().required('Requerido'),
  newPassword2: Yup.string().required('Requerido')
})

const ChangePassword = () => {

  const handleChangePassword = (values) => {
    const user = FIREBASE_AUTH.currentUser
    if (values.newPassword !== values.newPassword2) {
      Alert.alert('Cambio de contraseña', 'Las nuevas contraseñas no coinciden', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
      return
    }
    
    updatePassword(user, values.newPassword)
      .then(() => {
        Alert.alert('Cambio de contraseña', 'Contraseña cambiada con éxito', [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
        router.navigate('profile')
      })
      .catch((error) => {
        console.log(error)
      })
    
    return
  }
  return (
    <SafeAreaView>
      <ScrollView>
        <View className="w-full items-center justify-center">
          <TopButtons
            title={"Cambio de contraseña"}  
          />
          <View className="w-[90vw]">
            <>
              <Formik 
                initialValues={{ oldPassword: '', newPassword: '', newPassword2: '' }}
                validationSchema={ChangePasswordSchema}
                onSubmit={values => handleChangePassword(values)}
                validateOnMount={true}
              >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                  <>
                    <FormField
                      placeholder="Contraseña actual"
                      value={values.oldPassword}
                      handleChangeText={handleChange('oldPassword')}
                      onBlur={handleBlur('oldPassword')}
                      otherStyles="mt-7"
                    />
                    {errors.oldPassword && touched.oldPassword ? (<Text>{errors.oldPassword}</Text>) : null}

                    <FormField
                    placeholder="Nueva contraseña"
                    value={values.newPassword}
                    handleChangeText={handleChange('newPassword')}
                    onBlur={handleBlur('newPassword')}
                    otherStyles="mt-3"
                    />
                    {errors.newPassword && touched.newPassword ? (<Text>{errors.newPassword}</Text>) : null}   

                    <FormField
                      placeholder="Repite la nueva contraseña"
                      value={values.newPassword2}
                      handleChangeText={handleChange('newPassword2')}
                      onBlur={handleBlur('newPassword2')}
                      otherStyles="mt-3"
                    />
                    {errors.newPassword2 && touched.newPassword2 ? (<Text>{errors.newPassword2}</Text>) : null}  

                    
                    <View className="w-full justify-center flex-row">
                      <CustomButton
                        title="Actualizar contraseña"
                        handlePress={handleSubmit}
                        containerStyles="w-[55vw] mt-10"
                      />
                    </View>
                  </>
                  
                )}
              </Formik>
            </>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ChangePassword